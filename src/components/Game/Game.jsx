import * as React from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Board from '~components/Board';
import Options from '~components/Options';

import { HERE_IS_FIRE, ATTACK_TIME } from '~constants';
import { randomPlay } from '~store/game/actions';

export default function Game() {
  const dispatch = useDispatch();
  const playersIDs = useSelector(({ game: { players } }) => players);
  const loading = useSelector(({ game: { isLoading } }) => isLoading);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const enemy = +!whoseTurn;
  const boardState = useSelector(({ game: { [enemy]: { rows } } }) => rows);
  const boardSize = useSelector(({ game: { size } }) => size);
  const lastAttacks = useSelector(({ game: { [whoseTurn]: { attacks } } }) => attacks);
  const isAutoPlay = useSelector(({ game: { [whoseTurn]: { autoPlay } } }) => autoPlay);
  const lastAttackValue = useSelector(
    ({ game: { [whoseTurn]: { autoPlayLastAttackValue } } }) => autoPlayLastAttackValue,
  );

  useEffect(() => {
    let interval;
    if (isAutoPlay && lastAttackValue === HERE_IS_FIRE) {
      interval = setTimeout(
        () => dispatch(randomPlay(enemy, boardSize, boardState, lastAttacks)), ATTACK_TIME,
      );
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, lastAttackValue, boardSize, boardState, lastAttacks, enemy, dispatch]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Row sm={12} xs={12} className="w-100">
        {
          loading
            ? (
              <div>Loading...</div>
            )
            : (
              <>
                {
                  playersIDs.map((player) => <Board player={player} key={player} />)
                }
              </>
            )
        }
        <Options />
      </Row>
    </Container>
  );
}
