window.onload = function checkStatus() {
  if (
    localStorage.getItem("LogIn") != "Authorized" ||
    localStorage.getItem("LogIn") == undefined
  ) {
    window.location.href = "../";
  }
};
