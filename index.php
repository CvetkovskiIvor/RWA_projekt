<?php 
    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbName = "snakeDB";

    // Create connection
    $conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
    }

    // Create database
    $sql = "CREATE DATABASE IF NOT EXISTS snakeDB";
    if ($conn->query($sql) === TRUE) {
    } else {
          echo "Error creating database: " . $conn->error;
    }
    
    $conn = new mysqli($servername, $username, $password, $dbName);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "CREATE TABLE IF NOT EXISTS players (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nickname VARCHAR(30) NOT NULL,
        score INT(10) NOT NULL
    )";

    if ($conn->query($sql) === TRUE) {
    } else {
      echo "Error creating table: " . $conn->error;
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <title>Snake</title>
</head>

<body>
    <div id="leaderboard-container" class="leaderboard-container">
        <div class="leaderboard-modal">
            <div class="x-icon-container">
                <a onclick="leaderboardClose()"><img class="x-icon" src="imgs/x_icon.png" alt="x"></a>
            </div>
            <h1 class="leaderboard-h1">Leaderboard</h1>

            <div class="leaderboard-text">
                <?php 
                    // Create connection
                    $conn = new mysqli($servername, $username, $password, $dbName);
                    // Check connection
                    if ($conn->connect_error) {
                      die("Connection failed: " . $conn->connect_error);
                    }
                    $sql = "SELECT nickname, max(score) as highscore FROM players GROUP BY nickname";
                    $result = $conn->query($sql);
                    
                    if ($result->num_rows > 0) {
                      // output data of each row
                      while($row = $result->fetch_assoc()) {
                        echo "nickname: " . $row["nickname"]. " | ". "highscore: ". $row["highscore"]."<br>";
                      }
                    } else {
                      echo "0 results";
                    }
                    $conn->close();
                ?>
            </div>
        </div>
    </div>

    <div class="main-container">
        <div class="text-container">
            <div id="welcome" class="welcome">
                <h1>Welcome to snake!</h1>
                <p>Play snake, a game we all know and love.</p>
            </div>
            <div class="login">
                <form action="submit.php" method="POST">
                    <p>Enter your nickname: <input type="text" name="nickname" id="nickname-textbox"></p>
                    <input class="button" required type="submit" value="Play" id="submit-button" onclick="provjeri()">
                    <input class="button" type="button" value="Show leaderboards" id="leaderboard-button" onclick="leaderboardShow()">
                </form>
            </div>
        </div>
        <footer>
            <div class="footerText">
                <p>Authors: Ivor Cvetkovski, e-mail: icvetkovski@riteh.hr</p>
                <p>Entoni Korlević, e-mail: ekorlevic@riteh.hr</p>
            </div>
        </footer>
    </div>
</body>

</html>