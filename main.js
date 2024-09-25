let gamesequence = []
let usersequence = []
let highscore=[]
let btns=["yellow","red","purple","green"]

let start = false
let level = 0

let chng = document.querySelector("input")
let h2 = document.querySelector("h2")
let strt = document.getElementById("start")
strt.addEventListener("click",()=>{
    if(start==false){
        start = true
        console.log("Started")

        levelup()
    }
})

function btnflash(btn){
    btn.classList.add("flash")

    setTimeout(function(){
        btn.classList.remove("flash")
    },250)
}

function userclick(btn){
    btn.classList.add("userclick")

    setInterval(()=>{
        btn.classList.remove("userclick")
    },250)
}

function levelup(){
    usersequence=[]
    level += 1
    h2.textContent = `Level ${level}`

    let randomidx = Math.floor(Math.random()*3)
    let randomcolor = btns[randomidx]
    let randombutton = document.querySelector(`.${randomcolor}`)
    gamesequence.push(randomcolor)
    console.log(gamesequence)
    btnflash(randombutton)
}

function check(idx){
    // console.log("current level: ",level)

    if(usersequence[idx]==gamesequence[idx]){
        if(usersequence.length==gamesequence.length){
            setTimeout(levelup,1000)
        }
    }else{
        h2.innerHTML = `Game Over!, Your score was <b>${level}</b> <br>Press any key to start`
        highscore.push(level)
        let body=document.querySelector("body")
        body.style.backgroundColor = "red"
        // currenthigh()
        setTimeout(function(){
            if(chng.checked){
                body.style.background = "black"
            }
            else{
                body.style.background = "white"
            }
            
        },150)

        reset()
        currenthigh(highscore)
    }

}

function btnpress(){
    let btn = this
    userclick(btn)

    usercolor = btn.getAttribute("id")
    usersequence.push(usercolor)
    check(usersequence.length-1)
}

let btnall=document.querySelectorAll(".btn")

for(btn of btnall){
    btn.addEventListener("click",btnpress)
}

function reset(){
    start=false
    gamesequence=[]
    usersequence=[]
    level=0
}
let body=document.querySelector("body")
let h1 = document.querySelector("h1")
let h3 = document.querySelector("h3")
let p = document.querySelector("p")
chng.addEventListener("click",()=>{
    if(chng.checked){
        body.style.backgroundColor = "black"
        h1.style.color = "white"
        h2.style.color = "white"
        h3.style.color="white"
        p.style.color="white"
        document.getElementById("red").style.borderColor = "white"
        document.getElementById("yellow").style.borderColor = "white"
        document.getElementById("green").style.borderColor = "white"
        document.getElementById("purple").style.borderColor = "white"
    }else{
        body.style.backgroundColor = "white"
        h1.style.color = "black"
        h2.style.color = "black"
        h3.style.color = "black"
        p.style.color = "black"
        document.getElementById("red").style.borderColor = "black"
        document.getElementById("yellow").style.borderColor = "black"
        document.getElementById("green").style.borderColor = "black"
        document.getElementById("purple").style.borderColor = "black"
    }
})

function currenthigh(arr){
    let h3 = document.querySelector("h3")
    let high = -1
    for(i of arr){
        if(i>high){
            high = i
        }
    } h3.innerText = `High-Score = ${high}`
}