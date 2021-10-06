// FOR TESTING LOCALLY, USE "http://localhost:3300/registration" IN THE FETCH
// WHEN DOING A GIT POST, CHANGE BACK TO "https://cycling4life.herokuapp.com/registration" IN THE FETCH

const registerUser = function() {
  fetch("https://cycling4life.herokuapp.com/registration", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_name": document.getElementById("userName").value,
        "first_name": document.getElementById("firstName").value,
        "last_name": document.getElementById("lastName").value,
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value,
        "skill_level": document.getElementById("skillLevel").value,
      }),
    })
    .then((res) => res.json())
    .then((res) => console.log(res));
};