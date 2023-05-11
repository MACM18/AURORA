<?php
session_start();
require 'Conn.php';
$userName = $_POST['userName'];
$date = $_POST['Date'];
$response = [];
$query = "SELECT * FROM checker WHERE User='$userName' AND Date='$date'";
$result = mysqli_query($con, $query);
while ($data = mysqli_fetch_array($result)) {
    $response[] = $data;
}
echo json_encode($response);
?>