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
    const username = this.loginForm.loginUsername.value.trim();
    const password = this.loginForm.loginPassword.value.trim();

    if (username == "" || password == "") {
      alert("Username and password can't be empty");
      return;
    }

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
          alert("The username or password are incorrect");
        }
      });
  }

  signup() {
    const firstName = this.signupForm.signupFirstname.value.trim();
    const lastName = this.signupForm.signupLastname.value.trim();
    const username = this.signupForm.signupUsername.value.trim();
    const password = this.signupForm.signupPassword.value.trim();
    const confirmPassword = this.signupForm.signupConfirmPassword.value;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    if (
      username.length < 4 ||
      firstName.length < 4 ||
      lastName.length < 4 ||
      password.length < 4
    ) {
      alert(
        "FirstName, username, lastname and password should be greater than 4 chars"
      );
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
          alert("your account is created successfully");
          window.location.replace(window.location.origin + "/");
        } else {
          alert(data.result);
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
