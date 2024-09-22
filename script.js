let rowNum, colNum;

let player1, player2, boardArray;
let playerNum = 1;
let winner;

document.addEventListener('keydown', function(event) {
    if (event.key == 'Escape') {
        event.preventDefault();
    }
});

(function() { //ask user player 2 choice and start game
    let getPlayer2Choice;
    let player2ChoiceDialog = document.querySelector('.choose-player2');
    player2ChoiceDialog.showModal();
    let player2ChoiceForm = player2ChoiceDialog.querySelector('form');
    player2ChoiceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let selectionValues = document.querySelectorAll('input[name="player2-name"]');
        selectionValues.forEach((selectedValue) => {
            if(selectedValue.checked) {
                getPlayer2Choice = selectedValue.value;
            }
        });
        console.log(getPlayer2Choice);
        player2ChoiceDialog.close();
        [player1, player2, boardArray, boxContainer] = createGame(getPlayer2Choice);
        console.log(player1, player2, boardArray, boxContainer);
        console.log('game started');
        player1.givePlayerChance();
        addClickResponsePlayers();
    });
})();


function addClickResponsePlayers() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (box.dataset.filled == 'false') {
                if(playerNum == 1) {
                    displayAvatar(box, player1.avatar);
                    box.dataset.filled = 'true';
                    if (checkForWinner(player1.avatar)) {
                        console.log("you won");
                        fillAllBoxes();
                        return true; // Exit the function if there's a winner
                    } else {
                        if(checkForTie(player1.avatar)) {
                            return true;
                        };
                    }
                    player2.givePlayerChance();
                    player1.removePlayerChance();
                    playerNum = 2;
                    if (player2.name == 'Computer'){
                        displayComputerChoice(player2.avatar);
                        if (checkForWinner(player2.avatar)) {
                            console.log("computer won");
                            fillAllBoxes();
                            return true; // Exit the function if there's a winner
                        } else {
                            if(checkForTie(player2.avatar)) {
                                return true;
                            };
                        }
                        player1.givePlayerChance();
                        player2.removePlayerChance();
                        playerNum = 1;
                    }
                } else {
                    box.dataset.filled = 'true';
                    displayAvatar(box, player2.avatar);
                    if (checkForWinner(player2.avatar)) {
                        console.log("friend won");
                        fillAllBoxes();
                        return true; // Exit the function if there's a winner
                    } else {
                        if(checkForTie(player2.avatar)) {
                            return true;
                        };   
                    }
                    player1.givePlayerChance();
                    player2.removePlayerChance();
                    playerNum = 1;
                }
            }
        });
    });
}

function displayComputerChoice() {
    let compBoxes = document.querySelectorAll('.box');
    let boxFound = false;
    while (!boxFound) {
        let [rowNum, colNum] = player2.getPlayerChoice();
        compBoxes.forEach((compBox) => {
            if((compBox.dataset.rowNum == rowNum) && (compBox.dataset.columnNum == colNum) && (compBox.dataset.filled == 'false')) {
                displayAvatar(compBox, player2.avatar);
                compBox.dataset.filled = 'true';
                boxFound = true;
            }
        })
    }
}

function displayAvatar(box, avatar) {
    box.classList.add(avatar.toLowerCase());
    boardArray[box.dataset.rowNum][box.dataset.columnNum] = avatar;
    displayArray();
}


function checkForTie() {
    let numOfBoxesFilled = 0;
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        if(box.dataset.filled == "true") {
            numOfBoxesFilled++;
        }
    })
    
    if (numOfBoxesFilled == 9) {
        console.log("Its a tie");
        askToPlayAgain();
        player1.addScore();
        player2.addScore();
        return true;
    } else {
        return false;
    }
}

function checkForWinner(avatar) {
    let rowAvatarCount = 0, columnAvatarCount = 0;
    for (i = 0; i < 3; i++) { //check avatar count in each row
        for (j = 0; j < 3; j++) {
            if (boardArray[i][j] == avatar) {
                rowAvatarCount++;
            }
        }
        
        if (rowAvatarCount == 3) {
            let boxes = document.querySelectorAll(`.box[data-row-num="${i}"]`);
            boxes.forEach((box) => {
                box.style.backgroundColor = '#71cf71';
            })
            if(avatar == 'Sword') {
                player1.addScore();
            } else {
                player2.addScore();
            }
            askToPlayAgain();
            console.log('won by row');
            return true;
        }
        rowAvatarCount = 0;
    }
    
    for (j = 0; j < 3; j++) { //check avatar count in each column
        for (i = 0; i < 3; i++) {
            if (boardArray[i][j] == avatar) {
                columnAvatarCount++;
            }
        }
        
        if (columnAvatarCount == 3) {
            let boxes = document.querySelectorAll(`.box[data-column-num="${j}"]`);
            boxes.forEach((box) => {
                box.style.backgroundColor = '#71cf71';
            })
            if(avatar == 'Sword') {
                player1.addScore();
            } else {
                player2.addScore();
            }
            askToPlayAgain();
            console.log('won by column');
            return true;
        }
        columnAvatarCount = 0;
    }
    
    if ((boardArray[0][0]==avatar && boardArray[1][1]==avatar && boardArray[2][2]==avatar)) {
        let boxes = document.querySelectorAll('.box') 
        boxes.forEach((box) => {
            if (box.dataset.columnNum == box.dataset.rowNum) {
                box.style.backgroundColor = '#71cf71';
            }
        });
        if(avatar == 'Sword') {
            player1.addScore();
        } else {
            player2.addScore();
        }
        askToPlayAgain();
        console.log('won by diagonal');
        return true;
    } else if ((boardArray[0][2]==avatar && boardArray[1][1]==avatar && boardArray[2][0]==avatar)) {
        let box1 = document.querySelector('.box[data-row-num="0"][data-column-num="2"]');
        box1.style.backgroundColor = '#71cf71';
        let box2 = document.querySelector('.box[data-row-num="2"][data-column-num="0"]');
        box2.style.backgroundColor = '#71cf71';
        let box3 = document.querySelector('.box[data-row-num="1"][data-column-num="1"]');
        box3.style.backgroundColor = '#71cf71';
        if(avatar == 'Sword') {
            player1.addScore();
        } else {
            player2.addScore();
        }
        askToPlayAgain();
        console.log('won by diagonal');
        return true;
    }
    
    return false;
}

function fillAllBoxes() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.dataset.filled = 'true';
    })
}

function assignAvatar(rowNum, colNum, playerAvatar, box) {
    boardArray[rowNum][colNum] = playerAvatar;
    if (playerAvatar == 'Sword') {
        box.classList.add('sword');
    } else {
        box.classList.add('gun');
    }
    displayArray();
    return true;
}

function displayArray() {
    let row = '';
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            row += boardArray[i][j] + ' ';
        }
        console.log(row);
        row = '';
    }
}

function askToPlayAgain() {
    let board = document.querySelector('.board-section');
    let playAgain = document.createElement('button');
    playAgain.type = 'button';
    playAgain.textContent = 'Play Again';
    playAgain.classList.add('play-again');
    playAgain.addEventListener('click', () => {
        clearBoard();
        playAgain.remove();
    }) 
    board.prepend(playAgain);
    playerNum = 1;
}

function clearBoard() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.dataset.filled = 'false';
        box.className = 'box';
        box.style.removeProperty('background-color');
    })
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            boardArray[i][j] = 1;
        }
    }
}
function createGame(player2Choice) {
    let boardArray = create2DArray(3, 3, 1);
    
    let player1 = new Player('You', 'Sword', 0);
    let player1Box = document.createElement('div');
    player1Box.textContent = `${player1.name}(${player1.avatar}) score: ${player1.score}`;
    player1Box.classList.add('player-box');
    player1Box.classList.add(`player-${player1.name}`);
    player1.playerBox = player1Box;
    
    let player2;
    let player2Box = document.createElement('div');
    
    
    if (player2Choice == 'Friend') {
        player2 = new Player('Friend', 'Gun', 0);
        player2Box.textContent = `${player2.name}(${player2.avatar}) score: ${player2.score}`;
        player2Box.classList.add('player-box');
        player2Box.classList.add(`player-${player2.name}`);
        player2.playerBox = player2Box;
    } else {
        player2 = new Player('Computer', 'Gun', 0);
        player2Box.textContent = `${player2.name}(${player2.avatar}) score: ${player2.score}`;
        player2Box.classList.add('player-box');
        player2Box.classList.add(`player-${player2.name}`);
        player2.playerBox = player2Box;
        player2.getPlayerChoice = function() {
            let allowedNums = [0, 1, 2];
            function getRandomComputerChoice() {
                let num = allowedNums[Math.floor(Math.random() * allowedNums.length)];
                return num;
            }
            
            rowNum = getRandomComputerChoice();
            
            colNum = getRandomComputerChoice();
                        
            return [rowNum, colNum];
        }
    }
    function Player(name, avatar, score) {
        this.name = name;
        this.avatar = avatar;
        this.score = score;
        this.playerBox;
    }
    
    Player.prototype.givePlayerChance = function() {
        this.playerBox.classList.add('my-chance');
    }
    
    Player.prototype.removePlayerChance = function() {
        this.playerBox.classList.remove('my-chance');
    }

    Player.prototype.addScore = function() {
        this.score++;
        let playerScore = document.querySelector(`.player-${this.name}`);
        playerScore.textContent = `${this.name}(${this.avatar}) score: ${this.score}`;
    }
    function create2DArray(rows, cols, initialValue) {
        let arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < cols; j++) {
                arr[i][j] = initialValue;
            }
        }
        return arr;
    }
    
    (function createBoard() {
        let htmlBody = document.querySelector('body');
        let playerBoxSection = document.createElement('div');
        playerBoxSection.classList.add('player-box-section');
        let boardSection = document.createElement('div');
        boardSection.classList.add('board-section');
        boxContainer = document.createElement('div');
        boxContainer.classList.add('box-container');
        let mainContainer = document.createElement('div');
        mainContainer.classList.add('main-container');
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                box = document.createElement('div');
                box.classList.add('box');
                box.setAttribute('data-row-num', `${i}`);
                box.setAttribute('data-column-num', `${j}`);
                box.setAttribute('data-filled', 'false');
                boxContainer.appendChild(box);
            }
        }
        playerBoxSection.appendChild(player1Box);
        playerBoxSection.appendChild(player2Box);
        boardSection.appendChild(boxContainer);
        mainContainer.appendChild(playerBoxSection);
        mainContainer.appendChild(boardSection);
        htmlBody.appendChild(mainContainer);
    })();

    return [player1, player2, boardArray, boxContainer];

}