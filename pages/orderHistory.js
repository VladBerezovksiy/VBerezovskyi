const { totalPriceText } = require("./checkout");

const { I } = inject();

module.exports = {
  lastOrderId: { xpath: '//*[@id="content"]/div[1]/table/tbody/tr[1]/td[1]' },
  lastPriceOrderText: {
    xpath: '//*[@id="content"]/div[1]/table/tbody/tr[1]/td[5]',
  },

  async grapLastOrder(totalPrice) {
    let price = await (
      await I.grabTextFrom(this.lastPriceOrderText)
    ).replace(/[^0-9\.]+/g, "");
    console.log("Check last order history price: " + price);

    if (parseFloat(price) == totalPrice) {
      return await (
        await I.grabTextFrom(this.lastOrderId)
      ).replace(/[^0-9\.]+/g, "");
    }
  },
};
