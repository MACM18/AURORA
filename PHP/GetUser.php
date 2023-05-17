<?php
session_start();
require 'Conn.php';
$userName = $_POST['userName'];
$password = $_POST['password'];
$count = 0;
$response = [];
$query = "SELECT * FROM users WHERE UserName='$userName' AND Password='$password'";
$result = mysqli_query($con, $query);
while ($data = mysqli_fetch_array($result)) {
    $count += 1;
    $response['Type']=$data['Type'];
}
if ($count == 1) {
    $response['Authorize'] = true;
} else {
    $response['Authorize'] = false;
}
echo json_encode($response);
?>