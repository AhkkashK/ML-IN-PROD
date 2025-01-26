const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      baseUrl: 'http://localhost:3000',
      specPattern: 'cypress/e2e/**/*.cy.js', // Chemin relatif pour trouver les tests

    },
  },
});
