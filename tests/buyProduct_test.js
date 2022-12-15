const { totalPriceText } = require("../pages/checkout");
const { checkoutButton } = require("../pages/product");

const PRODUCT_URL =
  "http://opencart.qatestlab.net/index.php?route=product/product&path=31&product_id=40";

const ORDER_HISTORY_URL =
  "http://opencart.qatestlab.net/index.php?route=account/order";

let loginUser = {
  email: "1671089355797@gmail.com",
  password: "Qwerty123456",
};

let product = {
  color: "White",
};

let checkoutData = {
  firstName: "Vlad",
  lastName: "GFL",
  firstAddress: "Shevhencko 11",
  city: "Odesa",
};

Feature("buy");

Scenario(
  "Buy product",
  async ({ I, productPage, checkoutPage, orderHistoryPage }) => {
    I.login(loginUser);
    I.amOnPage(PRODUCT_URL);

    let price = await productPage.getProductPrice();
    console.log("Product price: " + price);

    productPage.selectColorProduct(product);

    let colorPrice = await productPage.getColorProductPrice();
    console.log("Color Price: " + colorPrice);

    productPage.addProductToCheckout();
    checkoutPage.steps(checkoutData);

    let deliveryPrice = await checkoutPage.getProductDelivery();
    console.log("Delivery price: " + deliveryPrice);

    let totalPrice = await checkoutPage.getProductTotalPrice();
    console.log("Toatal price: " + totalPrice);

    checkoutPage.finishSteps();

    let summary =
      parseFloat(price) + parseFloat(colorPrice) + parseFloat(deliveryPrice);
    I.assertEqual(summary, parseFloat(totalPrice), "Don't match prices!");

    I.amOnPage(ORDER_HISTORY_URL);
    let idLastOrder = await orderHistoryPage.grapLastOrder(summary);
    console.log("Order ID: " + idLastOrder);
  }
).tag("buy");
