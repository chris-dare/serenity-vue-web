const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const protocol = process.env.HTTPS_LOCALHOST ? 'https' : 'http'
      const host = process.env.HOST || 'localhost'
      const port = process.env.PORT || '8083'
      config.env.BASE_URL = `${protocol}://${host}:${port}`
      config.env.API_URL = process.env.BASE_URL
      config.env.PROVIDER_PORTAL_ID = process.env.PROVIDER_PORTAL_ID
      config.env.TEST_ORGANIZATION = process.env.TEST_ORGANIZATION || '1901bd68-3b2e-4109-8f01-dbdeeba42e81'

      return config
    },
  },

  component: {
    devServer: {
      framework: 'vue-cli',
      bundler: 'webpack',
    },
  },
})
