import React from 'react';

  const DeckControls = (props) => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <select>
        {props.decks.map(e => {
          return <option key={e.id} value={e.id}>{e.name}</option>
        })}
      </select>
      <button onClick={() => props.handleDraw(props.dynamicDeck, 7)}>Draw Hand</button>
      <button onClick={() => props.handleDraw(props.dynamicDeck, 1)}>Draw Card</button>
      <button onClick={() => props.handleShuffle(props.staticDeck)}>Shuffle Deck</button>
      <input type="text"
        placeholder="Filter by card name and type"
        onChange={e => props.handleFilter(e.target.value)}
      />
    </div>
  );

  export default DeckControls;