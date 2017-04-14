import React, { Component } from 'react';
import _ from 'lodash';
import Hand from './containers/Hand.js';
import Deck from './containers/Deck.js';

  const decks = [
    {
      id: 123,
      name: 'Deck 1',
      type: 'Deck 1 type'
    },
    {
      id: 456,
      name: 'Deck 2',
      type: 'Deck 2 type'
    },
  ];
  const cards = [
    {
      name: 'This name',
      type: 'Land',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/02/2d/f9/022df9c11dd13dff9dcb519288a4d9d6.jpg'
    },
    {
      name: 'Card 1',
      type: 'Land',
      image: 'http://www.manaleak.com/magic-the-gathering/images/Borderland_Ranger_image25595.jpg'
    },
    {
      name: 'Card 2',
      type: 'Land',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg'
    },
    {
      name: 'Card 3',
      type: 'Artifact',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg'
    },
    {
      name: 'Card 4',
      type: 'Artifact',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg'
    },
    {
      name: 'Card 5',
      type: 'this type',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg'
    },
    {
      name: 'This name 2',
      type: 'this type 2',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg'
    }
  ]

class App extends Component {

  constructor(props) {
    super(props);
    this.updateDecklistByCategory = this.updateDecklistByCategory.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.draw = this.draw.bind(this);
  }
  state = {
    staticDeck : cards,
    dynamicDeck: _.shuffle(cards),
    hand: []
  }

  updateDecklistByCategory(filterText) {
    let filteredCards = cards.filter(card => {
      let reg = new RegExp(`.*${filterText}.*`, 'i')
      return card.name.match(reg) || card.type.match(reg)
    })
    this.setState({staticDeck: filteredCards});
  }

  shuffleDeck(deck) {
    this.setState({dynamicDeck: _.shuffle(deck), hand: []});
  }

  draw(deck, amount) {
    const drawn = deck.splice(0, amount);
    this.setState({hand: this.state.hand.concat(drawn)})
  }

  render() {
    return (
      <div className="App" style={{
        display:        'flex',
        flexDirection:  'row',
        justifyContent: 'fex-start',
        padding:        '1rem'
      }}>
        <Deck decks={decks}
          dynamicDeck={this.state.dynamicDeck}
          staticDeck={this.state.staticDeck}
          handleFilter={this.updateDecklistByCategory}
          handleShuffle={this.shuffleDeck}
          handleDraw={this.draw}
        />
        <Hand cards={this.state.hand} />
      </div>
    );
  }
}

export default App;
