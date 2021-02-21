import * as React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import './BCell.scss';

import { HERE_IS_SHIP, HERE_IS_FIRE } from '~constants';

import Ship from '../Ship';
import See from '../See';
import Notation from '../Notation';

export default function BCell({
  id, num, value, player,
}) {
  return (
    num === '0' || num === '11'
      ? (
        <Col
          id={`${num}${id}`}
          value={value}
          className="square"
        >
          <Notation id={id} />
        </Col>
      ) : (
        <Col
          id={`${num}${id}`}
          value={value}
          className="square"
        >
          {
            value === HERE_IS_SHIP || value === HERE_IS_FIRE
              ? <Ship id={id} num={num} player={player} value={value} />
              : <See id={id} num={num} player={player} value={value} />
          }
        </Col>
      )
  );
}

BCell.propTypes = {
  player: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};
