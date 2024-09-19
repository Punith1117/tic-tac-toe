
let player1, player2, boardArray;

(function() {
    let getPlayer2Choice;
    let player2ChoiceDialog = document.querySelector('.choose-player2');
    console.log(player2ChoiceDialog);
    player2ChoiceDialog.showModal();
    let player2ChoiceForm = player2ChoiceDialog.querySelector('form');
    player2ChoiceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let selectionValues = document.querySelectorAll('input[name="player2-name"]');
        selectionValues.forEach((selectedValue) =>{
            if(selectedValue.checked) {
                getPlayer2Choice = selectedValue.value;
            }
        });
        console.log('value taken');
        console.log(getPlayer2Choice);
        player2ChoiceDialog.close();
        [player1, player2, boardArray] = createBoard(getPlayer2Choice);
        console.log(player1, player2, boardArray);
    });

})();

console.log('hello');
let rowNum, colNum;

let winner;
// for (let player = 1, i = 0; i < 9; i++) {
    //     if (player == 1) {
        //         do {
            //             [rowNum, colNum] = player1.getPlayerChoice();
            //         } while (assignAvatar(rowNum, colNum, player1.avatar) == false);
            
            //         if(checkForWinner('X') == true) {
                //             console.log('The Winner is ' + player1.name);
                //             break;
                //         }
                //     } else {
                    //         do {
                        //             [rowNum, colNum] = player2.getPlayerChoice();
                        //         } while (assignAvatar(rowNum, colNum, player2.avatar) == false);
                        
                        //         if(checkForWinner('O') == true) {
                            //             console.log('The Winner is ' + player2.name);
                            //             break;
                            //         }
                            //     }
                            
                            //     (player == 1) ? player = 2 : player = 1;
                            // }
                            
                            function checkForWinner(avatar) {
                                let rowAvatarCount = 0, columnAvatarCount = 0, diagonalAvatarCount = 0;
                                for (i = 0; i < 3; i++) { //check avatar count in each row
                                    for (j = 0; j < 3; j++) {
            if (boardArray[i][j] == avatar) {
                rowAvatarCount++;
            }
        }
        
        if (rowAvatarCount == 3) {
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
            console.log('won by column');
            return true;
        }
        columnAvatarCount = 0;
    }
    
    if ((boardArray[0][0]==avatar && boardArray[1][1]==avatar && boardArray[2][2]==avatar) || (boardArray[0][2]==avatar && boardArray[1][1]==avatar && boardArray[2][0]==avatar)) {
        console.log('won by diagonal');
        return true;
    }
    
    return false;
}

function assignAvatar(rowNum, colNum, playerAvatar) {
    if (boardArray[rowNum-1][colNum-1] == 1) {
        boardArray[rowNum-1][colNum-1] = playerAvatar;
        displayArray();
    } else {
        return false;
    }
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

function createBoard(player2Choice) {
    let boardArray = create2DArray(3, 3, 1);
    
    let player1 = new Player('you', 'X');
    
    let player2;
    
    if (player2Choice == 'friend') {
        player2 = new Player('your friend', 'O');
    } else {
        player2 = new Player('computer', 'O');
        player2.getPlayerChoice = function() {
            let allowedNums = [1, 2, 3];
            function getRandomComputerChoice() {
                let num = allowedNums[Math.floor(Math.random() * allowedNums.length)];
                return num;
            }
            
            rowNum = getRandomComputerChoice();
            
            console.log(rowNum);
            colNum = getRandomComputerChoice();
            console.log(colNum);
            
            return [rowNum, colNum];
        }
    }
    function Player(name, avatar, score) {
        this.name = name;
        this.avatar = avatar;
        this.score = score;
    }
    
    Player.prototype.getPlayerChoice = function() {
        let rowNum, colNum;
        do {
            rowNum = prompt(`${this.name} enter row num:`);
            rowNum = Number(rowNum);
        } while (rowNum > 3 || rowNum < 1 || isNaN(rowNum));
        
        do {
            colNum = prompt(`${this.name} enter column number:`);
            colNum = Number(colNum);
        } while (colNum > 3 || colNum < 1 || isNaN(colNum));
        
        return [rowNum, colNum];
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
    

    return [player1, player2, boardArray];

}