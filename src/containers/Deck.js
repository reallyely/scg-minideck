import React, { Component } from 'react';
import DeckControls from '../components/DeckControls'
import DeckList from '../components/DeckList'

export default class Deck extends Component {
  // categories = _.uniqBy(this.props.cards, 'type').map(e => e.type)
  // constructor(props) {
  //   super(props);
  //   // DeckList
  //   // RandomizedVersion of decklist for pulling out cards into the hand
  // }

  render() {
    console.log(this.props)
    return (
      <div style={{margin: '.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        {/*controls*/}
        <DeckControls
          decks={this.props.decks}
          staticDeck={this.props.staticDeck}
          dynamicDeck={this.props.dynamicDeck}
          handleFilter={this.props.handleFilter}
          handleShuffle={this.props.handleShuffle}
          handleDraw={this.props.handleDraw}
        />
        <DeckList cards={this.props.staticDeck} />
        {/*list
          all cards
          filter value
        */}
      </div>
    );
  }
}

