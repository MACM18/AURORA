<?php
session_start();
require 'Conn.php';
if ($_GET['Type'] == "Update") {
    $status = $_POST['status'];
    $id = $_POST['id'];
    $query2 = "UPDATE operator SET Status='$status' WHERE id='$id'";
    if ($result2 = mysqli_query($con, $query2)) {
        $response["Status"] = "Success";
    } else {
        $response["Status"] = mysqli_error($con);
    }
} else if ($_GET['Type'] == "Insert") {
    $userName = $_POST['User'];
    $hour = $_POST['Hour'];
    $date = $_POST['Date'];
    $rate = $_POST['Rate'];
    $response = [];
    $query = "SELECT * FROM operator WHERE User='$userName' AND Date='$date' AND Hour='$hour'";
    $result = mysqli_query($con, $query);
    $data = mysqli_fetch_array($result);
    if ($data != null) {
        $query2 = "UPDATE operator SET Rate='$rate' WHERE User='$userName' AND Date='$date' AND Hour='$hour'";
    } else {
        $query2 = "INSERT INTO operator(User,Date,Rate,Hour,Status) VALUES('$userName','$date','$rate','$hour','Pending')";
    }
    if ($result2 = mysqli_query($con, $query2)) {
        $response["Status"] = "Success";
    } else {
        $response["Status"] = mysqli_error($con);
    }
}
echo json_encode($response);
?>