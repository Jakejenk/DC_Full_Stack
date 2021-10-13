function setStateOfUser() {
  console.log("setStateOfUser running...");
  const user_name = sessionStorage.getItem("UserName");
  const signInLink = document.getElementById("signInLink");
  const registerLink = document.getElementById("registerLink");
  const logoutLink = document.getElementById("logoutLink");
  const welcomeLink = document.getElementById("welcomeLink");
  if ((user_name != "No One") && (user_name != null)) {
    console.log("Someone is logged in")
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
  sessionStorage.setItem("UserName", "No One");
  setStateOfUser();
}