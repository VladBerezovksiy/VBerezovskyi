const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "./tests/*_test.js",
  output: "./output",
  helpers: {
    Playwright: {
      url: "http://localhost",
      show: true,
      browser: "chromium",
      waitForTimeout: 5000,
    },

    ChaiWrapper: {
      require: "codeceptjs-chai",
    },

    Converter: {
      require: "./helpers/converter_helper.js",
    },
    ConverterCurrency: {
      require: "./helpers/converterCurrency.js",
    },
    REST: {
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    JSONResponse: {},
  },
  plugins: {
    tryTo: {
      enabled: true,
    },
  },
  include: {
    I: "./steps_file.js",
    homePage: "./pages/home.js",
    registerPage: "./pages/register.js",
    productPage: "./pages/product.js",
    checkoutPage: "./pages/checkout.js",
    orderHistoryPage: "./pages/orderHistory.js",
    helper: "./helpers/helper.js",
  },
  mocha: {
    reporterOptions: {
      reportDir: "output",
    },
  },
  name: "VBerezovskyi",
};
