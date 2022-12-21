const fs = require("fs");
const JSON_FILE = "./input/productOptions.json";

module.exports = {
  getProductsFromJson() {
    return JSON.parse(this.readContectFromFile(JSON_FILE));
  },

  readContectFromFile(path) {
    try {
      return fs.readFileSync(path, "utf8");
    } catch (err) {
      console.error(err);
    }
  },

  getArrayFromString(string) {
    return string.split("\r\n");
  },

  getArrayOfProductObjects(array) {
    let arrayOfObjects = [];
    for (const element of array) {
      arrayOfObjects.push({ link: element });
    }
    return arrayOfObjects;
  },
};
