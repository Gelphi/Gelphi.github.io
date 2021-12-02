    var textfield;  

    function displayMatches(number){
        var matches='';
        for(var i = 0; i<number; i++){
            matches += '|'; 
        }
        displayActions(matches);
    }

    function displayActions(action){
        textfield = document.getElementById('output');
        textfield.value += action + '\n';
    }

    function showHtml(id){
        var div = document.getElementById(id);
        div.hidden=false;

    }
    function hideHtml(id){
        var div = document.getElementById(id);
        div.hidden=true;
    }
    function cleanActions(){
        textfield = document.getElementById('output');
        textfield.value = '';
    }
