import React, {Component} from 'react';
import _ from 'lodash';

export default class DeckList extends Component {
  state = { hover: false }
  constructor(props) {
    super(props);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  handleMouseIn(image) {
    this.setState({hover: true, hoverImage: image})
  }
  handleMouseOut() {
    this.setState({hover: false, hoverImage: undefined})
  }

  render() {
    const categories = _.uniqBy(this.props.cards, 'type').map(e => e.type).sort();
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {categories.map((cat, i) => (
          <span key={`${cat.type}-${i}`}>
            <h3 style={{display: 'flex', alignItems: 'flex-start'}}>{cat}</h3>
            {this.props.cards.filter(card => card.type === cat).map((card, j) => (
              <span
                key={`${card.type}-${card.name}-${j}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: '.25rem'
                }}
                onMouseEnter={()=>this.handleMouseIn(card.image)}
                onMouseLeave={()=>this.handleMouseOut()}
              >
                <span>{card.name}</span>
                <span> x {card.quantity || 0}</span>
              </span>
            ))}
          </span>
          ))}
          {
            this.state.hover
            ? <img style={{
                position: "absolute",
                left: "15rem",
                top: "5rem"
              }}
              src={this.state.hoverImage} />
            : null
          }
      </div>
    );
  }
}
