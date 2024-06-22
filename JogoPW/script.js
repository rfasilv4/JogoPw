document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    
    class Card {
        constructor(type, content) {
            this.type = type;
            this.content = content;
            this.flipped = false;
            this.matched = false;
            this.element = this.createElement();
        }

        createElement() {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            
            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');
            
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.innerText = '?';  // Mostrar um símbolo genérico até a carta ser virada
            
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.innerText = this.content;
            
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardElement.appendChild(cardInner);
            
            cardElement.addEventListener('click', () => this.flip());
            
            return cardElement;
        }

        flip() {
            if (this.flipped || this.matched || game.selectedCards.length === 2) return;
            this.flipped = true;
            this.element.classList.add('flipped');
            game.checkMatch(this);
        }

        unflip() {
            this.flipped = false;
            this.element.classList.remove('flipped');
        }

        setMatched() {
            this.matched = true;
            this.element.classList.add('matched');
        }
    }

    class MemoryGame {
        constructor(cardsData) {
            this.cards = [];
            this.selectedCards = [];
            this.createCards(cardsData);
            this.shuffleCards();
            this.render();
        }

        createCards(cardsData) {
            cardsData.forEach(data => {
                this.cards.push(new Card('term', data.symbol));
                this.cards.push(new Card('definition', data.description));
            });
        }

        shuffleCards() {
            this.cards.sort(() => 0.5 - Math.random());
        }

        render() {
            this.cards.forEach(card => gameBoard.appendChild(card.element));
        }

        checkMatch(card) {
            this.selectedCards.push(card);
            if (this.selectedCards.length === 2) {
                const [firstCard, secondCard] = this.selectedCards;
                if ((firstCard.type === 'term' && secondCard.type === 'definition' && firstCard.content === secondCard.content) ||
                    (firstCard.type === 'definition' && secondCard.type === 'term' && firstCard.content === secondCard.content)) {
                    firstCard.setMatched();
                    secondCard.setMatched();
                    this.selectedCards = [];
                } else {
                    setTimeout(() => {
                        firstCard.unflip();
                        secondCard.unflip();
                        this.selectedCards = [];
                    }, 1000);
                }
            }
        }
    }

    const cardsData = [
        { symbol: 'Classe', description: 'Definição: Uma classe é um modelo para criar objetos.' },
        { symbol: 'Objeto', description: 'Definição: Um objeto é uma instância de uma classe.' },
        { symbol: 'Método', description: 'Definição: Um método é uma função definida dentro de uma classe.' },
        { symbol: 'Atributo', description: 'Definição: Um atributo é uma variável definida dentro de uma classe.' },
        { symbol: 'Construtor', description: 'Definição: Um construtor é um método especial usado para inicializar objetos.' },
        { symbol: 'Herança', description: 'Definição: Herança permite que uma classe adquira propriedades de outra classe.' },
        { symbol: 'Polimorfismo', description: 'Definição: Polimorfismo permite que objetos sejam tratados como instâncias de sua classe pai.' },
        { symbol: 'Interface', description: 'Definição: Uma interface é um contrato que define métodos que uma classe deve implementar.' },
    ];

    const game = new MemoryGame(cardsData);
});
