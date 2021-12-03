function playerStarts(){
    cleanActions();
    displayActions('Der Spieler beginnt!');
    showHtml('select');
    kiMatchNumber();
    hideHtml('start');
    return true;
}

function kiStarts(){
    cleanActions();
    displayActions('Die KI beginnt!');
    displayActions('Wähle die Anzahl der Streichhölzer');
    showHtml('match-count');
    hideHtml('start');
    return true;
}

function startGame(){
    let matchCount = document.getElementById('matches');
    if(isBetween(matchCount.value)){
        setMatchNumber(matchCount.value);
        displayActions('Das Spiel startet mit ' + matchCount.value + ' Streichhölzern!');
        displayMatches(matchCount.value);
        setGameStatus();
        kiSelection();
        showHtml('select');
        hideHtml('match-count');
    }else{
        alert('Geben Sie eine andere Zahl zwischen 7 und 50 ein!');
    }
}

function takeMatches(number){
    displayActions('Du hast '+ number + ' Streichhölzer genommen.');    
    removeMatches(number);
    kiSelection();
}
