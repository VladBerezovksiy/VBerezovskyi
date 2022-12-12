/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type homePage = typeof import('./pages/home.js');
type productPage = typeof import('./pages/product.js');
type createAccountsPage = typeof import('./pages/createAccounts.js');
type authPage = typeof import('./pages/auth.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, homePage: homePage, productPage: productPage, createAccountsPage: createAccountsPage, authPage: authPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
