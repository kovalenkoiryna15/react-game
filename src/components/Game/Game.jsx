import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Board from '~components/Board';

export default function Game() {
  return (
    <Container fluid="true" className="justify-content-center align-items-center">
      <Row sm={12} xs={12}>
        <Board />
        <Col sm={4} xs={12} className="flex-grow-1" />
      </Row>
    </Container>
  );
}
