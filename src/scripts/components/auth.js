class Auth {
  constructor() {
    this.form = document.getElementById("login-form");

    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.login();
      });
    }
  }
  login() {
    const username = this.form.loginUsername.value;
    const password = this.form.loginPassword.value;
    const url = window.location.origin + "/users/login";
    const data = {
      userName: username,
      password: password,
    };
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
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
}

module.exports = {
  Auth,
};
