const { I } = inject();

module.exports = {
  priceText: { xpath: '//div[@class="price"]/span' },
  dropdownElement: { xpath: "//a[contains(@id, 'sbSelector')]" },
  addToCartButton: { css: "#button-cart" },
  cartButton: { css: "#cart" },
  checkoutButton: { xpath: "//div[@id='cart']//a[contains(.,'Checkout')]" },

  async getProductPrice() {
    return await (
      await I.grabTextFrom(this.priceText)
    ).replace(/[^0-9\.]+/g, "");
  },

  async getColorProductPrice() {
    return await (
      await I.grabTextFrom(this.dropdownElement)
    ).replace(/[^0-9\.]+/g, "");
  },

  selectColorProduct(options) {
    let colorText = `//ul[contains(@id, "sbOptions")]//a[contains(.,"${options.color}")]`;
    I.click(this.dropdownElement);
    I.waitForElement(colorText, 3);
    I.click(colorText);
  },

  addProductToCheckout() {
    I.click(this.addToCartButton);
    I.click(this.cartButton);
    I.waitForElement(this.checkoutButton, 3);
    I.click(this.checkoutButton);
  },
};
