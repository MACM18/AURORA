<?php
session_start();
require 'Conn.php';
$date = $_POST['Date'];
$response = [];
$query = "SELECT * FROM Orders WHERE Date='$date'";
$result = mysqli_query($con, $query);
while ($data = mysqli_fetch_array($result)) {
    $response[] = $data;
}
echo json_encode($response);
?>