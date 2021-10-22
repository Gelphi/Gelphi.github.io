"use strict";

var actualPicture = 1;
var maxPictureCount = 24;

var loop;
var count=0;

//Load the actual image
function imageLoad(rotation){
    actualPicture += rotation;
    if(actualPicture > maxPictureCount){
        actualPicture = 1;
    }
    if(actualPicture < 1){
        actualPicture = maxPictureCount;
    }

    var img = document.getElementById('animation');
    img.setAttribute("src", "img/truck/"+actualPicture+".png");
}

window.onkeydown = function (evt){
    var key = evt.which ? evt.which : evt.keyCode;
    var char = String.fromCharCode(key);


    switch(char){
        case ('L'):
            imageLoad(1);
            break;
        case ('R'):
            imageLoad(-1);
            break;    
        case ('A'):
            if(count!=1){
               loop = window.setInterval(imageLoad, 150, 1); 
            }
            count=1;
            this.console.log(loop);
            break;
        case ('B'):
            if(count==1){
                window.clearInterval(loop);

            }
            count=0;
            break;
    }
}