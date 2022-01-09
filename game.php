<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="game.css">

  <title>Snake game</title>
</head>

<body onload="main()">
  <div id="score">0</div>

  <canvas id="gameCanvas" class="gameCanvas" height="720" width="1024"></canvas>

  <div class="button-container">
  <form class="play-again-form" action="feedDB.php" method="POST"> 
    <input class="button" id="play-again-button" type="submit" value="Play again">
  </form>
  <form class="home-form" action="home.php" method="POST">
    <input class="button" id="home-button" type="submit" value="Home">  
  </form>
  </div>
</body>
<script type="text/javascript" src="game.js"></script>

</html>