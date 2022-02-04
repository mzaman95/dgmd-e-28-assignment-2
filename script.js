const X = "X";
const O = "O";
const PLAYER_X = "Player X";
const PLAYER_O = "Player O";
const PLAYER_X_WIN_MSG = "Player X wins!";
const PLAYER_O_WIN_MSG = "Player O wins!";
const TIE_MSG = "It's a tie!";

window.onload = function () {
  let count = 0;
  let currentPlayer = document.getElementById("currentPlayer");
  let winner = document.getElementById("winner");

  let gameBoard = document.getElementById("gameBoard");
  let table = document.createElement("table");

  let idCount = 0;
  for (let i = 0; i < 3; i++) {
    var row = table.insertRow(i);
    for (let j = 0; j < 3; j++) {
      var col = row.insertCell(j);
      var button = document.createElement("button");
      button.innerHTML = "-";
      button.setAttribute("class", "row-" + (i + 1) + " column-" + (j + 1));
      button.setAttribute("id", "btn-" + idCount);
      button.setAttribute("value", 0);
      col.appendChild(button);
      idCount++;
    }
  }
  gameBoard.appendChild(table);

  const buttonArray = document.querySelectorAll(`[id^="btn-"]`);
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener("click", function () {
      if (count % 2 === 0) {
        buttonArray[i].innerHTML = "X";
        buttonArray[i].setAttribute("value", 1);
        currentPlayer.innerHTML = PLAYER_O;
      } else {
        buttonArray[i].innerHTML = "O";
        buttonArray[i].setAttribute("value", -1);
        currentPlayer.innerHTML = PLAYER_X;
      }
      buttonArray[i].disabled = true;
      checkForWinner();
      count++;
    });
  }

  function checkForWinner() {
    if (count === 8) {
      winner.innerHTML = TIE_MSG;
    }

    // Check for rows:
    for (let i = 1; i <= 3; i++) {
      let row = document.querySelectorAll(`[class^="row-${i}"]`);
      // Converts nodelist to array:
      let rowArray = Array.from(row);
      let rowCount = 0;
      for (let i = 0; i < 3; i++) {
        rowCount += parseInt(rowArray[i].value);
        if (rowCount == 3) {
          winner.innerHTML = PLAYER_X_WIN_MSG;
        } else if (rowCount == -3) {
          winner.innerHTML = PLAYER_O_WIN_MSG;
        }
      }
    }

    // Check for columns:
    for (let i = 1; i <= 3; i++) {
      let column = document.querySelectorAll(`[class*="column-${i}"]`);
      // Converts nodelist to array:
      let columnArray = Array.from(column);
      let columnCount = 0;
      for (let i = 0; i < 3; i++) {
        columnCount += parseInt(columnArray[i].value);
        if (columnCount == 3) {
          winner.innerHTML = PLAYER_X_WIN_MSG;
        } else if (columnCount == -3) {
          winner.innerHTML = PLAYER_O_WIN_MSG;
        }
      }
    }

    // Check for diagonals:
    let criss =
      parseInt(buttonArray[0].value) +
      parseInt(buttonArray[4].value) +
      parseInt(buttonArray[8].value);

    let cross =
      parseInt(buttonArray[2].value) +
      parseInt(buttonArray[4].value) +
      parseInt(buttonArray[6].value);

    if (criss == 3 || cross == 3) {
      winner.innerHTML = PLAYER_X_WIN_MSG;
    } else if (criss == -3 || cross == -3) {
      winner.innerHTML = PLAYER_O_WIN_MSG;
    }
  }
};
