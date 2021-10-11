function loginUser() {
  axios
    .post("http://localhost:3000/loginAttempt", {
      user_name: document.getElementById("user_name").value,
      password: document.getElementById("password").value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// function loginUser() {
//   fetch("http://localhost:3000/loginAttempt", {
//     method: "POST",
//     headers: {
//       // Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       user_name: document.getElementById("user_name").value,
//       password: document.getElementById("password").value,
//     }),
//   }).then((res) => {
//     console.log(res);
//   });
// }

// const registerUser1 = function () {
//   fetch("http://localhost:3000/registrationAttempt", {
//     method: "POST",
//     headers: {
//       // Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       user_name: document.getElementById("user_name").value,
//       first_name: document.getElementById("first_name").value,
//       last_name: document.getElementById("last_name").value,
//       email: document.getElementById("email").value,
//       password: document.getElementById("password").value,
//       skill_level: document.getElementById("skill_level").value,
//     }),
//   })
//     .then((res) => res.json())

//     .then((res) => console.log(res));
// };
