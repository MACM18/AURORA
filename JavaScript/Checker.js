// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("Rate")
//     .addEventListener("keypress", function (event) {
//       if (event.key == "Enter") {
//         Submit();
//       }
//     });
// });
var selectedID, Total;
function toggleVisibility(className) {
  document.getElementById(className).classList.toggle("hidden");
}
function clearTable() {
  document.querySelectorAll("tr").forEach((element) => {
    element.classList.add("hidden");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchOpertorsDetails();
  fetchCheckerDetails();
});
function fetchOpertorsDetails() {
  const date = new Date().toLocaleDateString();
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("Date", "5/14/2023");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };
  fetch("../PHP/GetWorkerDetails.php", requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => DisplayOperatorData(result))
    .catch((error) => console.log("error", error));
}
function fetchCheckerDetails() {
  const date = new Date().toLocaleDateString();
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("Date", date);
  formdata.append("userName", localStorage.getItem("userName"));
  console.log(date);
  console.log(localStorage.getItem("userName"));
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };
  fetch("../PHP/GetChecker.php", requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => DisplayCheckerData(result))
    .catch((error) => console.log("error", error));
}
function DisplayOperatorData(params) {
  const element = document.getElementById("Selection");
  let table = document.createElement("table");
  let dataRow;
  params.forEach((element) => {
    dataRow = document.createElement("tr");
    dataRow.id = element[0];
    dataRow.Name = "datarow";
    dataRow.className = "DataRow";
    let id = document.createElement("td");
    id.innerHTML = element[0];
    let user = document.createElement("td");
    user.innerHTML = element[1];
    let date = document.createElement("td");
    date.innerHTML = element[2];
    let rate = document.createElement("td");
    rate.innerHTML = element[3];
    let hour = document.createElement("td");
    hour.innerHTML = element[4];
    let status = document.createElement("td");
    let button = document.createElement("button");
    button.innerHTML = "Select";
    button.onclick = () => {
      selectedID = element[0];
      Total = element[3];
      // hourData = element[4];
      clearTable();
      document.getElementById(selectedID).classList.remove("hidden");
      toggleVisibility("Main");
    };
    status.appendChild(button);
    dataRow.appendChild(id);
    dataRow.appendChild(user);
    dataRow.appendChild(date);
    dataRow.appendChild(rate);
    dataRow.appendChild(hour);
    dataRow.appendChild(status);
    table.appendChild(dataRow);
  });
  element.appendChild(table);
}
function DisplayCheckerData(params) {
  const element = document.getElementById("Data");
  let table = document.createElement("table");
  let dataRow;
  params.forEach((element) => {
    dataRow = document.createElement("tr");
    dataRow.id = element[0];
    let id = document.createElement("td");
    id.innerHTML = element[0];
    let user = document.createElement("td");
    user.innerHTML = element[1];
    let date = document.createElement("td");
    date.innerHTML = element[2];
    let good = document.createElement("td");
    good.innerHTML = element[3];
    let bad = document.createElement("td");
    bad.innerHTML = element[4];
    let operator = document.createElement("td");
    operator.innerHTML = element[5];
    dataRow.appendChild(id);
    dataRow.appendChild(user);
    dataRow.appendChild(date);
    dataRow.appendChild(good);
    dataRow.appendChild(bad);
    dataRow.appendChild(operator);
    table.appendChild(dataRow);
  });
  element.replaceChildren(table);
}
function Submit() {
  const Good = document.getElementById("Good").value;
  const Bad = document.getElementById("Damage").value;
  if (parseInt(Good) + parseInt(Bad) == parseInt(Total)) {
    const User = localStorage.getItem("userName");
    const date = new Date().toLocaleDateString();
    console.log(date);
    const operator = selectedID;
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("Good", Good);
    formdata.append("Bad", Bad);
    // formdata.append("Hour", hourData);
    formdata.append("User", User);
    formdata.append("Date", date);
    formdata.append("Operator", operator);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch("../PHP/SetChecker.php", requestOptions)
      .then((response) => response.json())
      // .then((result) => console.log(result))
      .then((result) => Notification(result))
      .catch((error) => console.log("error", error));
    Submit2();
  } else {
    const element = document.getElementById("Notification");
    element.innerHTML = "Values does not match check again ";
    document.getElementById("Notification").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("Notification").classList.add("hidden");
    }, 2000);
  }
}
function Submit2() {
  const id = selectedID;
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("status", "Completed");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  fetch("../PHP/SetWorker.php?Type=Update", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    // .then((result) => Notification(result))
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
function showData() {
  const btnText = document.getElementById("showDataBtn");
  if (btnText.innerHTML == "Show Data") {
    btnText.innerHTML = "Hide Data";
    fetchCheckerDetails();
  } else btnText.innerHTML = "Show Data";
  toggleVisibility("Data");
}
