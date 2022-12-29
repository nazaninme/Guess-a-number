const difficultySection=document.querySelector("#select-difficulty ");
const difficultySectionButtons=document.querySelector("#select-difficulty ul");
const gameSection=document.querySelector("#game");
const numInput=gameSection.children.numInput;
const feedbackElement=gameSection.children.feedback;
const resultBux=document.querySelector("#result");
const resultIcon=document.querySelector("#resultIcon");
const resultText=document.querySelector("#resultText");
const heartsElement=document.querySelector("#hearts");
const timerElement=document.querySelector("#timer");
// const winIcons=[""];
// const looseIcons=[""];
console.dir(result)

const GameOptions={
    difficulty:null,
    hearts:5,
    randNumber:null,
    timer:null,
    interval:null,
   

};


function gameOver(isWinner){
    clearInterval(GameOptions.interval);
    if (isWinner){
        // resultIcon.innerHtml=winIcons[Math.floor(Math.random()*winIcons.length)];
        resultText.innerHTML=`Congratuations...The Number is (${GameOptions.randNumber})`;
    }else{
        // resultIcon.innerHtml=looseIcons[Math.floor(Math.random()*looseIcons.length)];
        resultText.innerHTML=`You Loose...The Number was (${GameOptions.randNumber})`;
    }

    resultBux.classList.remove("hidden");
    resultBux.classList.add("popup");

    setTimeout(()=>{
        resultBux.classList.remove("popup")
    },2000)

GameOptions.difficulty=null;
GameOptions.hearts=5;
GameOptions.randNumber=null;

updateSections();
}

difficultySectionButtons.addEventListener('click',e=>{
    if(e.target.localName==='li'){
       GameOptions.difficulty=e.target.id;
    }
    setRandNumber();
    updateSections();
    startTheGame();
})

function setRandNumber(){
    switch(GameOptions.difficulty){
        case "easy": return (GameOptions.randNumber=Math.floor(Math.random()*20)+1);
        case "normal": return (GameOptions.randNumber=Math.floor(Math.random()*30)+1);
        case "hard": return (GameOptions.randNumber=Math.floor(Math.random()*50)+1);

    }
}

function updateSections(){
    if(GameOptions.difficulty){
difficultySection.className='hidden';
gameSection.classList.remove("hidden");
    }else{
        difficultySection.classList.remove("hidden");
        gameSection.className="hidden";
    }
    feedbackElement.innerHTML="";
}


function showDifficulty(){
    const titleElement=gameSection.children.title;
    switch(GameOptions.difficulty){
        case "easy":return (titleElement.innerText="Guess a number between 1 to 20");
        case "normal": return (titleElement.innerText="Guess a number between 1 to 30");
        case "hard": return (titleElement.innerText="Guess a number between 1 to 50");

    }
}


function startTimer(){
    switch(GameOptions.difficulty){
        case "easy":GameOptions.timer=30;break;
        case "normal":GameOptions.timer=20;break;
        case "hard":GameOptions.timer=15;break;
    }
    timerElement.innerHTML=GameOptions.timer;
  
   GameOptions.interval= setInterval(()=>{
        
    --GameOptions.timer;
    timerElement.innerHTML=GameOptions.timer;
    if(GameOptions.timer===0){
        gameOver(false);

    }
    if(GameOptions.timer<=7){
        timerElement.style.color="yellow";
    }
    if(GameOptions.timer<=3){
        timerElement.style.color="red";
        timerElement.style.fontSize="25px"
    }
    },1000);
}


numInput.addEventListener("change",e=>{
  const guess=+e.target.value;
  console.log(GameOptions);
  if(guess===GameOptions.randNumber){
    gameOver(true);
  }else{
    if(guess>GameOptions.randNumber){
feedbackElement.innerText="No! less than this ...";
    }else {
        feedbackElement.innerText="No! More than this ..."
    }
  }
  
  if(--GameOptions.hearts===0){
    gameOver(false);
  }
  heartsElement.innerHTML="*".repeat(GameOptions.hearts);
  e.target.value="";
})

function startTheGame(){
showDifficulty();
startTimer();
numInput.focus();
heartsElement.innerHTML="*".repeat(5);
}
