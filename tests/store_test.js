let registrationUser = {
  firstName: "Vlad",
  lastName: "3",
  phone: 380625431123,
  email: Date.now() + "@gmail.com",
  password: "Qwerty123456",
};

Feature("store");

Scenario("Registration", ({ I, homePage, registerPage }) => {
  I.openStore();
  homePage.openRegistrationPage();
  registerPage.verifyRegisterAccountText();
  registerPage.fillRegistrationDetails(registrationUser);
  registerPage.verifyRegisterAccountSuccessText();
}).tag("reg");
