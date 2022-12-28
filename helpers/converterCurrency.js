const Helper = require("@codeceptjs/helper");

class ConverterСurrency extends Helper {
  async changeUSDtoUAH(price) {
    let response = await this.helpers["REST"].sendGetRequest(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json"
    );
    this.helpers["JSONResponse"].seeResponseCodeIs(200);
    let usdRate = response.data[0].rate;
    let converterInUAH = price * usdRate;
    return parseFloat(converterInUAH);
  }
}

module.exports = ConverterСurrency;
