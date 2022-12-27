const { I } = inject();

module.exports = {
  lastOrderId: { xpath: '//*[@id="content"]/div[1]/table/tbody/tr[1]/td[1]' },
  lastPriceOrderText: {
    xpath: '//*[@id="content"]/div[1]/table/tbody/tr[1]/td[5]',
  },

  async grabLastOrderIfEqualsPrice(totalPrice) {
    let price = await I.parsePrice(
      await I.grabTextFrom(this.lastPriceOrderText)
    );
    console.log("Check last order history price: " + price);

    if (price == totalPrice) {
      return await I.parsePrice(await I.grabTextFrom(this.lastOrderId));
    }
  },
};
