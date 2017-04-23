import React, {Component} from 'react'
import _ from 'lodash'
import { accentScale } from '../Style'

import {Scrollbars} from 'react-custom-scrollbars'

import H3 from './H3'
export default class DeckList extends Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
  }
  state = { hover: false }
  style = {display: 'flex', flexDirection: 'column', height:'20rem'}
  handleHover(hoverImage) {
    this.setState({hoverImage})
  }

  render() {
    const categories = _.uniqBy(this.props.deckList, 'type').map(e => e.type).sort();

    return (
      <div>
      <Scrollbars style={Object.assign({}, this.style, this.props.style, this.state.style)}>
        {categories.map((cat, i) => (
          <div key={`${cat.type}-${i}`}>
            <H3>{cat}</H3>
            {this.props.deckList.filter(card => card.type === cat).map((card, j) => (
              <div
                key={`${card.type}-${card.name}-${j}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: '.25rem'
                }}
                onMouseEnter={()=>this.handleHover(card.image)}
                onMouseLeave={()=>this.handleHover(undefined)}
              >
                <div style={{flexWrap:'wrap'}}>{card.name}</div>
                <div style={{minWidth: '2rem', justifyContent: 'space-around'}}><span> x</span><span> {card.quantity || 0}</span></div>
              </div>
            ))}
            </div>
          ))}
        </Scrollbars>

          {
            this.state.hoverImage
            ? <img
                style={{
                  position: "absolute",
                  left: "19rem",
                  top: "5rem",
                  boxShadow: `0px 4px 27px 15px #fff`
                }}
                src={this.state.hoverImage}
                alt={`A hovered magic card`}
              />
            : null
          }
        </div>
    );
  }
}
