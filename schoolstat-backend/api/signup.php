<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

include '../config.php';

// Read JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
  echo json_encode(["status"=>"error","message"=>"No JSON received"]);
  exit;
}

$fullName = $data['fullName'] ?? '';
$email = $data['email'] ?? '';
$username = $data['username'] ?? '';
$passwordPlain = $data['password'] ?? '';

if ($fullName === '' || $email === '' || $username === '' || $passwordPlain === '') {
  echo json_encode(["status"=>"error","message"=>"Missing fields"]);
  exit;
}

$password = password_hash($passwordPlain, PASSWORD_DEFAULT);

// (Simple version) Insert user
$sql = "INSERT INTO users (full_name, email, username, password) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $fullName, $email, $username, $password);

if ($stmt->execute()) {
  echo json_encode(["status"=>"success","message"=>"User registered successfully"]);
} else {
  // Handle duplicate email/username nicely
  if ($conn->errno === 1062) {
    echo json_encode(["status"=>"error","message"=>"Email or username already exists"]);
  } else {
    echo json_encode(["status"=>"error","message"=>$conn->error]);
  }
}
