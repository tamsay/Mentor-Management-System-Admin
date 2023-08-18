import React from "react";

import "./InfinitySvg.scss";

const InfinitySvg = () => {
  return (
    <div>
      <svg viewBox='-2000 -1000 4000 2000'>
        <path id='inf' d='M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z' />
        <use xlink:href='#inf' stroke-dasharray='1570 5143' stroke-dashoffset='6713px' />
      </svg>
    </div>
  );
};

export default InfinitySvg;
