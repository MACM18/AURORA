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
function toggleTable() {
  document.querySelectorAll("tr").forEach((element) => {
    element.classList.toggle("hidden");
  });
}
function formatTable() {
  document.querySelectorAll("table").forEach((element) => {
    element.classList.add("p-2", "bg-Green1", "table-auto", "rounded-lg");
  });
  document.querySelectorAll("td").forEach((element) => {
    element.classList.add("px-2", "text-center");
  });
  document.querySelectorAll("th").forEach((element) => {
    element.classList.add(
      "bg-Green2",
      "px-2",
      "text-white",
      "text-center",
      "font-bold",
      "rounded-md"
    );
  });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchOpertorsDetails();
  fetchCheckerDetails();
  setOrdersListValues();
});
function fetchOpertorsDetails() {
  const date = new Date().toLocaleDateString();
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("Date", date);
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
  // let date = "5/17/2023";
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("Date", date);
  formdata.append("userName", localStorage.getItem("userName"));
  // console.log(date);
  console.log(localStorage.getItem("userName"));
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };
  fetch("../PHP/GetChecker.php?Type=Part", requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => DisplayCheckerData(result))
    .catch((error) => console.log("error", error));
}
function setOrdersListValues() {
  var myHeaders = new Headers();
  var formdata = new FormData();
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };
  fetch("../PHP/GetOrders.php", requestOptions)
    .then((response) => response.json())
    .then((result) => sortOrders(result))
    .catch((error) => console.log("error", error));
}
function DisplayOperatorData(params) {
  const element = document.getElementById("Selection");
  let table = document.createElement("table");
  let titles = document.createElement("tr");
  let id = document.createElement("th");
  id.innerHTML = "ID";
  let user = document.createElement("th");
  user.innerHTML = "User";
  let date = document.createElement("th");
  date.innerHTML = "Date";
  let rate = document.createElement("th");
  rate.innerHTML = "Rate";
  let hour = document.createElement("th");
  hour.innerHTML = "Hour";
  let select = document.createElement("th");
  select.innerHTML = "Select";
  titles.appendChild(id);
  titles.appendChild(user);
  titles.appendChild(date);
  titles.appendChild(rate);
  titles.appendChild(hour);
  titles.appendChild(select);
  table.appendChild(titles);
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
    button.classList.add(
      "p-2",
      "bg-Green2",
      "rounded-lg",
      "text-white",
      "hover:bg-white",
      "hover:text-black"
    );
    button.onclick = () => {
      selectedID = element[0];
      Total = element[3];
      // hourData = element[4];
      toggleTable();
      document.getElementById(selectedID).classList.remove("hidden");
      toggleVisibility("Main");
      toggleVisibility("showDataBtn");
      if (button.innerHTML == "Select") {
        button.innerHTML = "Back";
        document.getElementById("Title").innerHTML = "Ckecking...";
      } else {
        button.innerHTML = "Select";
        document.getElementById("Title").innerHTML = "You Are A Checker";
        fetchOpertorsDetails();
      }
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
  element.replaceChildren(table);
  formatTable();
}
function DisplayCheckerData(params) {
  const element = document.getElementById("Data");
  let table = document.createElement("table");
  let titles = document.createElement("tr");
  let id = document.createElement("th");
  id.innerHTML = "ID";
  let user = document.createElement("th");
  user.innerHTML = "Checker";
  let date = document.createElement("th");
  date.innerHTML = "Date";
  let rate = document.createElement("th");
  rate.innerHTML = "Good";
  let hour = document.createElement("th");
  hour.innerHTML = "Damaged";
  let select = document.createElement("th");
  select.innerHTML = "OperatorID";
  titles.appendChild(id);
  titles.appendChild(user);
  titles.appendChild(date);
  titles.appendChild(rate);
  titles.appendChild(hour);
  titles.appendChild(select);
  table.appendChild(titles);
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
  formatTable();
}
function sortOrders(params) {
  console.log(params);
  let currntDate = new Date();

  let tempDate, temp;
  let sortedArray = [];
  params.forEach((element) => {
    temp = element[1].split("/");
    tempDate = new Date(temp[2], temp[1], temp[0]);
    if (tempDate >= currntDate) sortedArray[sortedArray.length] = element;
  });
  setOptions(sortedArray);
}
function setOptions(params) {
  const optionArea = document.getElementById("OrdersList");
  let selectOption;
  params.forEach((element) => {
    selectOption = document.createElement("option");
    selectOption.innerHTML = element[0];
    optionArea.appendChild(selectOption);
  });
}
function Submit() {
  const Good = document.getElementById("Good").value;
  const Bad = document.getElementById("Damage").value;
  const orders = document.getElementById("OrdersList").value;
  if (parseInt(Good) + parseInt(Bad) == parseInt(Total)) {
    const User = localStorage.getItem("userName");
    const date = new Date().toLocaleDateString();
    // console.log(date);
    const operator = selectedID;
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("Good", Good);
    formdata.append("Bad", Bad);
    // formdata.append("Hour", hourData);
    formdata.append("User", User);
    formdata.append("Date", date);
    formdata.append("Operator", operator);
    formdata.append("Orders", orders);
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
  if (btnText.innerHTML == "Hide Data") {
    btnText.innerHTML = "Show Data";
    document.getElementById("Title").innerHTML = "You Are A Checker";
    fetchOpertorsDetails();
  } else {
    btnText.innerHTML = "Hide Data";
    fetchCheckerDetails();
    document.getElementById("Title").innerHTML = "Checked";
  }
  toggleVisibility("Data");
  toggleVisibility("Selection");
}
