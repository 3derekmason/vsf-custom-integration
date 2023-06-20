module.exports = {
  integrations: {
    medusa: {
      location: '@vue-storefront/integration-boilerplate-api/server',
      configuration: {
        api: process.env.MEDUSA_API_URL || 'http://localhost:9000',
        customOptions: {
          maxRetries: 10,
        },
      },
    },
  },
};
