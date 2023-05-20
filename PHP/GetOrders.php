<?php
session_start();
require 'Conn.php';
$response = [];
// $id = mysqli_real_escape_string($con, $_POST['id']);
$query = "SELECT * FROM Orders";
$result = mysqli_query($con, $query);
while ($data = mysqli_fetch_array($result)) {
    $response[] = $data;
}
echo json_encode($response);
?>