$(document).ready(function () {

    console.log('Hello');
    
    boardArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]

    winCondition = [];
    
    playerX = [];
    playerO = [];

    scoreX = 0;
    scoreO = 0;
    
    // true is X, false is O

    turn = true;
    round = 0;
    state = 0;

    const board = $('.game-area');

    var blockHTML = (key) => `<div id="${key}" class="block"></div>`;
    
    function createWinCondition(size) {
        
        win_V = [];
        win_H = [];
        Diag = [];

        for (let i = 0; i < size; i++){
            win_V.push(i)
            win_H.push(i * 3);
        }

        V_Condition = win_V.map(x => {
            arr = [];
            win_H.forEach(t => {
                arr.push(x+t)
            });
            return arr;
        })

        H_Condition = win_H.map(x => {
            arr = [];
            win_V.forEach(t => {
                arr.push(x+t)
            });
            return arr;
        })
        
        d1 = [];
        d2 = [];

        for (let i = 0; i < size; i++){
            d1.push(H_Condition[i][i])
            d2.push(H_Condition[i][(size-1) - i])

        }        
        
        // console.log(V_Condition)
        // console.log(H_Condition)
        // console.log(d1)
        // console.log(d2)

        winCondition = [].concat(H_Condition).concat(V_Condition).concat([d1]).concat([d2])
    
    }

    function boardCreator(size) {

        boardArray = [];
        board.html('');
        state = 0;
        round = size;

        for (let i = 0; i < size; i++){
            a = new Array();
            for (let j = 0; j < size; j++){
                a.push(0);
                board.append(blockHTML(`${i}-${j}`));
            }
            boardArray.push(a);
        }

        createWinCondition(size)

        if (size <= 6) { fontSize = '3rem'; }
        else if (size <= 9) { fontSize = '2rem'; }
        else { fontSize = '1rem'; }

        $('.block').css('font-size', fontSize);
        board.css('--grid-size', size);

    }

    function playerSetting() {

        playerX = [];
        playerO = [];
        turn = (Math.random() * 9 > (10 / 2));

        $('.turn').html(turn ? 'Player X' : 'Player O');
    }

    function swapTurn() {
        turn = !turn;
        $('.turn').html(turn ? 'Player X' : 'Player O');
    }

    function checkWinner(player) {
        // testing case
        // boardArray = [
        //     ['x', 'o', 'o'],
        //     ['o', 'x', 'o'],
        //     ['o', 'o', 'x'],
        // ]

        boardCheck = [];
        
        for (let i = 0; i < boardArray.length; i++){
            boardCheck = boardCheck.concat(boardArray[i]);
        }

        return winner = winCondition.some(x => {
            // console.log(x)
            // console.log(boardCheck[x[0]])
            // console.log(boardCheck[x[1]])
            // console.log(boardCheck[x[2]])

            checkWin = true;
            for (let i = 0; i < round; i++){
                // console.log(boardCheck[x[i]])
                checkWin = checkWin && boardCheck[x[i]] === player
            }

            return checkWin;

        })

        

        // console.log(winner)


        

    }

    function handlePlayerClick(e) {

        if ($(this).hasClass('added')) {
            return;
        }
        $(this).html(turn ? 'X' : 'O');
        $(this).addClass('added');
        state++;

        id = $(this).attr('id').split("-");
        boardArray[id[0]][id[1]] = turn;

        winner = checkWinner(turn);
        if (winner) {
            console.log(turn ? 'X is Winner' : 'O is Winner')
            $('.turn').html(turn ? 'X is Winner' : 'O is Winner');
            gameOver();
            return;
        }

        swapTurn();

        if (state == round*round) {
            console.log('drew!');
            $('.turn').html('Drew!');
            return;
        }

    }

    function gameStart(size) {
        boardCreator(size);
        playerSetting();
        $('.block').on('click', handlePlayerClick)
    }

    function gameOver() {
        $('.block').unbind();
    }

    
    $('form#sizeSetting').on('submit', function (e) {
        
        size = $(this).serializeArray()[0].value
        gameStart(size);
        e.preventDefault();

    });

    gameStart(3);

});