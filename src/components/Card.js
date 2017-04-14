import React from 'react';

export default ({image, card, style}) => {
  return (
    <span>
      <img
        style={style}
        src={image}
        alt={card.name || "A magic card"}
      />
    </span>
  );
}


