

const X_CLASS = "x";
const O_CLASS = "o";
const TIE_CLASS = "tie";
const PLAYABLE_CLASS = "playable";

const X_TURN_MESSAGE = "x's turn";
const O_TURN_MESSAGE = "o's turn";
const X_WIN_MESSAGE = "x wins. <a href=\"https://github.com/ronikbhaskar/ultimate_tic_tac_toe\">ronik bhaskar</a>, 2022.";
const O_WIN_MESSAGE = "o wins. <a href=\"https://github.com/ronikbhaskar/ultimate_tic_tac_toe\">ronik bhaskar</a>, 2022.";
const DRAW_MESSAGE = "it's a draw. <a href=\"https://github.com/ronikbhaskar/ultimate_tic_tac_toe\">ronik bhaskar</a>, 2022.";

// helper class to draw X properly
// for use in last element
const BIG_X_CLASS = "bigx"; 

const WIN_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

var sectionInPlay = -1;

var xTurn = true;
var playing = true;
const sections = document.querySelectorAll("[section]");
const board = document.getElementById("board");
const title = document.getElementById("title");

title.innerHTML = DRAW_MESSAGE;

sections.forEach(section => {
    section.classList.add(PLAYABLE_CLASS);
    section.addEventListener('click', handleClick);
});

function handleClick(e) {
    if (!playing) { // check if game is over
        return;
    }

    if (e.target.className !== "cell" // finished cell
    || !e.currentTarget.classList.contains(PLAYABLE_CLASS)) { // not playable
        return;
    }

    const section = e.currentTarget;
    const cell = e.target;

    currentClass = xTurn ? X_CLASS : O_CLASS;
    cell.classList.add(currentClass); // update the cell

    const win = isWin(currentClass, section);
    const draw = !win && isDraw(section); // short circuit

    if (win) { // win in section
        section.classList.add(currentClass);
        if (xTurn) { // purely cosmetic
            section.children[8].classList.add(BIG_X_CLASS);
        }
    } else if (draw) {
        section.classList.add(TIE_CLASS);
    }

    if (draw || win) {
        if (isWin(currentClass, board)) {
            return gameOver(currentClass, true);
        } else if (isDraw(board)) {
            return gameOver(currentClass, false);
        }
    }

    updateSectionInPlay(cell, section);

    xTurn = !xTurn; // switch player
    title.innerHTML = xTurn ? X_TURN_MESSAGE : O_TURN_MESSAGE;
}

function gameOver(currentClass, win) {
    playing = false;
    sections.forEach(section => { // seems ridiculous, but it's cosmetic
        section.classList.add(PLAYABLE_CLASS);
    }); 
    if (win) {
        title.innerHTML = currentClass === X_CLASS ? X_WIN_MESSAGE : O_WIN_MESSAGE;
    } else {
        title.innerHTML = DRAW_MESSAGE;
    }
}

function updateSectionInPlay(cell, section) {
    sections.forEach(section => {
        section.classList.remove(PLAYABLE_CLASS);
    });
    const squares = section.children;
    const numSquares = squares.length;
    let playedSquare;

    for (let i = 0; i < numSquares; ++i) {
        if (squares[i] === cell) {
            playedSquare = i;
            break;
        }
    }

    if (playable(sections[playedSquare])) {
        sectionInPlay = playedSquare;
        sections[playedSquare].classList.add(PLAYABLE_CLASS);
    } else {
        sections.forEach(section => {
            if (playable(section)) {
                section.classList.add(PLAYABLE_CLASS);
            }
        });
    }
}

function playable(section) {
    const classes = section.classList;
    return !(classes.contains(X_CLASS) 
          || classes.contains(O_CLASS) 
          || classes.contains(TIE_CLASS));
}

function isWin(currentClass, target) {
    const squares = target.children;
    // check every combination
    return WIN_COMBINATIONS.some(combination => {
        // check if all of the squares of the combinationo
        return combination.every(index => {
            // contain the class that was just played
            return squares[index].classList.contains(currentClass);
        });
    });
}

function isDraw(target) {
    const squares = target.children;
    return [...squares].every(square => {
        const classes = square.classList;
        return classes.contains(X_CLASS) 
            || classes.contains(O_CLASS)
            || classes.contains(TIE_CLASS);
    });
}