const { I } = inject();

module.exports = {
  changeAddressRadiButton: {
    xpath: `//div[@id='shipping-existing']//ancestor::form//label[contains(.,'I want to use a new address')]`,
  },

  firstNameField: { css: "#input-shipping-firstname" },
  lastNameField: { css: "#input-shipping-lastname" },
  firstAddressField: { css: "#input-shipping-address-1" },
  cityField: { css: "#input-shipping-city" },
  countryField: { css: "#input-shipping-firstname" },
  regionField: { css: "#input-shipping-firstname" },

  conditionsCheckbox: { xpath: "//input[@id='agree1']" },

  deliveryPriceText: {
    xpath: "//strong[text()='Flat Shipping Rate:']/ancestor::tr/td[2]",
  },
  totalPriceText: {
    xpath: "//strong[text()='Total:']/ancestor::tr/td[2]",
  },

  checkoutSuccess: { xpath: '//*[@id="content"]/p[1]' },

  generateAndClickContinueButtonFrom1to5(nameStep) {
    I.click({
      xpath: `//a[contains(., '${nameStep}')]/ancestor::div[@class='panel panel-default']//div[contains(@class, 'buttons')]//input[contains(@id, 'button')]`,
    });
  },

  completeStepsFrom1to5(checkoutData) {
    this.generateAndClickContinueButtonFrom1to5("Step 2");
    I.waitForElement(this.changeAddressRadiButton);
    I.click(this.changeAddressRadiButton);
    I.waitForElement(this.firstNameField);
    I.fillField(this.firstNameField, checkoutData.firstName);
    I.fillField(this.lastNameField, checkoutData.lastName);
    I.fillField(this.firstAddressField, checkoutData.firstAddress);
    I.fillField(this.cityField, checkoutData.city);
    this.generateAndClickContinueButtonFrom1to5("Step 3");
    this.generateAndClickContinueButtonFrom1to5("Step 4");
    I.waitForElement(this.conditionsCheckbox, 5);
    I.click(this.conditionsCheckbox);
    this.generateAndClickContinueButtonFrom1to5("Step 5");
  },

  finishSteps() {
    this.generateAndClickContinueButtonFrom1to5("Step 6");
    I.waitForElement(this.checkoutSuccess, 3);
  },

  async getProductDeliveryPrice() {
    return (await I.grabTextFrom(this.deliveryPriceText)).replace(
      /[^0-9\.]+/g,
      ""
    );
  },

  async getProductTotalPrice() {
    return (await I.grabTextFrom(this.totalPriceText)).replace(
      /[^0-9\.]+/g,
      ""
    );
  },
};
