// Form validation code will come here.
function validate() {

  if (document.myForm.user_name.value == "") {
    alert("Please provide your username!");
    document.myForm.user_name.focus();
    return false;
  }
  if (document.myForm.password.value == "") {
    alert("Please provide your Email!");
    document.myForm.password.focus();
    return false;
  }
  //   if (document.myForm.Zip.value == "" || isNaN(document.myForm.Zip.value) ||
  //     document.myForm.Zip.value.length != 5) {

  //     alert("Please provide a zip in the format #####.");
  //     document.myForm.Zip.focus();
  //     return false;
  //   }
  //   if (document.myForm.Country.value == "-1") {
  //     alert("Please provide your country!");
  //     return false;
  //   }
  //   return (true);
}