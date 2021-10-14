function deleteRide() {
  // const user_name = localStorage.getItem("UserName");
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
        const userName = document.getElementById("user_name").value;
        alert("Succesfully Changed Account")
      })
  } else {
    alert("Please Sign in First")
  }
}

// delete a user
function deleteUser() {
  let user_Name = sessionStorage.getItem("UserName");
  let url = "user/delete/" + user_Name;
  if ((user_Name != "No One") && (user_Name != null)) {
    fetch("http://localhost:3000/" + url, {
        method: "DELETE",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: sessionStorage.getItem("UserName"),
        }),
      })
      .then(res => res.json())
      .then(data => console.log(data))
  }
}