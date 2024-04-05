//diside keys
function controller(event){
    //alert(event.key);


    if (event.key == "Enter"){

            if (runWorker == 0) {
                
                run();
                runSound.play();
                updateScore();
                moveBackground();
                bulletLocation.forEach(createBullet);
                
            }
    }

    if (event.key == " "){
        
        if (Jumper == 0) {
            if (runWorker != 0) {
                clearInterval(runWorker);
                runSound.pause();
                Jump();
                jumpSound.play();
                
            }
            
        }
    }

   
}

//runner
var runWorker = 0;
var runImager = 1;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run(){
   runWorker = setInterval(()=>{

    runImager = runImager + 1;
   
    if(runImager == 9){

        runImager = 1;
    }

     document.getElementById("boy").src = "run" + runImager + ".png";
   
},100);
}

//jumper
var Jumper = 0;
var jumpImager = 1;
var jumpMarginTop = 380;
var jumpSound = new Audio("jump.mp3")

function Jump() {
    Jumper = setInterval(()=>{
        
        jumpImager = jumpImager + 1;

        if (jumpImager < 7) {

            jumpMarginTop = jumpMarginTop - 80;

            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";

        }

        if (jumpImager > 6) {

            jumpMarginTop = jumpMarginTop + 80;

            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }

        if (jumpImager == 11) {
            
            jumpImager = 1;
            clearInterval(Jumper);
            Jumper = 0;
            run();
            runSound.play();
            
        }

        document.getElementById("boy").src = "jump" + jumpImager + ".png";
    },100)
}


//score 
var scoreWorker = 0;
var score = 0;


function updateScore() {
   
    scoreWorker = setInterval(()=> {

            if (score == 500) {
                alert("You Won");
                window.location.reload();
            }

        score = score + 10;

        document.getElementById("score").innerHTML = score;

    },500)
    
}

//background

var backgroundWorker = 0;
var backgroundPosition = 0;

function moveBackground() {

    backgroundWorker = setInterval(()=> {

    backgroundPosition = backgroundPosition - 30;

    document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";

    },50)
    
}

//creat bullet
var bulletLocation = [400,1000,1900,2600,3200,4000,4600,5500,6800,7900]; //arry
var bulletWorker = 0;
var deadSound = new Audio("dead.mp3");

function createBullet(x) {

    var i = document.createElement("img");
        i.src ="Bullet.png";
        i.className = "bullet";
        i.style.marginLeft = x  +"px";

        document.getElementById("background").appendChild(i);

        bulletWorker = setInterval(()=> {

             if (bulletWorker != 0) {
                x = x - 10;
                i.style.marginLeft = x +"px";
            }

            if (x == 100) {
                
                if (Jumper == 0) {
                    
                    clearInterval(runWorker);
                    runSound.pause();

                    clearInterval(backgroundWorker);

                    clearInterval(scoreWorker);

                    clearInterval(bulletWorker);

                    deadEnd();
                    deadSound.play();
                }
            }
        },50)
}

//dead

var deadWorker = 0;
var deadImager = 1;
var deadSound = new Audio("dead.mp3")

function deadEnd() {
    
    deadWorker = setInterval(()=> {

        deadImager = deadImager + 1;

        if (deadImager == 11) {
            deadImager = 1;
            clearInterval(deadWorker);
            alert("Game Over ! Press Ok button to restart game")

            window.location.reload();
        }

        document.getElementById("boy").src = "Dead" + deadImager + ".png";
    },150)

}
    
