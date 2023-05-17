document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("password")
    .addEventListener("keypress", function (event) {
      if (event.key == "Enter") {
        LogIn();
      }
    });
});

function LogIn() {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;

  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("userName", userName);
  formdata.append("password", password);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  fetch("./PHP/GetUser.php", requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => approve(result))
    .catch((error) => console.log("error", error));
}
function approve(params) {
  if (params["Authorize"] == true) {
    localStorage.setItem("LogIn", "Authorized");
    console.log(userName);
    localStorage.setItem("userName", document.getElementById("userName").value);
    if (params["Type"] == "Admin") window.location.href = "./HTML/Admin.html";
    if (params["Type"] == "Checker")
      window.location.href = "./HTML/Checker.html";
    if (params["Type"] == "Worker") window.location.href = "./HTML/Worker.html";
  } else localStorage.setItem("LogIn", "UnAuthorized");
}
