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
    I.openProductPage();

    let price = await productPage.getProductPrice();
    console.log("Product price: " + price);

    productPage.selectColorProduct(product);

    let colorPrice = await productPage.getColorProductPrice();
    console.log("Color Price: " + colorPrice);

    productPage.addProductToCheckout();
    checkoutPage.completeStepsFrom1to5(checkoutData);

    let deliveryPrice = await checkoutPage.getProductDeliveryPrice();
    console.log("Delivery price: " + deliveryPrice);

    let totalPrice = await checkoutPage.getProductTotalPrice();
    console.log("Total price: " + totalPrice);

    checkoutPage.finishSteps();

    let calculatedTotalPrice =
      parseFloat(price) + parseFloat(colorPrice) + parseFloat(deliveryPrice);

    I.assertEqual(
      calculatedTotalPrice,
      parseFloat(totalPrice),
      "Don't match prices!"
    );

    I.openOrderHistoryPage();
    let idLastOrder = await orderHistoryPage.grabLastOrderIfEqualsPrice(
      calculatedTotalPrice
    );
    console.log("Order ID: " + idLastOrder);
  }
).tag("buy");
