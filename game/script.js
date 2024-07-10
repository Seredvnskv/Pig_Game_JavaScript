const new_game = document.querySelector('.btn--new');
const roll_dice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const score_1 = document.querySelector('#score--0');
const score_2 = document.querySelector('#score--1');
const player_1 = document.querySelector('.player--0');
const player_2 = document.querySelector('.player--1');

let current_player = player_1;
let currentScore_1 = player_1.querySelector('.current-score');
let currentScore_2 = player_2.querySelector('.current-score');

function start_game() {
    score_1.textContent = 0;
    score_2.textContent = 0;
    currentScore_1.textContent = 0;
    currentScore_2.textContent = 0;
    dice.classList.add('hidden');
} 
start_game();

function change_player() {
    current_player.classList.remove('player--active');
    current_player === player_1 ? current_player = player_2 : current_player = player_1;
    current_player.classList.add('player--active');
}

function add_currentScore(number) {
    let score = (current_player == player_1 ? Number(currentScore_1.textContent) : Number(currentScore_2.textContent));
    score += number;
    current_player == player_1 ? currentScore_1.textContent = score : currentScore_2.textContent = score;
}

function remove_invisibility() {
    if (dice.classList.contains('hidden')) {
        dice.classList.remove('hidden');
    }
}

function remove_winner() {
    if (player_1.classList.contains('player--winner')){
        player_1.classList.remove('player--winner');
    }
    else if (player_2.classList.contains('player--winner')) {
        player_2.classList.remove('player--winner');
    }
    hold.classList.remove('block');
    hold.disabled = false;
    roll_dice.classList.remove('block');
    roll_dice.disabled = false;
}

function rolled_one() {
    current_player == player_1 ? currentScore_1.textContent = 0 : currentScore_2.textContent = 0;
    change_player();
}

function win() {
    if (Number(score_1.textContent) >= 100) {
        player_1.classList.add('player--winner');
        return true;
    }
    else if (Number(score_2.textContent) >= 100) {
        player_2.classList.add('player--winner');
        return true;
    }
    else {
        return false;
    }
}

roll_dice.addEventListener('click', () => {
    let random_number = Math.floor(Math.random() * 6 + 1);
    remove_invisibility();

    switch(random_number) {
        case 1:
            dice.src = "dice-1.png"
            break;
        case 2:
            dice.src = "dice-2.png"
            break;
        case 3:
            dice.src = "dice-3.png"
            break;
        case 4:
            dice.src = "dice-4.png"
            break;
        case 5:
            dice.src = "dice-5.png"
            break;
        case 6:
            dice.src = "dice-6.png"
            break;
    }
    
    if (random_number != 1) {
        add_currentScore(random_number);
    }
    else {
        rolled_one();
    }
});

hold.addEventListener('click', () => { 
    remove_invisibility();
    
    if (current_player == player_1) {
        score_1.textContent = Number(score_1.textContent) + Number(currentScore_1.textContent);
        currentScore_1.textContent = 0;
    }
    else {
        score_2.textContent = Number(score_2.textContent) + Number(currentScore_2.textContent);
        currentScore_2.textContent = 0;
    }

    if (win()) {
        roll_dice.disabled = true;
        hold.disabled = true;
        roll_dice.classList.add('block');
        hold.classList.add('block');
    }
    else {
        change_player();
    }
});

new_game.addEventListener('click', () => {
    start_game();
    remove_winner();
    if (current_player !== player_1) {
        change_player();
    }
});

