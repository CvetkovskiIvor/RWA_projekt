<?php
    session_start();
    //echo var_dump($_SESSION);
    header('Location: /RWA_projekt/game.php');

    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbName = "snakeDB";
    
    $conn = new mysqli($servername, $username, $password, $dbName);
		
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
		
   	$score = $conn->real_escape_string($_COOKIE['score']);
    $nickname = $_SESSION["nickname"];
   	$sql = "UPDATE players SET score = $score where nickname = '$nickname' AND $score > score AND id = (select * from (select max(id) from players) as t)";

	if ($conn->query($sql) === TRUE) {
	} else {
    	echo "Error: " . $sql . "<br>" . $conn->error;
	}

?>