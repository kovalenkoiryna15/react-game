import * as React from 'react';
import PropTypes from 'prop-types';

import './Ship.scss';

export default function Ship({ id, num }) {
  return (
    <div className="content ship">{`${num}${id}`}</div>
  );
}

Ship.propTypes = {
  num: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
