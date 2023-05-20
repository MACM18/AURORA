<?php
session_start();
require 'Conn.php';
$response = [];

if ($_GET['Type'] == "Part") {
    $date = mysqli_real_escape_string($con, $_POST['Date']);
    $userName = mysqli_real_escape_string($con, $_POST['userName']);
    $query = "SELECT checker.id,checker.User,checker.Date,checker.Good,checker.Bad,operator.User FROM checker INNER JOIN operator on operator.id=checker.operator WHERE checker.User='$userName' AND checker.Date='$date'";
} else if ($_GET['Type'] == "All") {
    $date = mysqli_real_escape_string($con, $_POST['Date']);
    $query = "SELECT * FROM checker WHERE Date='$date'";
} else if ($_GET['Type'] == "Order") {
    $orderId = $_POST['orderId'];
    $query = "SELECT checker.Good,orders.amount FROM checker INNER JOIN orders ON checker.orders=orders.id WHERE checker.orders='$orderId'";
}
$result = mysqli_query($con, $query);
while ($data = mysqli_fetch_array($result)) {
    $response[] = $data;
}
echo json_encode($response);
?>