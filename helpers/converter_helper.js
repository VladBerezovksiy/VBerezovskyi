const Helper = require("@codeceptjs/helper");

class Converter extends Helper {
  async parsePrice(string) {
    return parseFloat(string.replace(/[^0-9\.]+/g, ""));
  }
}

module.exports = Converter;
