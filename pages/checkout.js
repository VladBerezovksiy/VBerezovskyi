const { continueButton } = require("./register");

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

  steps(checkoutData) {
    I.click({
      xpath: `//a[contains(., 'Step 2')]/ancestor::div[@class='panel panel-default']//div[contains(@class, 'buttons')]//input`,
    });
    I.waitForElement(this.changeAddressRadiButton);
    I.click(this.changeAddressRadiButton);
    I.waitForElement(this.firstNameField);
    I.fillField(this.firstNameField, checkoutData.firstName);
    I.fillField(this.lastNameField, checkoutData.lastName);
    I.fillField(this.firstAddressField, checkoutData.firstAddress);
    I.fillField(this.cityField, checkoutData.city);
    I.click({
      xpath: `//a[contains(., 'Step 3')]/ancestor::div[@class='panel panel-default']//div[contains(@class, 'buttons')]//input[@type='button']`,
    });
    I.click({
      xpath: `//a[contains(., 'Step 4')]/ancestor::div[@class='panel panel-default']//div[contains(@class, 'buttons')]//input[@type='button']`,
    });
    I.waitForElement(this.conditionsCheckbox, 5);
    I.click(this.conditionsCheckbox);
    I.click({
      xpath: `//a[contains(., 'Step 5')]/ancestor::div[@class='panel panel-default']//div[contains(@class, 'buttons')]//input[@type='button']`,
    });
  },

  finishSteps() {
    I.click({
      xpath: `//a[contains(., 'Step 6')]/ancestor::div[@class='panel panel-default']//div[contains(@class, 'buttons')]//input[@type='button']`,
    });
    I.waitForElement(this.checkoutSuccess, 3);
  },

  async getProductDelivery() {
    return await (
      await I.grabTextFrom(this.deliveryPriceText)
    ).replace(/[^0-9\.]+/g, "");
  },

  async getProductTotalPrice() {
    return await (
      await I.grabTextFrom(this.totalPriceText)
    ).replace(/[^0-9\.]+/g, "");
  },
};
