import * as React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import BCell from '../BCell';
import Notation from '../Notation';

export default function BRow({ rowNum, cells, player }) {
  return (
    <Row xs={12} sm={12} className="flex-nowrap" noGutters="true">
      <Col className="square">
        <Notation id={rowNum} />
      </Col>
      {
        Object.entries(cells).map(
          (cell) => <BCell player={player} key={`${rowNum}${cell[0]}`} id={cell[0]} num={rowNum} value={cell[1]} />,
        )
      }
      <Col className="square">
        <Notation id={rowNum} />
      </Col>
    </Row>
  );
}

BRow.propTypes = {
  player: PropTypes.number.isRequired,
  rowNum: PropTypes.string.isRequired,
  cells: PropTypes.shape({
    id: PropTypes.bool,
  }).isRequired,
};
