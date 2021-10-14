// const express = require("express");

function registerUser() {
  fetch("http://localhost:3000/registrationAttempt", {
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
      sessionStorage.setItem("UserName", userName);
    })
}


function loginUser() {
  fetch("http://localhost:3000/loginAttempt", {
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
        alert("The email & password combination is incorrect. Please try again.");
      } else if (res.isMatch === "true") {
        const userName = document.getElementById("user_name").value;
        sessionStorage.setItem("UserName", userName);
        // console.log("loginUser .then statements running ...")
        setStateOfUser();
      }

    })
}

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
    // console.log("Calling loginUser.")
    loginUser();
  }


  //   if (document.myForm.Zip.value == "" || isNaN(document.myForm.Zip.value) ||
  //     document.myForm.Zip.value.length != 5) {

  //     alert("Please provide a zip in the format #####.");
  //     document.myForm.Zip.focus();
  //     return false;
  //   }
  //   if (document.myForm.Country.value == "-1") {
  //     alert("Please provide your country!");
  //     return false;
  //   }
  //   return (true);
}

function validateRegistration() {
  if (document.getElementById("user_name").value == "") {
    alert("Please provide your username!");
    document.getElementById("user_name").focus();
    return false;
  }
  if (document.getElementById("first_name").value == "") {
    alert("Please provide your username!");
    document.getElementById("first_name").focus();
    return false;
  }
  if (document.getElementById("last_name").value == "") {
    alert("Please provide your username!");
    document.getElementById("last_name").focus();
    return false;
  }
  if (document.getElementById("skill_level").value == "") {
    alert("Please provide your username!");
    document.getElementById("skill_level").focus();
    return false;
  }
  if (document.getElementById("password").value == "") {
    alert("Please provide your username!");
    document.getElementById("password").focus();
    return false;
  }
  if (document.getElementById("email").value == "") {
    alert("Please provide your username!");
    document.getElementById("email").focus();
    return false;
  } else {
    registerUser();
  }
}

function deleteRide() {
  // const user_name = sessionStorage.getItem("UserName");
  fetch("http://localhost:3000/deleteRide", {
      method: "DELETE",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location_of_ride: document.getElementById("location").value,
        user_name: sessionStorage.getItem("UserName"),
      }),
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function modifyUser() {
  let user_Name = sessionStorage.getItem("UserName");
  let url = "user/modify/" + user_Name;
  if ((user_Name != "No One") && (user_Name != null)) {
    fetch("http://localhost:3000/" + url, {
      method: "PUT",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_Name,
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
        alert("Succesfully Changed Account")
      })
  }
  else {
    alert("Please Sign in First")
  }
}