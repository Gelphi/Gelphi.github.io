let matchNumber = 0;
const maximumMatches = 51;
const minimumMatches = 7;
let lastRemovedNumber = 3;
let gameStatus = false;


function kiSelection() {
    if (getGameStatus() == true) {
        if (getRest() == 0) {
            displayActions('Die Ki nimmt 3 Streichhölzer!');
            removeMatches(3);
        }
        else if (getRest() == 1) {
            let removingMatches = 4 - getLastRemovedNumber();
            displayActions('Die Ki nimmt ' + removingMatches + ' Streichhölzer!');
            removeMatches(removingMatches);
        }
        else if (getRest() > 1) {
            displayActions('Die Ki nimmt ' + getRest() + ' Streichhölzer!');
            removeMatches((getRest()));
        }
    }
    if (gameOver() == true) {
        displayActions('Du hast verloren! Die Ki hat hat gewonnen!');
        displayActions('Um das Spiel neu zu beginnen, lade die Seite erneut.')
        hideHtml('select');
    }
}

function removeMatches(number) {
    let matches = getMatchNumber() - number;
    setLastRemovedNumber(number);
    setMatchNumber(matches);
    displayActions(getMatchNumber() + ' bleiben übrig!');
    displayMatches(matches);
}

function kiMatchNumber() {
    if (gameOver() == false) {
        matchNumber = getStartingNumber();
        displayActions('Das Spiel startet mit ' + matchNumber + ' Streichhölzern!');
        displayMatches(matchNumber);
        setGameStatus();
    }
}

function gameOver() {
    if (getGameStatus()) {
        if (getMatchNumber() == 0) {
            setGameStatus();
            return true;
        }
    }
    return false;
}

function isBetween(number){
    if(number>=minimumMatches){
        if(number<maximumMatches){
                    return true;
        }
    }
    return false;    
}

function setMatchNumber(number) {
    matchNumber = number;
}

function setGameStatus() {
    if (gameStatus == false) {
        gameStatus = true;
    } else {
        gameStatus = false;
    }
}

function setLastRemovedNumber(number) {
    lastRemovedNumber = number;
}

function getRandomInteger() {
    return Math.floor(Math.random() * (maximumMatches - minimumMatches)) + minimumMatches;
}

function getStartingNumber() {
    let number = getRandomInteger();
    if ((number % 4) == 0) {
        return number;
    } else {
        return getStartingNumber();
    }
}

function getGameStatus() {
    return gameStatus;
}

function getRest(){
    return getMatchNumber() % 4;
}

function getMatchNumber() {
    return matchNumber;
}

function getLastRemovedNumber() {
    return lastRemovedNumber;
}