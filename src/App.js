import React from 'react';
import Card from './components/Card/Card';
import Header from './components/Header/Header'
import {apiKey, apiURL} from "./utils/axios";
import axios from 'axios';
import "./App.scss";
import Instructions from './components/Instructions/Instructions'

class App extends React.Component {
  state = {
      cards: [
        'card1', 
        'card2', 
        'card3', 
        'card4', 
        'card5', 
        'card6', 
        'card7', 
        'card8', 
        'card9', 
        'card10', 
        'card11', 
        'card12', 
        'card13', 
        'card14', 
        'card15'
      ],
      finalCardsList: [],
      revealedCards: []
  }

  // Get random emoji for each cards
  fetchEmoji = () => {
    let cards = [
      {cardNum: 'card1'},
      {cardNum: 'card2'}, 
      {cardNum: 'card3'}, 
      {cardNum: 'card4'},
      {cardNum: 'card5'}, 
      {cardNum: 'card6'}, 
      {cardNum: 'card7'}, 
      {cardNum: 'card8'}, 
      {cardNum: 'card9'}, 
      {cardNum: 'card10'}, 
      {cardNum: 'card11'}, 
      {cardNum: 'card12'}, 
      {cardNum: 'card13'},
      {cardNum: 'card14'}, 
      {cardNum: 'card15'}
    ]

    return axios
      .get(apiURL + "/categories/smileys-emotion?access_key=" + apiKey)
      .then((response) => {
        for (let i = 0; i < cards.length; i++) {
          let randomizedIndex = Math.floor(Math.random() * 300);
          cards[i].emoji = response.data[randomizedIndex].character;
          }
          return cards;
      })
      .catch(error => {
          console.log(error);
      })
  }
    

  // Initiate game
  startGame = () => {
    
    this.fetchEmoji().then(cards => {

      const linkCardEmoji = (card) => {
        const findCard = cards.find(indCard => indCard.cardNum === card);
        console.log(findCard.emoji);
        return findCard.emoji
      }
  
      let finalCardsList = [];
  
      // Create 1 array with 2 sets of cards
      let duplicateCards = this.state.cards.concat(this.state.cards);
  
      // Shuffle cards array
      let randomizeCards = this.shuffleCards(duplicateCards);
  
      // Add status to each card
      randomizeCards.map( card => {
        finalCardsList.push({
          card: card,
          cardEmoji: linkCardEmoji(card),
          isClosed: true,
          isMatched: false,
        })
        // console.log(finalCardsList);
        return randomizeCards;
      })
  
      this.setState({
        finalCardsList: finalCardsList,
      })

    })
    
    
  }

  // Randomly shuffle cards
  shuffleCards = (cardsArr) => {
    
    let currIndex = cardsArr.length;
    let tempValue;
    let randomizedIndex;

    while(0 !== currIndex) {
      // get random index
      randomizedIndex = Math.floor(Math.random() * currIndex);
      
      // decrease current index by 1
      currIndex -= 1;

      // store card at current index -1 to temporary value holder
      tempValue = cardsArr[currIndex];

      // swap randomized index card with stored temp card
      cardsArr[currIndex] = cardsArr[randomizedIndex];
      cardsArr[randomizedIndex] = tempValue;
    }

    return cardsArr;
  }

  handleClick = (cardName, index) => {
    
    // Check cards only when 2 are selected
    if (this.state.revealedCards.length === 2) {
      setTimeout(() => {
        this.checkMatch()
      },500)
    } else {
      
      // Declare selected Card
      let card = {
        cardName: cardName,
        index: index
      }
    
      // Get working copies current state values
      let finalCardsList = this.state.finalCardsList;
      let revealedCards = this.state.revealedCards;

      // Keep card open and store revealed card for checkMatch
      finalCardsList[index].isClosed = false;
      revealedCards.push(card);
      
      this.setState({
        revealedCards: revealedCards,
        finalCardsList: finalCardsList
      })
      
      // Check cards when 2 are selected
      if (this.state.revealedCards.length === 2) {
        setTimeout(() => {
        this.checkMatch()
        },1000)
      }
    }
  }

  checkMatch = () => {

    let finalCardsList = this.state.finalCardsList

    // Conditionals
    const bothCardMatch = this.state.revealedCards[0].cardName === this.state.revealedCards[1].cardName;
    const sameCard = this.state.revealedCards[0].index === this.state.revealedCards[1].index;

    // Update whether both cards have been matched, close if not
    if ((bothCardMatch) && (!sameCard)) {
        finalCardsList[this.state.revealedCards[0].index].isMatched = true
        finalCardsList[this.state.revealedCards[1].index].isMatched = true
    } else {
        finalCardsList[this.state.revealedCards[0].index].isClosed = true
        finalCardsList[this.state.revealedCards[1].index].isClosed = true
    }

    // Reset state of finalCardsList and revealedCards
    this.setState({
        finalCardsList,
        revealedCards: []
    })
  }

  // Start game on load
  componentDidMount() {
    this.startGame();
  }

  render() {
    return (
      <div>
        < Header />
        < Instructions />
        <div className='game-board'>
          {this.state.finalCardsList && this.state.finalCardsList.map((card, index) => {
            return <Card cardNum={card.card} cardEmoji={card.cardEmoji} flipCard={() => {this.handleClick(card.card, index)}} isClosed={card.isClosed} isMatched={card.isMatched} />
          })}
        </div>
      </div>
    );
  }
}

export default App;