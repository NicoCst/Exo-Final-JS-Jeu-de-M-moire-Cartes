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
    {number: 7, src: "img-cartes/dbstar1.png"},
    {number: 7, src: "img-cartes/dbstar1.png"},
    {number: 8, src: "img-cartes/dbstar2.png"},
    {number: 8, src: "img-cartes/dbstar2.png"},
    {number: 9, src: "img-cartes/dbstar3.png"},
    {number: 9, src: "img-cartes/dbstar3.png"},
    {number: 10, src: "img-cartes/dbstar4.png"},
    {number: 10, src: "img-cartes/dbstar4.png"},
    {number: 11, src: "img-cartes/dbstar5.png"},
    {number: 11, src: "img-cartes/dbstar5.png"},
    {number: 12, src: "img-cartes/dbstar6.png"},
    {number: 12, src: "img-cartes/dbstar6.png"},
]

let selectDiffi = document.getElementById('select-menu');
let cardSection = document.getElementById('card-section');
let cardElement = document.getElementsByClassName('card-element');

const shuffle = (array) => {
    if (selectDiffi.value === "easy") {
        array = array.slice(0, 12);
    } else if (selectDiffi.value === "medium") {
        array = array.slice(0, 18);
    } else if (selectDiffi.value === "hard") {
        array = array.slice(0, 24);
    }
    return array.sort(() => Math.random() - 0.5)
};

let shuffledCards = shuffle(cards);

const updateCardListeners = () => {
    Array.from(cardElement).forEach((element, i) => {
        element.removeEventListener('click', cardClickHandler); // Supprime les anciens écouteurs d'événements
        element.addEventListener('click', cardClickHandler); // Ajoute les nouveaux écouteurs d'événements
    });
};

const displayCards = () => {
    cardSection.innerHTML = ""; // Supprime toutes les cartes de la section
    for (let index = 0; index < shuffledCards.length; index++) {
        let card = document.createElement('div')
        card.classList.add('card-element');
        cardSection.appendChild(card); 
    }
}

displayCards();

selectDiffi.addEventListener('change', () => {
    shuffledCards = shuffle(cards); // Met à jour le tableau en fonction de la difficulté sélectionnée
    displayCards();
    updateCardListeners();
});


let flippedCards = 0; // Variable pour suivre le nombre de cartes retournées
let selectedCardIndices = []; // Indices des cartes sélectionnées
let winningCardList = [];


function cardClickHandler() {
    Array.from(cardElement).forEach((element, i) => {
        element.addEventListener('click', () => {
            // Vérifier si la carte est déjà retournée ou si deux cartes sont déjà retournées
            if (!element.classList.contains('recto') && flippedCards < 2) {
                element.classList.add('recto');
                element.style.backgroundImage = `url(${shuffledCards[i].src})`;

                selectedCardIndices.push(i); // Ajouter l'index de la carte à la liste sélectionnée
                flippedCards++;

                if (flippedCards === 2) {
                    // Comparer les deux cartes retournées
                    if (selectedCardIndices.length === 2 &&
                        shuffledCards[selectedCardIndices[0]].number === shuffledCards[selectedCardIndices[1]].number) {
                        // Les deux cartes sont des paires, les laisser face découverte
                        winningCardList.push(selectedCardIndices[0], selectedCardIndices[1]);
                
                        // Réinitialiser les cartes sélectionnées
                        selectedCardIndices = [];
                    } else {
                        // Les deux cartes ne sont pas des paires, les retourner de dos
                        setTimeout(() => {
                            selectedCardIndices.forEach(index => {
                                if (cardElement[index]) {
                                    cardElement[index].classList.remove('recto');
                                    cardElement[index].style.backgroundImage = "";
                                }
                            });
                
                            // Réinitialiser les cartes sélectionnées
                            selectedCardIndices = [];
                            // Incrémenter le compteur d'essais
                            incrementTryCounter();
                        }, 1000); // Temps d'attente avant de retourner les cartes
                    }
                
                    // Réinitialiser le compteur de cartes retournées
                    flippedCards = 0;
                
                    // Vérifier si toutes les paires ont été trouvées
                    if (winningCardList.length === shuffledCards.length) {
                        // Toutes les paires ont été trouvées, afficher un message de victoire ou effectuer une action appropriée
                        const popup = document.getElementById('popup');
                        const closePopupButton = document.getElementById('close-popup');
                        
                        addTryToPopup();
                        addTimeToPopup();
                        resetTime();
                        popup.style.display = 'flex';

                        closePopupButton.addEventListener('click', () => {
                            popup.style.display = 'none';
                        });
                    }
                }                       
            }
        });
   });
}

updateCardListeners();


//Reset button

const restartButton = document.querySelector('button');

function resetGame() {
    // Réinitialiser les cartes sélectionnées et gagnantes
    selectedCardIndices = [];
    winningCardList = [];

    // Mélanger à nouveau les cartes
    shuffledCards = shuffle(cards);

    // Réinitialiser les cartes visuelles
    Array.from(cardElement).forEach((element, i) => {
        element.classList.remove('recto');
        element.style.backgroundImage = '';
    });

    // Réinitialiser le compteur de cartes retournées
    flippedCards = 0;

    // Réinitialiser le compteur d'essais
    resetTryCounter();

    // Réinitialiser le timer
    resetTime();
}

restartButton.addEventListener('click', resetGame);

// Try counter

let tryCounter = 0;
let tryCounterElement = document.getElementById('try-counter');

const addTryToPopup = () => {
    const tryCounterPopup = document.getElementById('popup-content-text');
    tryCounterPopup.innerHTML = `Bravo tu as gagné ! <br> Nombre d'essais: ${tryCounter}`;
}

// Incrémenter le compteur d'essais
function incrementTryCounter() {
    tryCounter++;
}

// Réinitialiser le compteur d'essais
function resetTryCounter() {
    tryCounter = 0;
}

addTryToPopup();

//Timer
let totalTimeInSeconds = 0;
let seconds = 0;
const timerElement = document.getElementById('timer');

const updateTimer = () => {
    seconds++;
    totalTimeInSeconds++;
    timerElement.textContent = `Temps écoulé : ${seconds} ${seconds === 1 ? 'seconde' : 'secondes'}`;
};

// Mettre à jour le timer toutes les 1 000 millisecondes (1 seconde)
const timerInterval = setInterval(updateTimer, 1000);

const addTimeToPopup = () => {
    const timePopup = document.getElementById('popup-content-text');
    let textTimePopup = document.createElement('p');
    textTimePopup.innerHTML = `Temps total : ${totalTimeInSeconds} ${totalTimeInSeconds === 1 ? 'seconde' : 'secondes'}`;
    timePopup.appendChild(textTimePopup);
};

const resetTime = () => {
    seconds = 0;
    totalTimeInSeconds = 0;
}