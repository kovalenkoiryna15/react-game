import * as React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import BCell from '../BCell';
import Notation from '../Notation';

export default function BRow({ rowNum, cells }) {
  return (
    <Row xs={12} sm={12} className="flex-nowrap" noGutters="true">
      <Col className="border border-primary rounded square">
        <Notation id={rowNum} />
      </Col>
      {
        Object.entries(cells).map((cell) => <BCell key={`${rowNum}${cell[0]}`} id={cell[0]} num={rowNum} value={cell[1]} />)
      }
      <Col className="border border-primary rounded square">
        <Notation id={rowNum} />
      </Col>
    </Row>
  );
}

BRow.propTypes = {
  rowNum: PropTypes.string.isRequired,
  cells: PropTypes.shape({
    id: PropTypes.bool,
  }).isRequired,
};
