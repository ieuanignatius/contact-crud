import React from 'react';
import { bool, node } from 'prop-types';

import './style.scss';

const Loading = ( {children, isLoading} ) => {
  return isLoading ? (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    children
  )
};

Loading.propTypes = {
  children: node,
  isLoading: bool
};

export default Loading;