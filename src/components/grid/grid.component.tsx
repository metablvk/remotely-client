import React from 'react';

const Grid = ({children, classNames = 'mt-8'}) => {
  return <div className={`grid grid-cols-12 ${classNames}`}>{children}</div>;
};

export default Grid;
