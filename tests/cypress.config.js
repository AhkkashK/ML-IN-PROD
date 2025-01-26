const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // L'URL de base pour vos tests
    setupNodeEvents(on, config) {
      // Vous pouvez ajouter des événements ou des plugins ici si nécessaire
      return config;
    },
  },
});
