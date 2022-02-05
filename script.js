// Constants:
const X = "X";
const O = "O";
const PLAYER_X_TURN_MSG = "It's Player X's turn.";
const PLAYER_O_TURN_MSG = "It's Player O's turn.";
const PLAYER_X_WIN_MSG = "Congratulations! Player X wins!";
const PLAYER_O_WIN_MSG = "Congratulations! Player O wins!";
const TIE_MSG = "It's a tie!";

window.onload = function () {
  let count = 0; // number of turns
  let message = document.getElementById("message"); // where the messages will be displayed to the user
  message.innerHTML = PLAYER_X_TURN_MSG; // Player X goes first

  let gameBoard = document.getElementById("gameBoard");
  let table = document.createElement("table");

  /* 
  Creates the tic tac toe grid, using a JS loop 
  Leverages html table to create the grid-like structure
  Creates 3 rows, 3 columns
  In each cell, creates a button with unique id 
  Each button has classes which specify which row and column it is located
  All the buttons start with an initial value of 0
  */
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

  /*
  Event listener is added to all the buttons
  If its on an even turn count, then Player X has played their turn
  If its on an odd turn count, then Player O has played their turn
  When a button is clicked, the button is marked with X or O based on the player whose turn it is
  If the button text is X, then a value of 1 is set and the button is disabled so it can't be selected again during the game
  If the button text is O, then a value of -1 is set and the button is disabled so it can't be selected again during the game
  It is checked if there is a winner based on the recent click 
   */
  const buttonArray = document.querySelectorAll(`[id^="btn-"]`);
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener("click", function () {
      if (count % 2 === 0) {
        buttonArray[i].innerHTML = "X";
        buttonArray[i].setAttribute("value", 1);
        message.innerHTML = PLAYER_O_TURN_MSG;
      } else {
        buttonArray[i].innerHTML = "O";
        buttonArray[i].setAttribute("value", -1);
        message.innerHTML = PLAYER_X_TURN_MSG;
      }
      buttonArray[i].disabled = true;
      checkForWinner();
      count++;
    });
  }

  /*
  This function is called when a winner is declared so that players can not continue to select boxes
  */
  function disableGrid() {
    for (let i = 0; i < buttonArray.length; i++) {
      buttonArray[i].disabled = true;
    }
  }

  function checkForWinner() {
    /*
    If all the boxes are filled and no one has won yet, then there is a tie 
    The message is updated accordingly.
    */
    if (count === 8) {
      message.innerHTML = TIE_MSG;
    }

    /*
    Rows
    Goes through each row on the grid and adds up the values. 
    If the values adds up to 3, that means that all buttons in that row was an X (each X was valued at 1), so X wins. 
    If the values adds up to -3, that means that all buttons in that row was an O (each O was valued at -1), so O wins. 
    Any other sum of the values means there's a mix of Os and Xs so there are no winning rows. 
    If there is a winner, the message is updated and the rest of the grid buttons are disabled.
    */
    for (let i = 1; i <= 3; i++) {
      let row = document.querySelectorAll(`[class^="row-${i}"]`);
      // Converts nodelist to array:
      let rowArray = Array.from(row);
      let rowCount = 0;
      for (let i = 0; i < 3; i++) {
        rowCount += parseInt(rowArray[i].value);
        if (rowCount == 3) {
          message.innerHTML = PLAYER_X_WIN_MSG;
          disableGrid();
        } else if (rowCount == -3) {
          message.innerHTML = PLAYER_O_WIN_MSG;
          disableGrid();
        }
      }
    }

    /*
    Columns
    Goes through each column on the grid and adds up the values. 
    If the values adds up to 3, that means that all buttons in that column was an X (each X was valued at 1), so X wins. 
    If the values adds up to -3, that means that all buttons in that column was an O (each O was valued at -1), so O wins. 
    Any other sum of the values means there's a mix of Os and Xs so there are no winning columns. 
    If there is a winner, the message is updated and the rest of the grid buttons are disabled.
    */
    for (let i = 1; i <= 3; i++) {
      let column = document.querySelectorAll(`[class*="column-${i}"]`);
      // Converts nodelist to array:
      let columnArray = Array.from(column);
      let columnCount = 0;
      for (let i = 0; i < 3; i++) {
        columnCount += parseInt(columnArray[i].value);
        if (columnCount == 3) {
          message.innerHTML = PLAYER_X_WIN_MSG;
          disableGrid();
        } else if (columnCount == -3) {
          message.innerHTML = PLAYER_O_WIN_MSG;
          disableGrid();
        }
      }
    }

    /*
    Diagonals
    There are two possible diagonals: \ and / 
    If the values adds up to 3, that means that all buttons in that diagonal was an X (each X was valued at 1), so X wins. 
    If the values adds up to -3, that means that all buttons in that diagonal was an O (each O was valued at -1), so O wins. 
    Any other sum of the values means there's a mix of Os and Xs so there are no winning diagonals. 
    If there is a winner, the message is updated and the rest of the grid buttons are disabled.
    */
    let criss =
      parseInt(buttonArray[0].value) +
      parseInt(buttonArray[4].value) +
      parseInt(buttonArray[8].value);

    let cross =
      parseInt(buttonArray[2].value) +
      parseInt(buttonArray[4].value) +
      parseInt(buttonArray[6].value);

    if (criss == 3 || cross == 3) {
      message.innerHTML = PLAYER_X_WIN_MSG;
      disableGrid();
    } else if (criss == -3 || cross == -3) {
      message.innerHTML = PLAYER_O_WIN_MSG;
      disableGrid();
    }
  }
};
