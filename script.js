const cards = [
    {number: 1, src: "img-cartes/GokuKid.png"},
    {number: 1, src: "img-cartes/GokuKid.png"},
    {number: 2, src: "img-cartes/GokuAdult.png"},
    {number: 2, src: "img-cartes/GokuAdult.png"},
    {number: 3, src: "img-cartes/GokuSSJ1.png"},
    {number: 3, src: "img-cartes/GokuSSJ1.png"},
    {number: 4, src: "img-cartes/GokuSSJ2.png"},
    {number: 4, src: "img-cartes/GokuSSJ2.png"},
    {number: 5, src: "img-cartes/GokuSSJ3.png"},
    {number: 5, src: "img-cartes/GokuSSJ3.png"},
    {number: 6, src: "img-cartes/GokuSSJGOD.png"},
    {number: 6, src: "img-cartes/GokuSSJGOD.png"},
]

const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5)
};

const shuffledCards = shuffle(cards);

let cardSection = document.getElementById('card-section');

for (let index = 0; index < cards.length; index++) {
    let card = document.createElement('div')
    card.classList.add('card-element');
    cardSection.appendChild(card); 
}

let cardElement = document.getElementsByClassName('card-element');

Array.from(cardElement).forEach((element, i) => {
    
    element.addEventListener('click', () => {
        element.classList.toggle('recto');
        element.style.backgroundImage = `url(${shuffledCards[i].src})`;

        let imgUrl = getComputedStyle(cardElement[i]).getPropertyValue("background-image");
    })
}); 

let selectedCardList = [];
let winningCardList = [];

const match = (url) => {
    if (selectedCardList.length < 2) {
        selectedCardList.push(url);
    } else if (selectedCardList == 2) {
        if (selectedCardList[0] == selectedCardList[1]) {
            winningCardList.push(selectedCardList[0],selectedCardList[1]);
            selectedCardList = [];
        } else {
            
            selectedCardList = [];
        }
    }
}