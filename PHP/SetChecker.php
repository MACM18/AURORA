<?php
session_start();
require 'Conn.php';
$userName = $_POST['User'];
$good = $_POST['Good'];
$bad = $_POST['Bad'];
$date = $_POST['Date'];
$operator = $_POST['Operator'];
$orders = $_POST['Orders'];
$response = [];
$query = "SELECT * FROM checker WHERE operator='$operator'";
$result = mysqli_query($con, $query);
$data = mysqli_fetch_array($result);
if ($data != null) {
    $query2 = "UPDATE checker SET User='$userName',Good='$good',Bad='$bad' WHERE operator='$operator' AND Date='$date'";
} else {
    $query2 = "INSERT INTO checker(User,Date,Good,Bad,operator,orders) VALUES('$userName','$date','$good','$bad','$operator','$orders')";
}
// $query2 = "INSERT INTO checker(User,Date,Good,Bad,operator,hour) VALUES('$userName','$date','$good','$bad','$operator',$hour)";
if ($result2 = mysqli_query($con, $query2)) {
    $response["Status"] = "Success";
} else {
    $response["Status"] = mysqli_error($con);
}

echo json_encode($response);
?>