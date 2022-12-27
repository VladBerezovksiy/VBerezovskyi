/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type homePage = typeof import('./pages/home.js');
type registerPage = typeof import('./pages/register.js');
type productPage = typeof import('./pages/product.js');
type checkoutPage = typeof import('./pages/checkout.js');
type orderHistoryPage = typeof import('./pages/orderHistory.js');
type helper = typeof import('./helpers/helper.js');
type ChaiWrapper = import('codeceptjs-chai');
type Converter = import('./helpers/converter_helper.js');
type ConverterСurrency = import('./helpers/converterCurrency.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, homePage: homePage, registerPage: registerPage, productPage: productPage, checkoutPage: checkoutPage, orderHistoryPage: orderHistoryPage, helper: helper }
  interface Methods extends Playwright, ChaiWrapper, Converter, ConverterСurrency, REST, JSONResponse {}
  interface I extends ReturnType<steps_file>, WithTranslation<ChaiWrapper>, WithTranslation<Converter>, WithTranslation<ConverterСurrency>, WithTranslation<JSONResponse> {}
  namespace Translation {
    interface Actions {}
  }
}
