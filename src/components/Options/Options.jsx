import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Row } from 'react-bootstrap';

import { setRandom, resetGame } from '~store/game/actions';
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
    dispatch(resetGame()); // reset active player and game progress
    dispatch(setRandom(PLAYER1));
    dispatch(setRandom(PLAYER2));
  }

  return (
    <Col lg={2} md={12} sm={12} xs={12}>
      <Row>
        <Col lg={12} md={6} sm={12} xs={12}>
          <h4>Options</h4>
          <Row>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100" onClick={onStart} disabled={loading}>New Game</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100" onClick={onStart} disabled={loading}>Auto play</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100" onClick={onStart} disabled={loading}>Auto finish</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100" onClick={onStart} disabled={loading}>Sound</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100" onClick={onStart} disabled={loading}>Records</Button>
            </Col>
          </Row>
        </Col>
        {
          playersIDs.map((player) => <Progress player={player} key={player} />)
        }
      </Row>
    </Col>
  );
}
