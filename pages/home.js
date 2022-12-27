const { I } = inject();
const Helper = require("../helpers/helper.js");

module.exports = {
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  registerLink: { xpath: '//a[.="Register"]' },
  cartButton: { css: "#cart" },
  textProductInCart: {
    css: `#cart ul div.pull-left.name a`,
  },

  openRegistrationPage() {
    I.click(this.myAccountSpoiler);
    I.click(this.registerLink);
  },

  async clearCart() {
    I.click(this.cartButton);
    let sizeProductsInCart = await I.grabNumberOfVisibleElements(
      this.textProductInCart
    );
    for (let i = 0; i < sizeProductsInCart; i++) {
      let textProduct = await I.grabTextFrom(this.textProductInCart);
      let trashIconInCart = `//a[contains(.,'${textProduct}')]/ancestor::li//button[2]`;
      I.waitForVisible(trashIconInCart, 5);
      I.click(trashIconInCart);
      I.waitForInvisible(trashIconInCart, 5);
    }
  },
};
