import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import BRow from '../BRow';

export default function Board({ player }) {
  const boardRows = useSelector(({ game }) => game[player].rows);
  return (
    <Col md={4} sm={6} xs={12}>
      {
        Object.entries(boardRows).map((row) => <BRow rowNum={row[0]} key={row[0]} cells={row[1]} />)
      }
    </Col>
  );
}

Board.propTypes = {
  player: PropTypes.string.isRequired,
};
