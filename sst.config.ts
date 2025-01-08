/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'optimism-making-impact',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        supabase: {
          accessToken: process.env.SUPABASE_ACCESS_TOKEN,
        },
        aws: {
          defaultTags: {
            tags: {
              client: 'optimism',
              project: 'optimism-making-impact',
              stage: input?.stage,
            }
          }
        }
      },
    };
  },
  async run() { 
    const db = new supabase.Project('db', {
      name: $interpolate`optimism-making-impact-${$app.stage}-db`,
      region: process.env.AWS_REGION ?? '',
      organizationId: process.env.SUPABASE_ORGANIZATION_ID ?? '',
      databasePassword: process.env.SUPABASE_DB_PASSWORD ?? '',
    });
    
    const api = new sst.aws.Function('api', {
      url: true,
      handler: 'packages/api/src/app.handler',
      environment: {
        PRISMA_QUERY_ENGINE_LIBRARY: '/var/task/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
        POSTGRES_PRISMA_URL: $interpolate`postgresql://postgres.${db.id}:${db.databasePassword}@aws-0-${db.region}.pooler.supabase.com:6543/postgres?pgbouncer=true`,
      },
      copyFiles: [
         {
           from: 'node_modules/.pnpm/@prisma+client@6.1.0_prisma@6.1.0/node_modules/.prisma/client/',
           to: '.prisma/client/',
         },
         {
           from: 'node_modules/.pnpm/@prisma+client@6.1.0_prisma@6.1.0/node_modules/@prisma/client/',
           to: '@prisma/client/',
         }
      ],
    });

    return {
      api: api.url,
    };
  },
});
