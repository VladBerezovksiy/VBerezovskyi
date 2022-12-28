const Helper = require("@codeceptjs/helper");

const USD_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json";

class Converter extends Helper {
  async _parsePrice(string) {
    return parseFloat(string.replace(/[^0-9\.]+/g, ""));
  }

  async getUahPrice(price) {
    let converterPrice = await this._parsePrice(price);
    let response = await this.helpers["REST"].sendGetRequest(USD_URL);
    this.helpers["JSONResponse"].seeResponseCodeIs(200);
    let usdRate = await this._parsePrice(response.data[0].rate);
    let converterInUAH = converterPrice * usdRate;
    return parseFloat(converterInUAH);
  }
}

module.exports = Converter;
