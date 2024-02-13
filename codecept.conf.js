const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "testcases/*_test.js",
  output: "./output",
  helpers: {
    WebDriver: {
      url: "https://www.tummee.com/",
      browser: "chrome",
      desiredCapabilities: {
        chromeOptions: {
          args: ["--ignore-certificate-errors"],
        },
      },
      windowSize: "maximize",
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
    Report: {
      require: "./util/helpers/Report.js",
    },
  },
  include: {
    I: "./steps_file.js",
    constantsPage: "./pages/Constants.js",
    loginPage: "./pages/Login.js",
    menuPage: "./pages/Menu.js",
    sequencePage: "./pages/Sequence.js",
    tummeePortalUrls: "./pages/TummeePortalUrls.js",
  },
  name: "Tummee-POC",
  bootstrap: null,
  mocha: {
    reporterOptions: {
      reportDir: "output",
      reportFilename: "[status]_[datetime]-[name]-report",
    },
  },
  plugins: {
    // pauseOnFail: {},
    // // retryFailedStep: {
    // //   enabled: true,
    // // },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
    // wdio: {
    //   enabled: true,
    //   services: ["selenium-standalone"],
    // },
  },
};
