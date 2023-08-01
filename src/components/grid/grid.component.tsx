import React from 'react';

const Grid = ({children}) => {
  return <div className="grid grid-cols-12 mt-8">{children}</div>;
};

export default Grid;
