import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { RowEntry } from "./components/RowEntry";

function App(props) {
  // Set default value of card deck to new shuffled deck (or in other words, we start with a shuffled deck of cards)
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round.
  const [currCards, setCurrCards] = useState([]);
  // Set default round of game as false (i.e. not started).
  const [gameStart, setgameStart] = useState(false);
  // Set number of rounds won by Player 1 as 0 by default.
  const [p1RoundsWon, setp1RoundsWon] = useState(0);
  // Set number of rounds won by Player 2 as 0 by default.
  const [p2RoundsWon, setp2RoundsWon] = useState(0);

  const [isDisabled, setIsDisabled] = useState(false); // initial value is true

  // Draw two cards from the deck, one for P1 and one for P2.
  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);

    // Compare the card rank to determine who is the winner.
    // If P1's card rank is bigger than P2's card rank, P1 wins the current round.
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      setp1RoundsWon(p1RoundsWon + 1);
    }
    // Else P2 wins the current round.
    else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      setp2RoundsWon(p2RoundsWon + 1);
    }
  };

  //Count number of rounds left in game.
  let numRoundsLeft = cardDeck.length / 2;
  // You can write JavaScript here, just don't try and set your state!

  // if numofRounds = 0, then it will trigger end game and determine who won the game.
  let gameWinner = null;
  if (p1RoundsWon > p2RoundsWon) {
    gameWinner = 1;
  } else if (p2RoundsWon > p1RoundsWon) {
    gameWinner = 2;
  }
  // Conditional statement to state if there is a game winner, display who wins, or else it'll be a draw.
  const winningMessage = gameWinner
    ? `Player ${gameWinner} won this game!`
    : "It's a draw!";

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  //   // Deal button text changes at end of game to start again
  const ButtonText = cardDeck.length === 0 ? "Deal Again" : "Reset";

  const handleReset = () => {
    setCardDeck(makeShuffledDeck);
    setp1RoundsWon(0);
    setp2RoundsWon(0);
    setCurrCards([]);
    setgameStart(false);
  };

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h2>React High Card 🚀</h2>
        <h3>No. of cards left: {cardDeck.length}</h3>
        <h3>No. of rounds left: {numRoundsLeft}</h3>
        <h4>
          <Row className="table-row">
            <Col className="table-col">
              <p> Player 1 drew :{currCardElems[0]} </p>
            </Col>
            <Col className="table-col">Player 2 drew :{currCardElems[1]} </Col>
          </Row>
          <p> Player 1 has won {p1RoundsWon} times. </p>
          <p> Player 2 has won {p2RoundsWon} times. </p>
          <p>{numRoundsLeft === 0 && winningMessage}</p>
        </h4>

        <br />
        <Button variant="warning" onClick={dealCards}>
          Deal
        </Button>

        <Button variant="dark" onClick={handleReset}>
          {ButtonText}
        </Button>
      </div>
    </>
  );
}

export default App;
