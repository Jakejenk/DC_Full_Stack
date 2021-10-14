async function setStateOfUser() {
  const user_name = localStorage.getItem("UserName");
  const signInLink = document.getElementById("signInLink");
  const registerLink = document.getElementById("registerLink");
  const logoutLink = document.getElementById("logoutLink");
  const profileLink = document.getElementById("profileLink");
  const homeLink = document.getElementById("homeLink");
  const aboutLink = document.getElementById("aboutLink");
  const welcomeLink = document.getElementById("welcomeLink");
  if ((user_name != "No One") && (user_name != null)) {
    aboutLink.hidden = false;
    homeLink.hidden = false;
    profileLink.hidden = false;
    signInLink.hidden = true;
    registerLink.hidden = true;
    logoutLink.hidden = false;
    welcomeLink.hidden = false;
    welcomeLink.innerHTML = "Welcome " + user_name;
  } else {
    aboutLink.hidden = true;
    homeLink.hidden = true;
    profileLink.hidden = true;
    signInLink.hidden = false;
    registerLink.hidden = false;
    logoutLink.hidden = true;
    welcomeLink.hidden = true;
  }
};

function logout() {
  localStorage.setItem("UserName", "No One");
  setStateOfUser();
}