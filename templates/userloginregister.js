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

async function loginUser() {
  await fetch("http://localhost:3000/loginAttempt", {
      method: "POST",
      headers: {
        // "Accept": "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: document.getElementById("user_name").value,
        password: document.getElementById("password").value,
      }),
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then((res) => {
      const loginAlert = document.getElementById("wrong-login-alert");
      loginAlert.hidden = false;
      console.log("TEST");
    })
  // .then(response => console.log(response.json()))
  // .then((response) => {
  //   response.json().then((data) => {
  //     console.log(data)
  //   })
  // })
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok.')
  //   }
  // })
  // .then(data => {
  //   console.log(data.json())
  // })
  // .then(json => console.log(json));
}

function deleteRide() {
  fetch("http://localhost:3000/ridesDelete", {
      method: "DELETE",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_of_ride: document.getElementById("date_of_ride").value,
        user_name: document.getElementById("user_name").value,
      }),
    })
    .then((res) => res.json())
    .then((res) => console.log(res));
}