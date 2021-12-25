function provjeri() {
    let filled = true;
    if (!document.getElementById("nickname-textbox").value) filled = false;
    if (!filled) {
      alert('Fill in your nickname!');
    }
    return;
}

function leaderboardShow(){
    const x = document.getElementById("leaderboard-container");
    x.classList.add('show');
    return;
}

function leaderboardClose(){
    const x = document.getElementById("leaderboard-container");
    x.classList.remove('show');
    return;
}