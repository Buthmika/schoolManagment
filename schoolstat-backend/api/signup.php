<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
include '../config.php';

// Get data from React
$data = json_decode(file_get_contents("php://input"), true);

$fullName = $data['fullName'];
$email = $data['email'];
$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// SQL query
$sql = "INSERT INTO users (full_name, email, username, password) 
        VALUES ('$fullName', '$email', '$username', '$password')";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success", "message" => "User registered successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
