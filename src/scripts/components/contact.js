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
    const name = this.contactForm.contactUsName.value;
    const phone = this.contactForm.contactUsPhone.value;
    const email = this.contactForm.contactUsEmail.value;
    const subject = this.contactForm.contactUsSubject.value;
    const msg = this.contactForm.contactUsMsg.value;

    if (
      name == "" ||
      phone == "" ||
      email == "" ||
      subject == "" ||
      msg == ""
    ) {
      alert("Name, phone, email, subject and message can't be empty");
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Please enter a valid email format");
      return;
    }

    // const password = this.loginForm.loginPassword.value;
    const url = window.location.origin + "/contact";
    const data = {
      name,
      phone,
      email,
      subject,
      msg,
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
