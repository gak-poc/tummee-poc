const { I } = inject();

module.exports = {
  leftMenu: {
    createSequence: "//li/a[text() = 'Create Sequence']",
  },

  async navigateToMenu(menuLocator) {
    await I.isElementAvailable(menuLocator);
    await I.clickElement(menuLocator);
  },
};
