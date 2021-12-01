function playerStarts(){
    displayActions('Der Spieler beginnt!');
    showHtml('select');
    kiMatchNumber();
    hideHtml('start');
    return true;
}

function kiStarts(){
    displayActions('Die KI beginnt!');
    displayActions('Wähle die Anzahl der Streichhölzer');
    showHtml('match-count');
    hideHtml('start');
    return true;
}

function startGame(){
    //Eingabe überprüfen!
    var matchCount = document.getElementById('matches');
    setMatchNumber(matchCount.value);
    displayActions('Das Spiel startet mit ' + matchCount.value + ' Streichhölzern!');
    displayMatches(matchCount.value);
    setGameStatus();
    kiSelection();
    showHtml('select');
    hideHtml('match-count');
}

function takeMatches(number){
    //check die Anzahl >=1 & <=3
    displayActions('Du hast '+ number + ' Streichhölzer genommen.');    
    removeMatches(number);
    kiSelection();
}