// Constants:
const X = "X";
const O = "O";
const PLAYER_X_TURN_MSG = "It's Player X's turn.";
const PLAYER_O_TURN_MSG = "It's Player O's turn.";
const PLAYER_X_WIN_MSG = "Congratulations! Player X wins!";
const PLAYER_O_WIN_MSG = "Congratulations! Player O wins!";
const TIE_MSG = "It's a tie!";
const ROW = "row";
const COLUMN = "column";

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

  function checkForWinner() {
    /*
    If all the boxes are filled and no one has won yet, then there is a tie 
    The message is updated accordingly.
    */
    if (count === 8) {
      message.innerHTML = TIE_MSG;
    }

    // Checks if there is a streak in any of the grid rows:
    checkForStreak(ROW);

    // Checks if there is a streak in any of the grid columns:
    checkForStreak(COLUMN);

    // Checks if there is a streak in any of the diagonals:
    // There are two possible diagonals: \ and /
    let criss =
      parseInt(buttonArray[0].value) +
      parseInt(buttonArray[4].value) +
      parseInt(buttonArray[8].value);

    checkForWin(criss);

    let cross =
      parseInt(buttonArray[2].value) +
      parseInt(buttonArray[4].value) +
      parseInt(buttonArray[6].value);

    checkForWin(cross);
  }

  /*
    Checks for Streks within the Rows and Columns
    Goes through each row/column on the grid and adds up the values (gridLineCount) in that particular row/column.
    The total is then passed to checkForWin() function.  
    */
  function checkForStreak(series) {
    let querySelector = "";
    for (let i = 1; i <= 3; i++) {
      if (series == ROW) {
        querySelector = `[class^="row-${i}"]`;
      } else if (series == COLUMN) {
        querySelector = `[class*="column-${i}"]`;
      }
      let gridLine = document.querySelectorAll(querySelector);
      // Converts nodelist to array:
      let gridLineArray = Array.from(gridLine);
      let gridLineCount = 0;
      for (let i = 0; i < 3; i++) {
        gridLineCount += parseInt(gridLineArray[i].value);
        checkForWin(gridLineCount);
      }
    }
  }

  /*
    If the values adds up to 3, that means that all buttons in that line was an X (each X was valued at 1), so X wins. 
    If the values adds up to -3, that means that all buttons in that line was an O (each O was valued at -1), so O wins. 
    Any other sum of the values means there's a mix of Os and Xs so there are no winning lines. 
    If there is a winner, declare winner is called. 
    */
  function checkForWin(count) {
    if (count == 3) {
      declareWinner(X);
    } else if (count == -3) {
      declareWinner(O);
    }
  }

  //  This updates the message on the screen to announce the winner and then disableGrid is called.
  function declareWinner(winner) {
    if (winner == X) {
      message.innerHTML = PLAYER_X_WIN_MSG;
    } else if (winner == O) {
      message.innerHTML = PLAYER_O_WIN_MSG;
    }
    disableGrid();
  }

  // This function is called when a winner is declared so that players can not continue to select boxes.
  function disableGrid() {
    for (let i = 0; i < buttonArray.length; i++) {
      buttonArray[i].disabled = true;
    }
  }
};
