import React, { Component } from 'react';
import _ from 'lodash';
import Hand from './containers/Hand.js';
import Deck from './containers/Deck.js';
import axios from 'axios';
import { text } from './Style'

class App extends Component {

  constructor(props) {
    super(props);
    this.filterDeckList = this.filterDeckList.bind(this);
    this.getSelectedDeck = this.getSelectedDeck.bind(this);
    this.expandDeckByQuantity = this.expandDeckByQuantity.bind(this);
    this.drawHand = this.drawHand.bind(this);
    this.draw = this.draw.bind(this);
  }
  state = {
    decks: [],
    staticDeck : [],
    drawDeck: [],
    deckList: [],
    hand: [],
    selectedDeck: undefined,
  }
  componentDidMount() {
    axios.get('http://localhost:9090/decks')
    .then(res => this.setState({decks: [].concat({name: 'Select a Deck'}, res.data)}))
    .catch(console.log)
  }

  filterDeckList(filterText) {
    let filteredCards = this.state.staticDeck.filter(card => {
      let reg = new RegExp(`.*${filterText}.*`, 'i')
      return card.name.match(reg) || card.type.match(reg)
    })
    this.setState({deckList: filteredCards});
  }

  expandDeckByQuantity(deck) {
    return _.flatten(deck.map(({id, name, image, quantity}) =>  (
      new Array(Number(quantity)).fill({id, name, image})
    )))
  }


  getSelectedDeck(event) {
    const deckID = event.target.value
    axios.get(`http://localhost:9090/decks/${deckID}`)
    .then(({data}) => {
      this.setState({
        selectedDeck: deckID,
        staticDeck: data,
        drawDeck: _.shuffle(this.expandDeckByQuantity(data)),
        deckList: data,
        hand: []
      })
    })
    .catch(console.log)
  }

  drawHand() {
    this.setState(prevState => {
      let newDrawDeck = _.shuffle(this.expandDeckByQuantity(prevState.staticDeck))
      let newHand = newDrawDeck.splice(0, 7);
      return {
        drawDeck: newDrawDeck,
        hand: newHand
      }
    });
  }

  draw() {
    this.setState(prevState => ({hand: prevState.hand.concat(prevState.drawDeck.splice(0,1))}))
  }

  render() {
    return (
      <div className="App" style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: '1rem',
        fontFamily: 'Alegreya Sans',
        color: text,
      }}>
        <Deck
          decks={this.state.decks}
          drawDeck={this.state.drawDeck}
          deckList={this.state.deckList}
          selectedDeck={this.state.selectedDeck}
          handleFilter={this.filterDeckList}
          handleDrawHand={this.drawHand}
          handleDraw={this.draw}
          handleGetSelectedDeck={this.getSelectedDeck}
        />
        <Hand cards={this.state.hand} />
      </div>
    );
  }
}

export default App;
