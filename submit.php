<?php
	session_start();
	if(empty($_POST['nickname'])){
		header('Location: /RWA_projekt/index.php');
	}
	else{
		header('Location: /RWA_projekt/game.php');
    	//echo var_dump($_POST);

		$servername = "localhost";
    	$username = "root";
    	$password = "password";
    	$dbName = "snakeDB";

    	$conn = new mysqli($servername, $username, $password, $dbName);
		
    	if ($conn->connect_error) {
	        die("Connection failed: " . $conn->connect_error);
	    }
	    //echo var_dump($_REQUEST);
		
    	$_SESSION["nickname"] = $conn->real_escape_string($_REQUEST['nickname']);
		$nickname = $_SESSION["nickname"];
		
    	$sql = "INSERT INTO players (nickname)
		VALUES ('$nickname')";

		if ($conn->query($sql) === TRUE) {
			echo "New record created successfully<br>";
  		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
	  	}
	}
    
?>