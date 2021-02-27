import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import './Progress.scss';

export default function Progress({ player }) {
  const attacksCount = useSelector(({ game: { [player]: { attacksNum } } }) => attacksNum);
  const playerName = useSelector(({ game: { [player]: { name } } }) => name);
  const playerProgress = useSelector(({ game: { [player]: { progress } } }) => progress);

  return (
    <Row>
      <Col sm={12} xs={12}>
        <h4>{playerName}</h4>
        <Row>
          <Col sm={4} xs={12}>
            <ProgressBar now={playerProgress} />
            <h5>{attacksCount}</h5>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

Progress.propTypes = {
  player: PropTypes.number.isRequired,
};
