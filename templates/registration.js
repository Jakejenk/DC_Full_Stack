function registerUser() {
  fetch("https://cycling4life.herokuapp.com/registrationAttempt", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: document.getElementById("user_name").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        skill_level: document.getElementById("skill_level").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value
      }),
    })
    .then(res => (res.json()))
    .then(res => {
      const userName = document.getElementById("user_name").value;
      localStorage.setItem("UserName", userName);
    })
    .then(res => {
      let user_name = localStorage.getItem("UserName");
      if (user_name === "No One" || user_name === null) {
        return
      } else {
        document.location.replace("https://cycling4life.herokuapp.com/home");
      }
    })
}


function validateRegistration() {
  if (document.getElementById("user_name").value == "") {
    alert("Please provide your username!");
    document.getElementById("user_name").focus();
    return false;
  }
  if (document.getElementById("first_name").value == "") {
    alert("Please provide your First Name!");
    document.getElementById("first_name").focus();
    return false;
  }
  if (document.getElementById("last_name").value == "") {
    alert("Please provide your Last Name!");
    document.getElementById("last_name").focus();
    return false;
  }
  if (document.getElementById("skill_level").value == "") {
    alert("Please provide your Skill Level!");
    document.getElementById("skill_level").focus();
    return false;
  }
  if (document.getElementById("password").value == "") {
    alert("Please provide your Password!");
    document.getElementById("password").focus();
    return false;
  }
  if (document.getElementById("email").value == "") {
    alert("Please provide your Email!");
    document.getElementById("email").focus();
    return false;
  } else {
    registerUser();
  }
}