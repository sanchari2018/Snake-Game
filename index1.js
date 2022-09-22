let inputDir= {x:0,y:0};

const foodSound=new Audio("../food.mp3");
const gameOver= new Audio("../gameover.mp3");
const moveSound=new Audio("../move.mp3");
const music= new Audio("../music.mp3");
let speed=6;
let score=0;
let lastPaintTime=0; //the last time when the screen was painted
let snakeArr= [
    {x:13, y:15} //snake head location when it will be displayed
];

let food= {x:5, y:7};

function main(ctime) //ctime=current_time
{
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

//console.log(snakeArr[0].x)  --column no where the snake head is currently in
//console.log(snakeArr[0].y)  --row no where the snake head is currently in

//console.log(inputDir.x)
//console.log(inputDir.y)

function gameEngine()
{
    //part 1--updating the snake array and food

    function isCollide(snakeArr)
    {
        for (let i = 1; i < snakeArr.length; i++) {
            if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
                return true;
            }
        }
        // If you bump into the wall
        if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
            return true;
        }
            
        return false;
    }

    if(isCollide(snakeArr))
    {
        gameOver.play();
        music.pause();
        alert("Game Over! Please press any key to start again!");
        inputDir={x:0, y:0};
        music.play();
        score=0;
        snakeArr=[{x:13, y:15}];
    }


    //if u have eaten the food, increment the score, regenerate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
        //console.log(food.x)
        //console.log(food.y)
    }

    //for moving the snake

    for (let i = snakeArr.length - 2; i>=0; i--) {  //movement of snake body
        snakeArr[i+1] = {...snakeArr[i]};
    }
    
    //music.play();
    snakeArr[0].x += inputDir.x; //movement of the head
    snakeArr[0].y += inputDir.y;
     
    //console.log(snakeArr[0].x)
    //console.log(snakeArr[0].y)


    //part 2--displaying the snake
    board.innerHTML=""; //The innerHTML property is part of the Document Object Model (DOM) that allows Javascript code to manipulate a website being displayed.
    //The innerHTML property sets or returns the HTML content (inner HTML) of an element.
    //to clear the board
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0)
        {
            snakeElement.classList.add('head'); 
        }
        else{
            snakeElement.classList.add('snake'); 
        }
        board.appendChild(snakeElement);

    });

    //part 3--displaying the food

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food'); 
    board.appendChild(foodElement);
    //console.log("I am titir")
}

//main logic starts here
alert("Please press any key to start the game! All the best!")
music.play();
window.requestAnimationFrame(main);
//The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
//repaint runs on a game loop which rerenders graphic image
//gives high fps
window.addEventListener('keydown',e=>      //on pressing any key, 'e' function wil be invoked
{
    inputDir = {x:0, y:-1}; //game will start, snake will go one down
    moveSound.play();
    switch (e.key) {
        case ("ArrowUp"):
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            //console.log(inputDir.x)
            //console.log(inputDir.y)
            break;

        case ("ArrowDown"):
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            //console.log(inputDir.x)
            //console.log(inputDir.y)
            break;

        case ("ArrowLeft"):
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            //console.log(inputDir.x)
            //console.log(inputDir.y)
            break;

        case ("ArrowRight"):
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            //console.log(inputDir.x)
            //console.log(inputDir.y)
            break;

        default:
            break;
    }
})