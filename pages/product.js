const { I } = inject();
const Helper = require("../helpers/helper.js");

module.exports = {
  priceText: { xpath: '//div[@class="price"]/span' },
  dropdownElement: { xpath: "//a[contains(@id, 'sbSelector')]" },
  addToCartButton: { css: "#button-cart" },
  cartButton: { css: "#cart" },
  checkoutButton: { xpath: "//div[@id='cart']//a[contains(.,'Checkout')]" },

  async getProductPrice() {
    return await I.changeUSDtoUAH(
      await I.parsePrice(await I.grabTextFrom(this.priceText))
    );
  },

  async _checkOptionInProduct() {
    return await Helper.checkElementIsVisible(this.dropdownElement);
  },

  async getColorProductPrice() {
    let colorText = await this._checkOptionInProduct();
    if (colorText) {
      return await I.changeUSDtoUAH(
        await I.parsePrice(await I.grabTextFrom(this.dropdownElement))
      );
    }
  },

  async selectColorProduct(color) {
    let option = await this._checkOptionInProduct();
    if (option) {
      let colorText = `//ul[contains(@id, "sbOptions")]//a[contains(.,"${color}")]`;
      I.click(this.dropdownElement);
      I.waitForElement(colorText, 3);
      I.click(colorText);
    }
  },

  addProductToCheckout() {
    I.click(this.addToCartButton);
    I.click(this.cartButton);
    I.waitForElement(this.checkoutButton, 3);
    I.click(this.checkoutButton);
  },
};
