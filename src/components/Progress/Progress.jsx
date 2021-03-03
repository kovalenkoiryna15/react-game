import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import './Progress.scss';

export default function Progress({ player }) {
  const attacksCount = useSelector(({ game: { [player]: { attacksNum } } }) => attacksNum);
  const playerName = useSelector(({ game: { [player]: { name } } }) => name);
  const playerProgress = useSelector(({ game: { [player]: { progress } } }) => progress);
  const firedShipsNum = useSelector(({ game: { [player]: { firedShips } } }) => firedShips);

  return (
    <Row>
      <Col sm={12} xs={12}>
        <h4>{playerName}</h4>
        <Row>
          <Col sm={6} xs={12}>
            {
              playerProgress ? <ProgressBar now={playerProgress} /> : <ProgressBar now={0} />
            }
            {
              attacksCount
                ? <span className="px-1">{`Attacks: ${attacksCount}`}</span>
                : <span className="px-1">Attacks: 0</span>
            }
            {
              firedShipsNum
                ? <span className="px-1">{`Fired: ${firedShipsNum}`}</span>
                : <span className="px-1">Fired: 0</span>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

Progress.propTypes = {
  player: PropTypes.number.isRequired,
};
