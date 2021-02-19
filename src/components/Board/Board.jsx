import * as React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import BRow from '../BRow';

export default function Board() {
  const boardRows = useSelector(({ game: { rows } }) => rows);
  return (
    <Col sm={4} xs={12}>
      {
        Object.entries(boardRows).map((row) => <BRow rowNum={row[0]} key={row[0]} cells={row[1]} />)
      }
    </Col>
  );
}
