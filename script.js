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

  let gameBoard = document.getElementById("gameBoard");
  let table = document.createElement("table");

  let idCount = 0;
  for (let i = 0; i < 3; i++) {
    var row = table.insertRow(i);
    for (let j = 0; j < 3; j++) {
      var col = row.insertCell(j);
      var button = document.createElement("button");
      button.innerHTML = "-";
      button.setAttribute("id", idCount);
      col.appendChild(button);
      idCount++;
    }
  }
  gameBoard.appendChild(table);
};

// Next steps: on click of button show x or o depending on turn and disable the button.
// Then, code for determining if there is a winner. Next, display winner or tie.
// Finally add console statements, comments, and styling. Update README.md pagee.
