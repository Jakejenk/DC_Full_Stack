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
        // Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: document.getElementById("user_name").value,
        password: document.getElementById("password").value,
      }),
    })
    .then(response => console.log(response.json()))
    .then(json => console.log(json));
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