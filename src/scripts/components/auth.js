const $ = require("jquery");
class Auth {
  constructor() {
    this.loginForm = document.getElementById("login-form");
    this.signupForm = document.getElementById("signup-form");
    this.userNameEl = document.querySelector(".profile-popup__username");
    if (this.userNameEl) {
      this.updateName();
    }
    if (this.loginForm) {
      this.loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.login();
      });
    }
    if (this.signupForm) {
      this.signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.signup();
      });
    }
    const userTypeTemp = document.cookie.substring(
      document.cookie.search("type"),
      document.cookie.length
    );
    const userType = userTypeTemp.substring(5, userTypeTemp.search(";"));
    if (userType == 1) {
      $(".dashboard-link").remove();
    }
  }

  login() {
    const username = this.loginForm.loginUsername.value;
    const password = this.loginForm.loginPassword.value;
    const url = window.location.origin + "/users/login";
    const data = {
      userName: username,
      password: password,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result == "success") {
          window.location.replace(window.location.origin + "/");
        } else {
          alert("error");
        }
      });
  }

  signup() {
    const firstName = this.signupForm.signupFirstname.value;
    const lastName = this.signupForm.signupLastname.value;
    const username = this.signupForm.signupUsername.value;
    const password = this.signupForm.signupPassword.value;
    const confirmPassword = this.signupForm.signupConfirmPassword.value;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    const url = window.location.origin + "/users/create";
    const data = {
      firstName: firstName,
      lastName: lastName,
      userName: username,
      password: password,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result == "success") {
          window.location.replace(window.location.origin + "/");
        } else {
          alert("error");
        }
      });
  }

  updateName() {
    const firstNameTemp = document.cookie.substring(
      document.cookie.search("firstName"),
      document.cookie.length
    );
    const firstName = firstNameTemp.substring(10, firstNameTemp.search(";"));
    const lastNameTemp = document.cookie.substring(
      document.cookie.search("lastName"),
      document.cookie.length
    );
    const lastName = lastNameTemp.substring(9, lastNameTemp.search(";"));
    this.userNameEl.innerText = firstName + " " + lastName;
  }
}

module.exports = {
  Auth,
};
