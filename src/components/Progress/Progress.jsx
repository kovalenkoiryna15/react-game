import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Col, ProgressBar } from 'react-bootstrap';

export default function Progress({ player }) {
  const attacksCount = useSelector(({ game: { [player]: { attacksNum } } }) => attacksNum);
  const playerName = useSelector(({ game: { [player]: { name } } }) => name);

  return (
    <Col md={12} sm={12} xs={6}>
      <h4>{playerName}</h4>
      <ProgressBar animated now={45} />
      <h5>{attacksCount}</h5>
    </Col>
  );
}

Progress.propTypes = {
  player: PropTypes.number.isRequired,
};
