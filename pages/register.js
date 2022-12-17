const { I } = inject();

module.exports = {
  registerHeaderText: "Register Account",
  registerSuccessText: "Your Account Has Been Created!",
  firstNameField: { css: "#input-firstname" },
  emailField: { css: "#input-email" },
  lastNameField: { css: "#input-lastname" },
  phoneField: { css: "#input-telephone" },
  pswField: { css: "#input-password" },
  rePswField: { css: "#input-confirm" },
  privacyPolicyButton: {
    css: "#content > form > div > div > input[type=radio]:nth-child(2)",
  },
  continueButton: {
    css: "#content > form > div > div > input.btn.btn-primary",
  },

  verifyRegisterAccountText() {
    I.see(this.registerHeaderText);
  },

  fillRegistrationDetails(user) {
    I.fillField(this.firstNameField, user.firstName);
    I.fillField(this.lastNameField, user.lastName);
    console.log("Email:" + user.email);
    I.fillField(this.emailField, user.email);
    I.fillField(this.phoneField, user.phone);
    console.log("Password:" + user.password);
    I.fillField(this.pswField, user.password);
    I.fillField(this.rePswField, user.password);
    I.click(this.privacyPolicyButton);
    I.click(this.continueButton);
  },

  verifyRegisterAccountSuccessText() {
    I.see(this.registerSuccessText);
  },
};
