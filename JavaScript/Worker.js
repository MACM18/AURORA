document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("Rate")
    .addEventListener("keypress", function (event) {
      if (event.key == "Enter") {
        Submit();
      }
    });
});
function Submit() {
  const Hour = document.getElementById("Hour").value;
  const Rate = document.getElementById("Rate").value;
  const User = localStorage.getItem("userName");
  const date = new Date().toLocaleDateString();
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("Hour", Hour);
  formdata.append("Rate", Rate);
  formdata.append("User", User);
  formdata.append("Date", date);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  fetch("../PHP/SetWorker.php", requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => Notification(result))
    .catch((error) => console.log("error", error));
}
function Notification(params) {
  const element = document.getElementById("Notification");
  if (params["Status"] == "Success") {
    element.innerHTML = "🔔 Updated! ";
  } else {
    element.innerHTML = "🚫 Failed! ";
  }
  document.getElementById("Notification").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("Notification").classList.add("hidden");
  }, 2000);
}
