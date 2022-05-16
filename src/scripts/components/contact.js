// const $ = require("jquery");
class Contact {
  constructor() {
    this.contactForm = document.getElementById("contact-form");
    if (this.contactForm) {
      this.contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.sendEmail();
      });
    }
  }

  sendEmail() {
    // const username = this.loginForm.loginUsername.value;
    // const password = this.loginForm.loginPassword.value;
    const url = window.location.origin + "/contact";
    const data = {
      test: "test",
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
          alert("msg sent");
        } else {
          alert("error");
        }
      });
  }
}

module.exports = {
  Contact,
};
