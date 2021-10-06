
const registerUser = fetch ("cycle4life.heroku.com/login", {
    method:"POST",
    body: JSON.stringify({
       user_name: document.getElementById(userName).value,
       last_name: document.getElementById(lastName).value,
       email: document.getElementById(email).value ,
       password: document.getElementById(password).value,
       skill_level: document.getElementById(skillLevel).value
    })
})
document.getElementById("register-button").addEventListener("click",
 registerUser);
