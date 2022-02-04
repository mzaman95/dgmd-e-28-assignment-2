const PLAYER_X = "Player X";
const PLAYER_O = "Player O";

window.onload = function () {
  let count = 0;
  let changeTurnsButton = document.getElementById("changeTurnsButton");
  let currentPlayerName = document.getElementById("currentPlayerName");

  changeTurnsButton.onclick = function () {
    if (count % 2 === 0) {
      currentPlayerName.innerHTML = PLAYER_O;
    } else {
      currentPlayerName.innerHTML = PLAYER_X;
    }
    count++;
  };
};
