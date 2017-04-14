import React, { Component } from 'react';
import Card from '../components/Card';

export default class Hand extends Component {
  state = {
    discard: []
  }
  constructor(props) {
    super(props);

  }
// receives a new hand
// - when new hand is received, discard all drawn cards
// receives drawn cards

  render() {
    return (
      <div style={{
        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "space-around",
        flexWrap: "wrap",
        alignContent: "flex-start"
      }}>
        {this.props.cards.map((card, i) => {
          return (
            <Card
              card={card}
              key={`${card.type}-${card.name}-${i}`}
              image={card.image}
              style={{margin: ".25rem", width: "9rem"}}
            />
          )
        })}
      </div>
    );
  }
}