import * as React from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Board from '~components/Board';
import Menu from '~components/Menu';
import Footer from '~components/Footer';
import FullScreen from '~components/FullScreen';

import getDateTime from '~utils/getDateTime';

import {
  HERE_IS_FIRE, ATTACK_TIME, HERE_IS_LOSER,
} from '~constants';
import {
  randomPlay, writeLocal, gameOver, saveToRecords, resetAutoPlay,
} from '~store/game/actions';
import { toggleFinishModal } from '~store/app/actions';

export default function Game() {
  const dispatch = useDispatch();
  const userTurn = useSelector(({ game: { user } }) => user);
  const userRecords = useSelector(({ game: { records } }) => records);
  const userAttacks = useSelector(({ game: { [userTurn]: { attacksNum } } }) => attacksNum);
  const isCurrentGameOver = useSelector(({ game: { isGameOver } }) => isGameOver);
  const gameStorageKey = useSelector(({ game: { storageKey } }) => storageKey);
  const currentBgImageUrl = useSelector(({ app: { bgImageUrl } }) => bgImageUrl);
  const playersIDs = useSelector(({ game: { players } }) => players);
  const loading = useSelector(({ app: { isLoading } }) => isLoading);
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
  const enemyFired = useSelector(({ game: { [enemy]: { firedShips } } }) => firedShips);
  const actualCellShipCount = useSelector(({ game: { actualShipNum } }) => actualShipNum);
  const isPlay = useSelector(({ game: { isPlaying } }) => isPlaying);
  const fired = useSelector(({ game: { [enemy]: { firedShips } } }) => firedShips);
  const isAutoPlayStarted = useSelector(({ game: { isAutoPlayOn } }) => isAutoPlayOn);

  useEffect(() => {
    // SAVE TO LOCAL STORAGE GAME STATE
    dispatch(
      writeLocal({
        isGameOver: isCurrentGameOver,
        size: boardSize,
        activePlayer: whoseTurn,
        records: userRecords,
        actualShipNum: actualCellShipCount,
      },
      gameStorageKey),
    );
    // SAVE TO LOCAL STORAGE PLAYERS STATE
    playersIDs.forEach((player) => {
      if (player === whoseTurn) {
        dispatch(writeLocal(whoseTurnState, player));
      }
      if (player === enemy) {
        dispatch(writeLocal(enemyState, player));
      }
    });
    // CHECK IS GAME OVER
    // CONTINUE AUTOPLAY
    if (isPlay && actualCellShipCount > enemyFired) {
      if ((isAutoPlay && lastWhoseTurnAttackV === HERE_IS_FIRE)
        || (isAutoPlay && lastEnemyAttackV === HERE_IS_LOSER)) {
        const interval = setTimeout(
          () => dispatch(randomPlay(enemy, boardSize, enemyBoardState, lastAttacks)), ATTACK_TIME,
        );
        return () => clearInterval(interval);
      }
    }
    // GAME IS OVER
    if (isPlay && enemyFired && actualCellShipCount === enemyFired) {
      dispatch(gameOver());
      if (userTurn === whoseTurn && userAttacks) {
        const { date, time } = getDateTime();
        dispatch(saveToRecords({ userAttacks, date, time }));
      }
    }
    // TOGGLE FINISH MODAL
    if (isPlay && isCurrentGameOver) {
      dispatch(toggleFinishModal());
    }
    // TOGGLE FINISH MODAL
    if (isPlay && isCurrentGameOver && isAutoPlayStarted) {
      dispatch(resetAutoPlay());
    }
    return undefined;
  }, [
    fired,
    isPlay,
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
    enemyFired,
    actualCellShipCount,
    isCurrentGameOver,
    userRecords,
    userTurn,
    userAttacks,
    dispatch,
    isAutoPlayStarted,
  ]);

  return (
    <FullScreen>
      <Container
        fluid
        className="d-flex flex-column justify-content-between align-items-center pt-1"
        style={{
          minHeight: '100vh',
          background: `center / cover no-repeat url(${currentBgImageUrl})`,
          overflow: 'hidden',
        }}
      >
        <Row sm={12} xs={12} className="w-100 px-4">
          <Menu />
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
    </FullScreen>
  );
}
