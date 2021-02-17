import * as React from 'react';
import { Col } from 'react-bootstrap';

export default function Cell({ id }) {
  return (
    <Col>
      {id}
    </Col>
  );
}
