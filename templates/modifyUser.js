function modifyUser() {
  let user_Name = localStorage.getItem("UserName");
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
        alert("Succesfully Changed Account")
      })
  } else {
    alert("Please Sign in First")
  }
}

// delete a user
function deleteUser() {
  console.log("deleteUser fired")
  let user_Name = localStorage.getItem("UserName");
  let url = "user/delete/" + user_Name;
  console.log("url is " + url)
  if ((user_Name != "No One") && (user_Name != null)) {

    fetch("http://localhost:3000/" + url, {
        method: "DELETE",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: user_Name,
        }),
      })
      .then(res => (res.json()))
      .then(res => {
        alert("Succesfully Deleted Account");
        logout();
      })
  }
}

function fillUserProfile() {
  console.log("fillUserProfile hit");
  const user_name = localStorage.getItem("UserName");
  let url = "users/" + user_name;
  if ((user_name != "No One") && (user_name != null)) {
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        let userData = data;

        const firstNameDiv = document.getElementById("first_name");
        const lastNameDiv = document.getElementById("last_name");
        const skillLevelDiv = document.getElementById("skill_level");
        const passwordDiv = document.getElementById("password");
        const emailDiv = document.getElementById("email");

        console.log(userData);
        firstNameDiv.value = userData[0].first_name;
        lastNameDiv.value = userData[0].last_name;
        skillLevelDiv.value = userData[0].skill_level;
        passwordDiv.value = userData[0].password;
        emailDiv.value = userData[0].email;

      });
  }
}