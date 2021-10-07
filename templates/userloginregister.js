// FOR TESTING LOCALLY, USE "http://localhost:3300/registration" IN THE FETCH
// WHEN DOING A GIT POST, CHANGE BACK TO "https://cycling4life.herokuapp.com/registration" IN THE FETCH

const registerUser1 = function() {
  fetch("http://localhost:3300/registrationAttempt", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_name": document.getElementById("user_name").value,
        "first_name": document.getElementById("first_name").value,
        "last_name": document.getElementById("last_name").value,
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value,
        "skill_level": document.getElementById("skill_level").value,
      }),
    })
    .then((res) => res.json())
    .then((res) => console.log(res));
};