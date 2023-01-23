const buttonNewGame = document.getElementById("new-game")
const screenCards = document.getElementById("game-cards")
const backCards = document.getElementById("back-cards")

let cardOpenCount = 0
let cardsCliked = []
let verificStatus = false
const pointsForHit = 150
const pointsLost = pointsForHit / 3
let totalPoints = 0

const resetGame = resetTable => {
    screenCards.innerText = ""
    backCards.innerText = ""
}

const createNewGame = NewGame => {
    resetGame()

    let numberimg = []
    let rndNumber = () => {return Math.floor(Math.random() * 16 + 1)}

    for(let i = 0; numberimg.length < 16; i++){
        let numberRandom = rndNumber()
        if (!numberRandom === numberimg.includes(numberRandom)){
            let img = document.createElement('img')
            img.className = `image ${numberRandom}`
            img.src = `img/memory-img-${numberRandom}.png`
            screenCards.appendChild(img)
            numberimg.push(numberRandom)
        }
    }

    for (let i = 0; i < 16; i++){
        const backimg = document.createElement('img')
        backimg.className = `back-card ${i+1}`
        backimg.id = `back-card-${i+1}`
        backimg.src = 'img/back-card.png'
        backimg.setAttribute("onclick",'cardClick(this.id)')
        backCards.appendChild(backimg)
    }
}

createNewGame()

buttonNewGame.addEventListener("click", createNewGame)

const cardClick = (id) => {
    const getIdCard = document.getElementById(id)
    const getClassid = getIdCard.className
    let classNumber = getClassid.substring(getClassid.length-2)

    if (cardOpenCount < 2 & verificStatus === false){
        getIdCard.style.visibility = "hidden"
        cardOpenCount++
        cardsCliked.push(classNumber)
    }
    if(cardOpenCount === 2 & verificStatus === false){
        verificStatus = true
        const card1length1 = document.getElementById('game-cards').childNodes[Number(cardsCliked[0]-1)].className.length
        const card1length2 = document.getElementById('game-cards').childNodes[Number(cardsCliked[0]-1)].className.length
        let getIdCard1 = Number(document.getElementById('game-cards').childNodes[Number(cardsCliked[0]-1)].className.substring(card1length1-2))
        let getIdCard2 = Number(document.getElementById('game-cards').childNodes[Number(cardsCliked[1]-1)].className.substring(card1length2-2))
        if(getIdCard1 <= 8){getIdCard1 += 8}
        if (getIdCard2 <= 8){getIdCard2 += 8}
        if(getIdCard1 === getIdCard2){hitCards()}else{setTimeout(() => {carBackVisible()}, 1500)}             
    }
}


const carBackVisible = () => {
    const pointSelect = document.getElementById('points')
    const getIdCard3 = document.getElementById(document.getElementsByClassName(Number(cardsCliked[0]))[1].id)
    const getIdCard4 = document.getElementById(document.getElementsByClassName(Number(cardsCliked[1]))[1].id)
    if (totalPoints < pointsLost){totalPoints = 0}else{totalPoints -= pointsLost}  
    pointSelect.innerHTML = `${totalPoints}`  
    verificStatus = false
    getIdCard3.style.visibility = "visible"
    getIdCard4.style.visibility = "visible"
    cardOpenCount = 0
    cardsCliked = []
}

function hitCards(){
    const pointSelect = document.getElementById('points')
    totalPoints += pointsForHit
    pointSelect.innerHTML = `${totalPoints}`
    verificStatus = false
    cardOpenCount = 0
    cardsCliked = [] 
}