const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'tests/cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
