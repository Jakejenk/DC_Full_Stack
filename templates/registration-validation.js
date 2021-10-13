function validateRegistration() {
    if (document.myForm.user_name.value == "") {
      alert("Please provide your username!");
      document.myForm.user_name.focus();
      return false;
    }
    if (document.myForm.first_name.value == "") {
        alert("Please provide your First Name!");
        document.myForm.first_name.focus();
        return false;
      }
      if (document.myForm.last_name.value == "") {
        alert("Please provide your Last Name!");
        document.myForm.last_name.focus();
        return false;
      }
    if (document.myForm.skill_level.value == "") {
      alert("Please provide your Skill Level!");
      document.myForm.skill_level.focus();
      return false;
    }
    if (document.myForm.password.value == "") {
        alert("Please provide your Password!");
        document.myForm.password.focus();
        return false;
      }
      if (document.myForm.email.value == "") {
        alert("Please provide your Email!");
        document.myForm.email.focus();
        return false;
      }
}
