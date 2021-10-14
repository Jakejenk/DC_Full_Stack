async function loginUser() {

  let response = await fetch("https://cycling4life.herokuapp.com/loginAttempt", {
      method: "POST",
      headers: {
        // "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: document.getElementById("user_name").value,
        password: document.getElementById("password").value,
      })
    }).then(res => (res.json()))
    .then(res => {
      if (res.isMatch === "false") {
        alert("The username & password combination is incorrect. Please try again.");
      } else if (res.isMatch === "true") {
        const userName = document.getElementById("user_name").value;
        localStorage.setItem("UserName", userName);
      }
    })
    .then(res => {
      let user_name = localStorage.getItem("UserName");
      if (user_name === "No One" || user_name === null) {
        return
      } else {
        document.location.replace("https://cycling4life.herokuapp.com/home");
      }
    })
};

function validateLogin() {


  if (document.getElementById("user_name").value == "") {
    alert("Please provide your username!");
    document.getElementById("user_name").focus();
    return false;
  }
  if (document.getElementById("password").value == "") {
    alert("Please provide your Password!");
    document.getElementById("password").focus();
    return false;
  } else {
    loginUser()
  }
}