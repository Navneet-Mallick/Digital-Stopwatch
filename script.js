const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false; // Fixed initial value

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0"); // Fixed to String

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}


let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".resetbtn");
let newGamebtn=document.querySelector("#newGameBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;
const winPatterns=[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]];

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        console.log("Box was Clicked");
        if(turnO){        //Player O's turn
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear text for new game
        box.disabled = false;
    });
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations , Winner is  ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
   for(let pattern of winPatterns){   
   let pos1Val=boxes[pattern[0]].innerText;
   let pos2Val=boxes[pattern[1]].innerText;
   let pos3Val=boxes[pattern[2]].innerText;

   if(pos1Val!="" && pos2Val!=="" && pos3Val!="")
   {
    if(pos1Val===pos2Val && pos2Val===pos3Val){
        console.log("winner",pos1Val);
       showWinner(pos1Val);   
    }
   }
}
};

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}


newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame)