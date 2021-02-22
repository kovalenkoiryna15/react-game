import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Row } from 'react-bootstrap';

import { setRandom } from '~store/game/actions';
import {
  PLAYER1,
  PLAYER2,
} from '~constants';

import Progress from '~components/Progress';

export default function Options() {
  const dispatch = useDispatch();
  const loading = useSelector(({ game: { isLoading } }) => isLoading);
  const playersIDs = useSelector(({ game: { players } }) => players);

  function onStart() {
    // dispatch(resetGame()); // reset attacks and game progress
    dispatch(setRandom(PLAYER1));
    dispatch(setRandom(PLAYER2));
  }

  return (
    <Col md={2} sm={2} xs={12}>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4>Options</h4>
          <Button onClick={onStart} disabled={loading}>Start</Button>
        </Col>
        {
          playersIDs.map((player) => <Progress player={player} key={player} />)
        }
      </Row>
    </Col>
  );
}
