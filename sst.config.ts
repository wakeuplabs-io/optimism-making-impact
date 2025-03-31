/// <reference path="./.sst/platform/config.d.ts" />

const GOOGLE_CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`
const UI_URL = `${process.env.UI_URL}`
const GOOGLE_CLIENT_SECRET = `${process.env.GOOGLE_CLIENT_SECRET}`

export default $config({
  app(input) {
    return {
      name: 'optimism-making-impact',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          defaultTags: {
            tags: {
              customer: 'optimism-making-impact',
              stage: input?.stage,
            },
          },
        },
      },
    };
  },
  async run() {
    if (!UI_URL)
      throw new Error("UI_URL not set");
    if (!GOOGLE_CLIENT_ID)
      throw new Error("GOOGLE_CLIENT_ID not set");
    if (!GOOGLE_CLIENT_SECRET)
      throw new Error("GOOGLE_CLIENT_SECRET not set");

    const IS_PRODUCTION = $app.stage === 'production'

    // AWS data
    const { name: region } = await aws.getRegion({});

    //cognito pool
    const userPool = new sst.aws.CognitoUserPool('user-pool');
    const GoogleClientId = GOOGLE_CLIENT_ID;
    const GoogleClientSecret = GOOGLE_CLIENT_SECRET;

    const provider = userPool.addIdentityProvider('Google', {
      type: 'google',
      details: {
        authorize_scopes: 'email profile',
        client_id: GoogleClientId,
        client_secret: GoogleClientSecret,
      },
      attributes: {
        email: 'email',
        name: 'name',
        username: 'sub',
      },
    });

    const userPoolDomain = new aws.cognito.UserPoolDomain('op-making-impact-userpool-domain', {
      domain: `op-making-impact-${$app.stage}`,
      userPoolId: userPool.id,
    });

    const fixedUrlForRootDomain = UI_URL.replace(/(www\.)?/, '');
    const userPoolClient = userPool.addClient('op-making-impact-web-client', {
      providers: [provider.providerName],
      transform: {
        client: {
          callbackUrls: IS_PRODUCTION ? [fixedUrlForRootDomain] : ['http://localhost:5173', fixedUrlForRootDomain],
          logoutUrls: IS_PRODUCTION ? [fixedUrlForRootDomain] : ['http://localhost:5173', fixedUrlForRootDomain],
        },
      },
    });

    const userPoolDomainURL = $interpolate`${userPoolDomain.domain}.auth.${region}.amazoncognito.com`;

    const functionHandler = new sst.aws.Function('functionHandler', {
      url: true,
      handler: 'packages/api/src/app.handler',
      environment: {
        PRISMA_QUERY_ENGINE_LIBRARY: '/var/task/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
        DB_URL: process.env.DB_URL ?? '',
        DB_URL_NON_POOLING: process.env.DB_URL_NON_POOLING ?? '',
        COGNITO_USER_POOL_ID: userPool.id,
        COGNITO_USER_POOL_CLIENT: userPoolClient.id,
      },
      copyFiles: [
        {
          from: 'node_modules/.pnpm/@prisma+client@6.1.0_prisma@6.1.0/node_modules/.prisma/client/',
          to: '.prisma/client/',
        },
        {
          from: 'node_modules/.pnpm/@prisma+client@6.1.0_prisma@6.1.0/node_modules/@prisma/client/',
          to: '@prisma/client/',
        },
      ],
    });

    const apiGateway = new sst.aws.ApiGatewayV2('api', {
      cors: {
        allowOrigins: IS_PRODUCTION ? [
          fixedUrlForRootDomain,
          UI_URL,
        ] : [
          fixedUrlForRootDomain,
          UI_URL,
          'http://localhost:5173'
        ],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Authorization', 'Content-Type'],
        allowCredentials: true,
      },
    });

    apiGateway.route('$default', functionHandler.arn);

    // production is https://retroimpactguidelines.xyz/
    // staging is https://retroimpactguidelines.wakeuplabs.link/
    // production uses root domain and staging a subdomain
    // this is considered with the StaticSite domain parameter 
    const domainRoot = UI_URL.replace(/^https?:\/\/(www\.)?/, '');
    const domainAlias =UI_URL.replace(/^https?:\/\//, '');

    const ui = new sst.aws.StaticSite('web', {
      build: {
        command: 'pnpm ui:build',
        output: 'packages/web/dist',
      },
      environment: {
        VITE_API_URL: $interpolate`${apiGateway.url}/api`,
        VITE_COGNITO_USERPOOL_ID: userPool.id,
        VITE_COGNITO_USERPOOL_CLIENT_ID: userPoolClient.id,
        VITE_COGNITO_USERPOOL_DOMAIN: userPoolDomainURL,
      },
      domain: {
        name: domainRoot,
        aliases: domainAlias !== domainRoot ? [domainAlias] : [],
      },
      assets: {
        textEncoding: 'utf-8',
        fileOptions: [
          {
            files: ['**/*.css', '**/*.js'],
            cacheControl: 'max-age=31536000,public,immutable',
          },
          {
            files: '**/*.html',
            cacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
          },
          {
            files: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
            cacheControl: 'max-age=31536000,public,immutable',
          },
        ],
      },
    });

    return {
      api: apiGateway.url,
      ui: ui.url,
      userPool: userPool.id,
      userPoolClientId: userPoolClient.id,
    };
  },
});
