const signInButton = { xpath: '//a[text()="Sign In"]' };
const emailField = { css: "#input-email" };
const passwordField = { css: "#input-password" };
const submitButton = { xpath: '//input[@type="submit"]' };

const STORE_URL = "http://opencart.qatestlab.net/index.php";
const PRODUCT_URL =
  "http://opencart.qatestlab.net/index.php?route=product/product&path=31&product_id=40";
const ORDER_HISTORY_URL =
  "http://opencart.qatestlab.net/index.php?route=account/order";

module.exports = function () {
  return actor({
    openStore() {
      this.amOnPage(STORE_URL);
    },

    login(user) {
      this.openStore();
      this.click(signInButton);
      this.fillField(emailField, user.email);
      this.fillField(passwordField, user.password);
      this.click(submitButton);
    },

    openProductPage() {
      this.amOnPage(PRODUCT_URL);
    },

    openOrderHistoryPage() {
      this.amOnPage(ORDER_HISTORY_URL);
    },
  });
};
