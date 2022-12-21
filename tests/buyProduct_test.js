let productData = new DataTable(["link", "color"]);
productData.add([
  "http://opencart.qatestlab.net/index.php?route=product/product&path=31&product_id=40",
  "White",
]);
productData.add([
  "http://opencart.qatestlab.net/index.php?route=product/product&path=31&product_id=43",
  "Gray",
]);
productData.add([
  "http://opencart.qatestlab.net/index.php?route=product/product&path=31&product_id=47",
  "White",
]);
productData.add([
  "http://opencart.qatestlab.net/index.php?route=product/product&path=31&product_id=74",
  "Black",
]);

let loginUser = {
  email: "1671089355797@gmail.com",
  password: "Qwerty123456",
};

let checkoutData = {
  firstName: "Vlad",
  lastName: "GFL",
  firstAddress: "Shevhencko 11",
  city: "Odesa",
};

const FileReader = require("../helpers/fileReader.js");
let productOptions = FileReader.getProductsFromJson();

Feature("buy");

Before(({ I }) => {
  I.login(loginUser);
});

Scenario(
  "Buy product",
  async ({ I, productPage, checkoutPage, orderHistoryPage }) => {
    for (let i = 0; i < 4; i++) {
      I.amOnPage(productOptions["product"][i]["link"]);

      let price = await productPage.getProductPrice();
      console.log("Product price: " + price);

      productPage.selectColorProduct(productOptions["product"][i]["color"]);

      let colorPrice = await productPage.getColorProductPrice();
      console.log("Color Price: " + colorPrice);

      productPage.addProductToCheckout();
      checkoutPage.completeStepsFrom1to5(checkoutData);

      let deliveryPrice = await checkoutPage.getProductDeliveryPrice();
      console.log("Delivery price: " + deliveryPrice);

      let totalPrice = await checkoutPage.getProductTotalPrice();
      console.log("Total price: " + totalPrice);

      checkoutPage.finishSteps();

      let calculatedTotalPrice = +price + +colorPrice + +deliveryPrice;

      I.assertEqual(calculatedTotalPrice, +totalPrice, "Don't match prices!");

      I.openOrderHistoryPage();
      let idLastOrder = await orderHistoryPage.grabLastOrderIfEqualsPrice(
        calculatedTotalPrice
      );
      console.log("Order ID: " + idLastOrder + "\n\n");
    }
  }
).tag("buy1");

Data(productData)
  .Scenario(
    "Buy product",
    async ({ I, productPage, checkoutPage, orderHistoryPage, current }) => {
      I.amOnPage(current.link);

      let price = await productPage.getProductPrice();
      console.log("Product price: " + price);

      productPage.selectColorProduct(current.color);

      let colorPrice = await productPage.getColorProductPrice();
      console.log("Color Price: " + colorPrice);

      productPage.addProductToCheckout();
      checkoutPage.completeStepsFrom1to5(checkoutData);

      let deliveryPrice = await checkoutPage.getProductDeliveryPrice();
      console.log("Delivery price: " + deliveryPrice);

      let totalPrice = await checkoutPage.getProductTotalPrice();
      console.log("Total price: " + totalPrice);

      checkoutPage.finishSteps();

      let calculatedTotalPrice = +price + +colorPrice + +deliveryPrice;

      I.assertEqual(calculatedTotalPrice, +totalPrice, "Don't match prices!");

      I.openOrderHistoryPage();
      let idLastOrder = await orderHistoryPage.grabLastOrderIfEqualsPrice(
        calculatedTotalPrice
      );
      console.log("Order ID: " + idLastOrder + "\n\n");
    }
  )
  .tag("buy2");
