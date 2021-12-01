var matchNumber = 0;
const maximumMatches = 51;
const minimumMatches = 7;
var lastRemovedNumber = 3;
var gameStatus = false;

function setMatchNumber(number){
    matchNumber = number;
}

function getMatchNumber(){
    return matchNumber;
}

function getLastRemovedNumber(){
    return lastRemovedNumber;
}

function setLastRemovedNumber(number){
    lastRemovedNumber = number;
}

function removeMatches(number){
    var matches=getMatchNumber()-number;
    setLastRemovedNumber(number);
    setMatchNumber(matches);
    displayActions(getMatchNumber() + ' bleiben übrig!');
    displayMatches(matches);
}

function kiMatchNumber(){
    if(gameOver()==false){
        matchNumber = getStartingNumber();      
        displayActions('Das Spiel startet mit '+ matchNumber + ' Streichhölzern!');
        displayMatches(matchNumber);
        setGameStatus();
    }
}

function kiSelection(){
    var matchNumber=getMatchNumber();//gucken

    if(getGameStatus() == true){
        if(matchNumber %4 == 0){
            displayActions('Die Ki nimmt 3 Streichhölzer');
            removeMatches(3);//Woher die Nummer?
        }
        if(matchNumber %4 == 1){
            removeMatches(4-getLastRemovedNumber());
        }
        if(matchNumber %4 > 1){
            removeMatches((matchNumber % 4));
        }
    }
    if(gameOver()==true){
        displayActions('Du hast verloren! Die Ki hat hat gewonnen!');
        hideHtml('select');
    }          
}

function setGameStatus(){
    if(gameStatus == false){
        gameStatus = true;
    }else{
        gameStatus = false;
    }        
}

function getGameStatus(){
    return gameStatus;
}

function gameOver(){
    if(getGameStatus()){
        if(getMatchNumber() == 0){
            setGameStatus();
            return true;
        }
    }
    return false;
}

function getRandomInteger(){
    return Math.floor(Math.random() * (maximumMatches - minimumMatches)) + minimumMatches;
}

function getStartingNumber(){
    var number = getRandomInteger();
    if((number%4)==0 ){
        return number;
    }else{        
        return getStartingNumber();
    }
}
