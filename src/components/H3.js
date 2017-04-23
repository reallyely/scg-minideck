import React from 'react';
import { primaryScale } from '../Style'
const defaultStyle = {
    fontSize:   '1.25rem',
    fontWeight: 1,
    fontFamily: 'Oswald, sans-serif',
    color:      primaryScale[3],
    display:    'flex',
    alignItems: 'flex-start'
  }
const H3 = ({children, style, ...rest}) => (
  <span style={Object.assign({}, defaultStyle, style)}
  {...rest}
  >
    {children}
  </span>
);

export default H3;