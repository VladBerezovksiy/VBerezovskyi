let registrationUser = {
  firstName: "Vlad",
  lastName: "3",
  phone: 380625431123,
  email: Date.now() + "@gmail.com",
  password: "Qwerty123456",
};

Feature("store");

Scenario("test something", ({ I, homePage, registerPage }) => {
  I.openStore();
  homePage.openRegistrationPage();
  registerPage.verifyRegisterAccountText();
  registerPage.fillRegisxtrationDetails(registrationUser);
  registerPage.verifyRegisterAccountSuccessText();
});
