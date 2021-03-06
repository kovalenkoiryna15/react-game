import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import BRow from '../BRow';

import Progress from '~components/Progress';

export default function Board({ player }) {
  const boardRows = useSelector(({ game }) => game[player].rows);

  return (
    <Col md={5} sm={5} xs={12}>
      <Progress player={player} key={player} />
      {
        boardRows
          ? Object.entries(boardRows).map(
            (row) => <BRow player={player} rowNum={row[0]} key={row[0]} cells={row[1]} />,
          )
          : null
      }
    </Col>
  );
}

Board.propTypes = {
  player: PropTypes.number.isRequired,
};
