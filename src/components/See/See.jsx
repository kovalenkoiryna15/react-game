import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './See.scss';
import { Button } from 'react-bootstrap';

import { HERE_IS_LOSER, ATTACK_TIME, audioSrs } from '~constants';
import { missHit, countAttacks, randomPlay } from '~store/game/actions';

// Sound
const laser = new Audio(audioSrs.laser);

export default function See({
  id, num, player, value,
}) {
  const classes = `content see ${value === HERE_IS_LOSER ? 'lose' : ''}`;
  const dispatch = useDispatch();
  const isPlay = useSelector(({ game: { isPlaying } }) => isPlaying);
  const isCurrentGameOver = useSelector(({ game: { isGameOver } }) => isGameOver);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const userBoard = useSelector(({ game: { user } }) => user);
  const enemy = +!whoseTurn;
  const boardState = useSelector(({ game: { [whoseTurn]: { rows } } }) => rows);
  const boardSize = useSelector(({ game: { size } }) => size);
  const lastAttacks = useSelector(({ game: { [enemy]: { attacks } } }) => attacks);
  const userTurn = useSelector(({ game: { user } }) => user);
  const isAutoPlay = useSelector(({ game: { [userTurn]: { autoPlay } } }) => autoPlay);
  const isSoundOn = useSelector(({ app: { isSound } }) => isSound);
  const soundVolumeValue = useSelector(({ app: { soundVolume } }) => soundVolume);
  laser.volume = soundVolumeValue;

  function onAttack() {
    if (player !== userBoard
      && isSoundOn
      && isPlay
      && !isCurrentGameOver
    ) {
      laser.play();
    }
    dispatch(countAttacks(whoseTurn));
    dispatch(missHit(id, num, player));
    const interval = setTimeout(
      () => dispatch(randomPlay(whoseTurn, boardSize, boardState, lastAttacks)), ATTACK_TIME,
    );
    return () => clearInterval(interval);
  }

  useEffect(() => {
    if (player === userBoard
      && value === HERE_IS_LOSER
      && isSoundOn
      && isPlay
      && !isCurrentGameOver
      && whoseTurn !== userBoard
    ) {
      laser.play();
    }
  }, [
    isSoundOn,
    value,
    player,
    userBoard,
    isPlay,
    isCurrentGameOver,
    whoseTurn,
  ]);

  return (
    <Button
      className={classes}
      disabled={userTurn === player
        || value === HERE_IS_LOSER
        || userTurn !== whoseTurn
        || (isAutoPlay && userTurn === whoseTurn)}
      onClick={onAttack}
    />
  );
}

See.propTypes = {
  player: PropTypes.number.isRequired,
  num: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};
