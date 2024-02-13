const assert = require("assert");
const { I, commonPage, constantsPage } = inject();

module.exports = {
  constants: {},

  labels: {
    successMessages: {},

    errorMessages: {},
  },

  locators: {
    // button locators
    buttons: {
      loginButton: "//input[@type = 'submit' and @value = 'Login']",
    },
  },

  regEx: {},
};
