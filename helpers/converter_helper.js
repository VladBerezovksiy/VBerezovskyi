const Helper = require("@codeceptjs/helper");

const USD_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json";

class Converter extends Helper {
  // async _getTextFromLocator(locator) {
  //   return await this.helpers["Playwright"].grabTextFrom(locator);
  // }

  // async _parsePrice(string) {
  //   string = await this._getTextFromLocator();
  //   return parseFloat(string.replace(/[^0-9\.]+/g, ""));
  // }

  async getUahPrice(locator) {
    let buff = await this.helpers["Playwright"].grabTextFrom(locator);
    console.log(buff);
    let price = parseFloat(buff.replace(/[^0-9\.]+/g, ""));
    console.log(price);
    let response = await this.helpers["REST"].sendGetRequest(USD_URL);
    this.helpers["JSONResponse"].seeResponseCodeIs(200);
    let buff1 = response.data[0].rate;
    console.log(buff1);
    let usdRate = parseFloat(buff1.replace(/[^0-9\.]+/g, ""));
    console.log(usdRate);
    let converterInUAH = price * usdRate;
    return parseFloat(converterInUAH);
  }
}

module.exports = Converter;
