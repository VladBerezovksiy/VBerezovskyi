const { I } = inject();
const Helper = require("../helpers/helper.js");

module.exports = {
  //***********************       ELEMENTS       ************************//
  //***********************       STEP 1       ************************//

  alertNotAvailableProduct: {
    xpath: `//*[@id="checkout-cart"]/div[contains(.,'Products marked with *** are not available in the desired quantity or not in stock!')]`,
  },

  //***********************       STEP 3       ************************//

  changeAddressRadiButton: {
    xpath: `//div[@id='shipping-existing']//ancestor::form//label[contains(.,'I want to use a new address')]`,
  },

  firstNameField: { css: "#input-shipping-firstname" },
  lastNameField: { css: "#input-shipping-lastname" },
  firstAddressField: { css: "#input-shipping-address-1" },
  cityField: { css: "#input-shipping-city" },
  countryField: { css: "#input-shipping-firstname" },
  regionField: { css: "#input-shipping-firstname" },

  //***********************       STEP 5       ************************//

  conditionsCheckbox: { xpath: "//input[@id='agree1']" },

  //***********************       STEP 6       ************************//

  deliveryPriceText: {
    xpath: "//strong[text()='Flat Shipping Rate:']/ancestor::tr/td[2]",
  },
  totalPriceText: {
    xpath: "//strong[text()='Total:']/ancestor::tr/td[2]",
  },

  //***********************       FINISHED STEPS       ************************//

  checkoutSuccess: { xpath: '//*[@id="content"]/p[1]' },

  //***************************************************************************//

  _generateAndClickContinueButtonFrom1to5(nameStep) {
    I.click({
      xpath: `//a[contains(., '${nameStep}')]/ancestor::div[@class='panel panel-default']//div[contains(@class, 'buttons')]//input[contains(@id, 'button')]`,
    });
  },

  async checkAlertNotAvailableOfProduct() {
    return await Helper.checkElementIsVisible(this.alertNotAvailableProduct);
  },

  completeStepsFrom1to5(checkoutData) {
    //***********************       STEP 1-2       ************************//

    this._generateAndClickContinueButtonFrom1to5("Step 2");

    //***********************       STEP 3       ************************//

    I.waitForElement(this.changeAddressRadiButton);
    I.click(this.changeAddressRadiButton);
    I.waitForElement(this.firstNameField);
    I.fillField(this.firstNameField, checkoutData.firstName);
    I.fillField(this.lastNameField, checkoutData.lastName);
    I.fillField(this.firstAddressField, checkoutData.firstAddress);
    I.fillField(this.cityField, checkoutData.city);
    this._generateAndClickContinueButtonFrom1to5("Step 3");

    //***********************       STEP 4       ************************//

    this._generateAndClickContinueButtonFrom1to5("Step 4");

    //***********************       STEP 5       ************************//

    I.waitForElement(this.conditionsCheckbox, 5);
    I.click(this.conditionsCheckbox);
    this._generateAndClickContinueButtonFrom1to5("Step 5");
  },

  finishSteps() {
    //***********************       STEP 6       ************************//

    this._generateAndClickContinueButtonFrom1to5("Step 6");
    I.waitForElement(this.checkoutSuccess, 3);
  },

  async getProductDeliveryPrice() {
    return await I.changeUSDtoUAH(
      await I.parsePrice(await I.grabTextFrom(this.deliveryPriceText))
    );
  },

  async getProductTotalPrice() {
    return await I.changeUSDtoUAH(
      await I.parsePrice(await I.grabTextFrom(this.totalPriceText))
    );
  },
};
