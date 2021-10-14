function modifyUser() {
  let user_Name = localStorage.getItem("UserName");
  let url = "user/modify/" + user_Name;
  if ((user_Name != "No One") && (user_Name != null)) {
    fetch("https://cycling4life.herokuapp.com/" + url, {
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

    fetch("https://cycling4life.herokuapp.com/" + url, {
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