import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCards';

import Confetti from 'react-confetti';

const cardImages = [
  {
    src: '/img/panda.png',
  },
  {
    src: '/img/redpanda.png',
  },
  {
    src: '/img/shifu.png',
  },
  {
    src: '/img/racoon.png',
  },
  {
    src: '/img/squirell.png',
  },
  {
    src: '/img/gecko.png',
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [win, setWin] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (card1 && card2) {
      if (card1.src === card2.src) {
        setCards((prev) => {
          return prev.map((card) => {
            return card.src === card1.src ? { ...card, isMatched: true } : card;
          });
        });

        resetCards();
      } else {
        setTimeout(() => {
          resetCards();
        }, 1000);
      }
    }
  }, [card1, card2]);

  useEffect(() => {
    if (cards.length !== 0) {
      const endGame = cards.every((card) => card.isMatched === true);
      if (endGame) {
        console.log(endGame);
        console.log(cards);
        setWin(true);
      }
    }
  }, [cards]);

  const resetCards = () => {
    setTurns((prev) => prev + 1);

    setCard1(null);
    setCard2(null);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort((a, b) => 0.5 - Math.random())
      .map((imag) => ({
        src: imag.src,
        id: Math.random() * 1000 + 1,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setCard1(null);
    setCard2(null);
    setTurns(0);
    setWin(false);
  };

  const onClick = (card) => {
    if (!card1 && !card2) {
      setCard1(card);
    }
    if (card1 && card1 !== card && !card2) {
      setCard2(card);
    }
  };

  return (
    <div className="App">
      {win && <Confetti />}
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>{win ? 'Play Again?' : 'New Game'}</button>
      <div>{turns}</div>
      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <SingleCard
              key={card.id}
              onClick={() => onClick(card)}
              {...card}
              visible={card === card1 || card === card2 || card.isMatched}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
