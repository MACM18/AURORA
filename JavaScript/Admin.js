google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(GoodVsDamaged);
google.charts.setOnLoadCallback(CompletedvsRemaining);
let Good = 0,
  Bad = 0,
  completed = 0,
  remaining = 0;
function fetchItemDetails() {
  (Good = 0), (Bad = 0);
  var myHeaders = new Headers();
  const value = document.getElementById("date").value;
  const temp = value.split("-");
  if (temp[1][0] == 0) {
    temp[1] = temp[1][1];
  }
  const date = temp[1] + "/" + temp[2] + "/" + temp[0];
  console.log(date);
  var formdata = new FormData();
  formdata.append("Date", date);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  fetch("../PHP/GetChecker.php?Type=All", requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => CalculateGoodvsDamaged(result))
    .catch((error) => console.log("error", error));
}
function fetchOrder() {
  (completed = 0), (remaining = 0);
  var myHeaders = new Headers();
  const id = document.getElementById("orderId").value;
  var formdata = new FormData();
  formdata.append("orderId", id);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  fetch("../PHP/GetChecker.php?Type=Order", requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => CalculateCompleted(result))
    .catch((error) => console.log("error", error));
}
function CalculateGoodvsDamaged(params) {
  params.forEach((element) => {
    Good += parseInt(element[3]);
    Bad += parseInt(element[4]);
  });
  console.log(Good);
  GoodVsDamaged();
}
function CalculateCompleted(params) {
  params.forEach((element) => {
    completed += parseInt(element[0]);
    remaining = parseInt(element[1]);
  });
  remaining -= parseInt(completed);
  console.log(completed);
  console.log(remaining);
  CompletedvsRemaining();
}
function GoodVsDamaged() {
  if (Good != 0 && Bad != 0) {
    document.getElementById("qualityGraph").classList.remove("hidden");
    document.getElementById("GraphAlt").innerHTML = "No Data";
    document.getElementById("GraphAlt").classList.add("hidden");
  } else {
    document.getElementById("qualityGraph").classList.add("hidden");
    document.getElementById("GraphAlt").innerHTML = "No Data";
    document.getElementById("GraphAlt").classList.remove("hidden");
  }
  var data = google.visualization.arrayToDataTable([
    ["Type", "Amount"],
    ["Good", Good],
    ["Damaged", Bad],
  ]);

  var options = {
    title: "Porduct Quality",
    pieHole: 0.4,
    legend: "bottom",
    pieSliceTextStyle: {
      color: "black",
    },
    slices: {
      0: { color: "green" },
      1: { color: "red" },
    },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("qualityGraph")
  );
  chart.draw(data, options);
}
function CompletedvsRemaining() {
  if (completed != 0 && remaining != 0) {
    document.getElementById("orderGraph").classList.remove("hidden");
    document.getElementById("GraphAlt2").innerHTML = "No Data";
    document.getElementById("GraphAlt2").classList.add("hidden");
  } else {
    document.getElementById("orderGraph").classList.add("hidden");
    document.getElementById("GraphAlt2").innerHTML = "No Data";
    document.getElementById("GraphAlt2").classList.remove("hidden");
  }
  var data = google.visualization.arrayToDataTable([
    ["Type", "Amount"],
    ["Completed", completed],
    ["Remaining", remaining],
  ]);

  var options = {
    title: "Order Status",
    pieHole: 0.4,
    legend: "bottom",
    pieSliceTextStyle: {
      color: "black",
    },
    slices: {
      0: { color: "green" },
      1: { color: "red" },
    },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("orderGraph")
  );
  chart.draw(data, options);
}
