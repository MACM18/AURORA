function LogOut() {
  localStorage.removeItem("userName");
  localStorage.removeItem("LogIn");
  window.location.href = "../";
}
