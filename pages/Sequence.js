const assert = require("assert");
const { I, commonPage, constantsPage, menuPage, tummeePortalUrls } = inject();

module.exports = {
  constants: {},

  labels: {
    successMessages: {},

    errorMessages: {},
  },

  locators: {
    // button locators
    buttons: {
      saveSequence: "//button[text() = 'Save & Continue']",
    },
  },

  regEx: {},

  /**
   * This method clicks on Create Sequence button from the left menu and checks for navigation
   */
  async navigateToCreateSequence() {
    await menuPage.navigateToMenu(menuPage.leftMenu.createSequence);
    await I.waitInUrl(
      tummeePortalUrls.urls.createSequenceTitle,
      constantsPage.waitTime.PAGE_LOAD_WAIT_TIME
    );
    await I.addMochawesomeContext(
      "Navigated to Create Sequence Screen. Landing URL verified."
    );
  },
};
