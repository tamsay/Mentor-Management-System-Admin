import React from "react";

import "./Candela.scss";

const Candela = () => {
  return (
    <div>
      <div className='wrap'>
        <div className='angle' />
        <div className='angle' />
        <div className='angle' />
        <div className='angle' />
      </div>
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <filter id='goo'>
            <fegaussianblur in='SourceGraphic' result='blur' stddeviation='12' />
            <fecolormatrix in='blur' mode='matrix' result='goo' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' />
            <fecomposite in2='goo' in='SourceGraphic' operator='atop' />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Candela;
