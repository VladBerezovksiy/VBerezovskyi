const { I } = inject();
const Helper = require("../helpers/helper.js");

module.exports = {
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  registerLink: { xpath: '//a[.="Register"]' },
  cartButton: { css: "#cart" },
  emptyCartText: {
    xpath: `//*[@id='cart']//p[text()="Your shopping cart is empty!"]`,
  },
  deleteIconInCart: { css: `div#cart button:nth-child(2)` },

  openRegistrationPage() {
    I.click(this.myAccountSpoiler);
    I.click(this.registerLink);
  },

  async _checkCartIsEmpty() {
    I.click(this.cartButton);
    return await Helper.checkElementIsVisible(this.emptyCartText);
  },

  async emptyCart() {
    let isCartEmpty = await this._checkCartIsEmpty();
    if (isCartEmpty === false) {
      let size = await I.grabAttributeFromAll(this.deleteIconInCart, "class");
      for (let i = 0; i < size.length; i++) {
        I.waitForVisible(this.deleteIconInCart, 5);
        I.click(this.deleteIconInCart);
      }
    }
  },
};
