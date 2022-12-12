Feature("store");

Scenario("test something", ({ I }) => {
  I.amOnPage("http://opencart.qatestlab.net/index.php?route=account/login");
  pause();
});
