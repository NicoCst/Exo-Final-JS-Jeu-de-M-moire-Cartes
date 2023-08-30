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

let shuffledCards = shuffle(cards);

let cardSection = document.getElementById('card-section');

for (let index = 0; index < cards.length; index++) {
    let card = document.createElement('div')
    card.classList.add('card-element');
    cardSection.appendChild(card); 
}

let cardElement = document.getElementsByClassName('card-element');


let flippedCards = 0; // Variable pour suivre le nombre de cartes retournées
let selectedCardList = [];
let winningCardList = [];
let selectedCardIndices = []; // Indices des cartes sélectionnées

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
                    }, 1000); // Temps d'attente avant de retourner les cartes
                }
            
                // Réinitialiser le compteur de cartes retournées
                flippedCards = 0;
            
                // Vérifier si toutes les paires ont été trouvées
                if (winningCardList.length === cards.length) {
                    // Toutes les paires ont été trouvées, afficher un message de victoire ou effectuer une action appropriée
                    alert("Félicitations ! Vous avez trouvé toutes les paires !");
                }
            }                       
        }
    });
});

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
}

restartButton.addEventListener('click', resetGame);