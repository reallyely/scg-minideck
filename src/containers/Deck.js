import React, { Component } from 'react';
import DeckControls from '../components/DeckControls'
import DeckList from '../components/DeckList'

export default class Deck extends Component {
  state ={
    deckListHeight: 0,
    phantomDeckWidth: 0,
  }
  constructor(props) {
    super(props)
    this.getDC = this.getDC.bind(this)
  }

  getDC(ref) {
    if (ref.clientHeight) {
      this.setState({
        deckListHeight: window.innerHeight - ref.clientHeight - 32,
        phantomDeckWidth: ref.clientWidth + 16
      })
    }
  }

  render() {
    return (
      <div>
        <div style={{
          minWidth: '17rem',
          maxWidth: '17rem',
          margin: '.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          position: 'fixed',
        }}>
          {/*controls*/}
          <DeckControls
            decks={this.props.decks}
            deckList={this.props.deckList}
            drawDeck={this.props.drawDeck}
            handleFilter={this.props.handleFilter}
            handleDrawHand={this.props.handleDrawHand}
            handleDraw={this.props.handleDraw}
            handleRef={this.getDC}
            handleGetSelectedDeck={this.props.handleGetSelectedDeck}
            selectedDeck={this.props.selectedDeck}
          />
          <DeckList style={{height: this.state.deckListHeight}} deckList={this.props.deckList} />
          {/*list
            all cards
            filter value
          */}
        </div>
        <div style={{minWidth: this.state.phantomDeckWidth , content: 'asdgoiashdg'}} />
      </div>
    );
  }
}

