import * as React from 'react';
import PropTypes from 'prop-types';

import './Notation.scss';

export default function Notation({ id }) {
  return (
    <div className="content notation">{id}</div>
  );
}

Notation.propTypes = {
  id: PropTypes.string.isRequired,
};
