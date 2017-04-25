import React, {Component} from 'react';
import { text, modScale, accentScale, bgScale, primaryScale } from '../Style.js'
import H3 from './H3'

export default class DeckControls extends Component {
  componentDidMount() {
    this.props.handleRef(this.dcRef)
  }
  render() {
    let {handleDraw, handleDrawHand, handleFilter, decks, deckList, ...rest} = this.props
    return (
      <div
        ref={div => this.dcRef  = div}
        style={{display: 'flex', flexDirection: 'column'}} {...rest}
      >
        <Menu
          items={decks}
          handleGetSelectedDeck={this.props.handleGetSelectedDeck}
          selectedDeck={this.props.selectedDeck}
        />
        <div style={{display:'flex', flexDirection:'row'}}>
          <Button
            style={{width: '50%', marginRight:'-.1rem'}}
            handleClick={() => handleDrawHand()}
          >
            Draw Hand
          </Button>
          <Button
            style={{width: '51%'}}
            handleClick={() => handleDraw()}
          >
            Draw Card
          </Button>
        </div>
        <Filter handleFilter={e => handleFilter(e.target.value)}
        />
      </div>
    );
  }
}

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      style: {}
    }
    this.style = {
      height: '2rem',
      borderRadius: '.1rem',
      backgroundColor: primaryScale[0],
      color: bgScale[0],
      border: 'none',
      margin: '.2rem',
      textTransform: 'uppercase',
      padding: '.2rem',
      transitionProperty: 'background-color,border-color,color,box-shadow',
      transitionDuration: '0.15s',
      outline: 'none'
    }
    this.handleHover = this.handleHover.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }
  handleHover(e) {
    let i = e.type === 'mouseenter' ? 2 : 0
    this.setState(({style}) => style = modScale(i, primaryScale, ['backgroundColor'], style) )
  }
  handlePress(e) {
    let i = e.type === 'mousedown' ? 3 : 0
    this.setState(({style}) => style = modScale(i, primaryScale, ['backgroundColor'], style))
  }
  handleFocus(e) {
    let i = e.type === 'focus' ? `0px 0px 3px 1px ${primaryScale[3]}` : ""
    this.setState(({style}) => style.boxShadow = i)
  }
  render() {
    return (
      <button
        style={Object.assign({}, this.style, this.props.style, this.state.style)}
        onClick={() => this.props.handleClick()}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onMouseDown={this.handlePress}
        onMouseUp={this.handlePress}
        onFocus={this.handleFocus}
        onBlur={this.handleFocus}
    >
      {this.props.children}
    </button>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { style: {}, deckFormat: ''}
    this.menuStyle = {
      fontSize: '2rem',
      fontFamily: 'Oswald, sans-serif',
      backgroundColor: 'transparent',
      border: '0rem none',
      color: primaryScale[1],
      outline: 'none'
    }
    this.optionStyle = {
      backgroundColor: bgScale[0]
    }
  }

  componentWillReceiveProps(nextProps) {
    let deckID = nextProps.selectedDeck
    let deckFormat = nextProps.items.filter(e => Number(e.id) === Number(deckID)).reduce((out, e) => (e.format), '')
    this.setState({deckFormat})
  }

  handleHover(e) {
    let i = e.type === 'mouseenter' ? 2 : 0
    this.setState(prevState => prevState.style = modScale(i, primaryScale, ['color', 'borderColor'], prevState.style) )
  }

  render() {
    const options = this.props.items.map(e => (
      <option style={this.optionStyle} key={`${e.id}-${e.name}`} value={e.id}>
        {e.name}
      </option>
    ));

    return (
      <span>
        <select
          style={Object.assign({}, this.menuStyle, this.props.style, this.state.style)}
          onMouseEnter={e => this.handleHover(e)}
          onMouseLeave={e => this.handleHover(e)}
          onChange={this.props.handleGetSelectedDeck}
          ref={select => this.menu = select}
        >
          {options}
        </select>
        <div style={{height:'1.5em'}}>
          <H3 style={{color: accentScale[3], paddingLeft: '.25em'}}>{this.state.deckFormat}</H3>
        </div>
      </span>
    );
  }
}

class Filter extends Component {
  constructor(props) {
    super(props)

    this.style = {
      default: {
        height: '1.2rem',
        padding: '.2rem',
        marginTop: '.2rem',
        marginBottom: '.2rem',
        color: primaryScale[0],
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: `0.10rem solid ${primaryScale[0]}`,
        outline: 'none',
        transitionProperty: 'color',
        transitionDuration: '.15s'
      },
      focus: {
        borderBottom: `.10rem solid ${primaryScale[2]}`,
        color: text
      }
    }
    this.state = { hasText: false, style: {}}

    this.checkInput = this.checkInput.bind(this)
    this.toggleFocus = this.toggleFocus.bind(this)
  }

  toggleFocus(e) {
    e.type === 'focus'
    ? this.setState((prev) => prev.style = this.style.focus)
    : this.setState((prev) => prev.style = this.style.default)
  }
  checkInput(e) {
    e.target.value
    ? this.setState({hasText: true})
    : this.setState({hasText: false})
  }

  render() {
    return (
      <input
        style={Object.assign({}, this.style.default, this.props.style, this.state.style)}
        onChange={e => {
          this.props.handleFilter(e);
          this.checkInput(e)
        }}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
        className={this.state.hasText ? '' : 'material-icons'}
        type='text'
        placeholder='filter_list'
      />
    );
  }
}