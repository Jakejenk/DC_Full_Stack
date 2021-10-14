async function setStateOfUser() {
  // console.log("setStateOfUser running...");
  const user_name = localStorage.getItem("UserName");
  const signInLink = document.getElementById("signInLink");
  const registerLink = document.getElementById("registerLink");
  const logoutLink = document.getElementById("logoutLink");
  const welcomeLink = document.getElementById("welcomeLink");
  if ((user_name != "No One") && (user_name != null)) {
    console.log("username after setStateOfUser() = ", user_name);

    signInLink.hidden = true;
    registerLink.hidden = true;
    logoutLink.hidden = false;
    welcomeLink.hidden = false;
    welcomeLink.innerHTML = "Welcome " + user_name;
  } else {
    signInLink.hidden = false;
    registerLink.hidden = false;
    logoutLink.hidden = true;
    welcomeLink.hidden = true;
  }
};

function logout() {
  console.log("logout was called");
  localStorage.setItem("UserName", "No One");
  setStateOfUser();
}