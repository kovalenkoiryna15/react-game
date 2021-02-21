import * as React from 'react';
import PropTypes from 'prop-types';

import './See.scss';

export default function See({ id, num }) {
  return (
    <div className="content see">{`${num}${id}`}</div>
  );
}

See.propTypes = {
  num: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
