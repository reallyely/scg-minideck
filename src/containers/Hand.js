import React, { Component } from 'react'
import Card from '../components/Card';
import './Hand.css'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'


export default class Hand extends Component {
  state = {
    discard: [],
    style: {}
  }
  style = {
    overflow: 'hidden',
    margin: '.25rem',
    width: '9rem'
  }
// receives a new hand
// - when new hand is received, discard all drawn cards
// receives drawn cards
  render() {
    let cards = this.props.cards.map((card, i) => {
      return (
        <Card
          card={card}
          key={`${card.id}-${i}`}
          image={card.image}
          style={this.style}
        />
      )
    })

    return (
      <div style={{
        display:'flex',
        flexFlow: 'row wrap',
        alignContent: 'flex-start'
      }}>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {cards}
        </CSSTransitionGroup>
      </div>
    );
  }
}