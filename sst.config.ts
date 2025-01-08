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
      },
    };
  },
  async run() {
    const db = new supabase.Project('optimism-making-impact-db', {
      name: $interpolate`optimism-making-impact-${$app.stage}-db`,
      region: process.env.AWS_REGION ?? '',
      organizationId: process.env.SUPABASE_ORGANIZATION_ID ?? '',
      databasePassword: process.env.SUPABASE_DB_PASSWORD ?? '',
    });

    return { db };
  },
});
