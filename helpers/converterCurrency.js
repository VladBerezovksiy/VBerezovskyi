const Helper = require("@codeceptjs/helper");

class ConverterСurrency extends Helper {
  async changeUSDtoUAH(price) {
    let response = await this.sendGetRequest(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json"
    );
    this.seeResponseCodeIs(200);
    console.log(response.data[0].rate);
    let usdRate = response.data[0].rate;
    let converterInUAH = price * usdRate;
    console.log("UAH: " + converterInUAH);
    return converterInUAH;
  }
}

module.exports = ConverterСurrency;