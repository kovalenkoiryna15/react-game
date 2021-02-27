import * as React from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Board from '~components/Board';
import Options from '~components/Options';
import Footer from '~components/Footer';

import {
  HERE_IS_FIRE, ATTACK_TIME, HERE_IS_LOSER,
} from '~constants';
import { randomPlay, writeLocal } from '~store/game/actions';

import bg1 from '~images/wp1814937.jpg';

export default function Game() {
  const dispatch = useDispatch();
  const gameStorageKey = useSelector(({ game: { storageKey } }) => storageKey);
  const playersIDs = useSelector(({ game: { players } }) => players);
  const loading = useSelector(({ game: { isLoading } }) => isLoading);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const enemy = +!whoseTurn;
  const enemyBoardState = useSelector(({ game: { [enemy]: { rows } } }) => rows);
  const enemyState = useSelector(({ game: { [enemy]: state } }) => state);
  const whoseTurnBoardState = useSelector(({ game: { [whoseTurn]: { rows } } }) => rows);
  const whoseTurnState = useSelector(({ game: { [whoseTurn]: state } }) => state);
  const boardSize = useSelector(({ game: { size } }) => size);
  const lastAttacks = useSelector(({ game: { [whoseTurn]: { attacks } } }) => attacks);
  const isAutoPlay = useSelector(({ game: { [whoseTurn]: { autoPlay } } }) => autoPlay);
  const lastWhoseTurnAttackV = useSelector(
    ({ game: { [whoseTurn]: { lastAttackValue } } }) => lastAttackValue,
  );
  const lastEnemyAttackV = useSelector(
    ({ game: { [enemy]: { lastAttackValue } } }) => lastAttackValue,
  );

  useEffect(() => {
    dispatch(writeLocal({ size: boardSize, activePlayer: whoseTurn }, gameStorageKey));
    playersIDs.forEach((player) => {
      if (player === whoseTurn) {
        dispatch(writeLocal(whoseTurnState, player));
      }
      if (player === enemy) {
        dispatch(writeLocal(enemyState, player));
      }
    });
    if ((isAutoPlay && lastWhoseTurnAttackV === HERE_IS_FIRE)
        || (isAutoPlay && lastEnemyAttackV === HERE_IS_LOSER)) {
      const interval = setTimeout(
        () => dispatch(randomPlay(enemy, boardSize, enemyBoardState, lastAttacks)), ATTACK_TIME,
      );
      return () => clearInterval(interval);
    }
    return undefined;
  }, [
    playersIDs,
    isAutoPlay,
    lastWhoseTurnAttackV,
    lastEnemyAttackV,
    boardSize,
    enemyBoardState,
    enemyState,
    lastAttacks,
    enemy,
    whoseTurn,
    whoseTurnBoardState,
    whoseTurnState,
    gameStorageKey,
    dispatch,
  ]);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: `url(${bg1})`,
      }}
    >
      <Row sm={12} xs={12} className="w-100">
        <Options />
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
      </Row>
      <Footer />
    </Container>
  );
}
