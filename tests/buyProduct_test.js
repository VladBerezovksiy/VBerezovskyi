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

Before(async ({ I, homePage }) => {
  I.login(loginUser);
  await homePage.emptyCart();
});

Scenario(
  "Buy product",
  async ({ I, productPage, checkoutPage, orderHistoryPage }) => {
    for (let i = 0; i < 4; i++) {
      I.amOnPage(productOptions["product"][i]["link"]);

      let price = await I.parsePrice(await productPage.getProductPrice());
      console.log("Product price: $" + price);

      let colorPrice = 0;

      if (Boolean(productOptions["product"][i]["color"]) == true) {
        await productPage.selectColorProduct(
          productOptions["product"][i]["color"]
        );

        colorPrice = await productPage.getColorProductPrice();
        console.log("Color Price: $" + colorPrice);
      }

      productPage.addProductToCheckout();

      let buff = await checkoutPage.checkAlertNotAvailableOfProduct();
      if (Boolean(buff) == false) {
        checkoutPage.completeStepsFrom1to5(checkoutData);

        let deliveryPrice = await I.parsePrice(
          await checkoutPage.getProductDeliveryPrice()
        );
        console.log("Delivery price: $" + deliveryPrice);

        let totalPrice = await I.parsePrice(
          await checkoutPage.getProductTotalPrice()
        );
        console.log("Total price: $" + totalPrice);

        checkoutPage.finishSteps();

        let calculatedTotalPrice = price + colorPrice + deliveryPrice;

        I.assertEqual(calculatedTotalPrice, totalPrice, "Don't match prices!");

        I.openOrderHistoryPage();
        let idLastOrder = await I.parsePrice(
          await orderHistoryPage.grabLastOrderIfEqualsPrice(
            calculatedTotalPrice
          )
        );
        console.log("Order ID: " + idLastOrder + "\n\n");
      } else {
        console.log(
          "Product is not available in the desired quantity or not in stock!\n\n"
        );
      }
    }
  }
).tag("buy");
