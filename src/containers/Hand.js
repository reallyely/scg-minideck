import React, { Component } from 'react'
import Card from '../components/Card';
import './Hand.css'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export default class Hand extends Component {

  constructor(props) {
    super(props)
    this.state = {
      discard: [],
      style: {}
    }
    this.style = {
      overflow: 'hidden',
      margin: '.25rem',
      width: '9rem'
    }
  }
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