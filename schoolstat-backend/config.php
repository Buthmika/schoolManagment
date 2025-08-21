<?php
$host = "localhost";
$user = "root";   // change if you set MySQL username
$pass = "";       // change if you set MySQL password
$db   = "schoolstat"; // your DB name

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
