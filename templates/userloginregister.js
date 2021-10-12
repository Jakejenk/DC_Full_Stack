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
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        skill_level: document.getElementById("skill_level").value,
      }),
    })
    .then((res) => res.json())
    .then((res) => console.log(res));
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
        const loginAlert = document.getElementById("wrong-login-alert");
        loginAlert.hidden = false;
      } else if (res.isMatch === "true") {
        const userName = document.getElementById("user_name").value;
        sessionStorage.setItem("UserName", userName);
        window.location.replace("http://localhost:3000/");
      }

    })
}

function deleteRide() {
  // e.preventDefault();
  // let nameValue = document.getElementById("user_name").value;
  // let locationValue = document.getElementById("location_of_ride")
  // let url = "/rides/" + nameValue;
  // console.log(nameValue);
  // console.log(url);
  // fetch(url)
  fetch("http://localhost:3000/deleteRide", {
      method: "DELETE",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location_of_ride: document.getElementById("location_of_ride").value,
        user_name: document.getElementById("user_name").value,
      }),
    })
    .then(res => res.json())
    .then(data => console.log(data))
}