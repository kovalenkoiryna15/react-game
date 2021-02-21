import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Board from '~components/Board';
import Options from '~components/Options';

import { PLAYER1, PLAYER2 } from '~constants';

export default function Game() {
  const loading = useSelector(({ game: { isLoading } }) => isLoading);
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row sm={12} xs={12} className="w-100">
        {
          loading
            ? (
              <div>Loading...</div>
            )
            : (
              <>
                <Board player={PLAYER1} />
                <Board player={PLAYER2} />
              </>
            )
        }
        <Options />
      </Row>
    </Container>
  );
}
