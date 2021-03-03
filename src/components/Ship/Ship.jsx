import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Ship.scss';
import { Button } from 'react-bootstrap';

import { HERE_IS_FIRE, audioSrs } from '~constants';
import {
  getHit, countAttacks, countFired, resetLife,
} from '~store/game/actions';

import ShipSVG from './svg';

// Sound
const laser = new Audio(audioSrs.laser);
const explosion = new Audio(audioSrs.shipExplosion);

export default function Ship({
  id, num, player, value,
}) {
  const dispatch = useDispatch();
  const isPlay = useSelector(({ game: { isPlaying } }) => isPlaying);
  const isCurrentGameOver = useSelector(({ game: { isGameOver } }) => isGameOver);
  const userBoard = useSelector(({ game: { user } }) => user);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const classes = `content ship ${value === HERE_IS_FIRE ? 'fired' : ''}`;
  const colorShip = useSelector(({ app: { shipColor } }) => shipColor);
  const isAutoPlay = useSelector(({ game: { [userBoard]: { autoPlay } } }) => autoPlay);
  const fired = useSelector(({ game: { [player]: { firedShips } } }) => firedShips);
  const isSoundOn = useSelector(({ app: { isSound } }) => isSound);
  const soundVolumeValue = useSelector(({ app: { soundVolume } }) => soundVolume);
  laser.volume = soundVolumeValue;
  explosion.volume = soundVolumeValue;

  function onAttack() {
    if (player !== userBoard
      && isSoundOn
      && isPlay
      && !isCurrentGameOver
    ) {
      laser.play();
      explosion.play();
    }
    dispatch(countAttacks(whoseTurn));
    dispatch(countFired(player));
    dispatch(resetLife({ player, fired }));
    dispatch(getHit(id, num, player));
  }

  useEffect(() => {
    if (player === userBoard
      && value === HERE_IS_FIRE
      && isSoundOn
      && isPlay
      && !isCurrentGameOver
      && whoseTurn !== userBoard
    ) {
      laser.play();
      explosion.play();
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
      disabled={userBoard === player
        || value === HERE_IS_FIRE
        || userBoard !== whoseTurn
        || (isAutoPlay && userBoard === whoseTurn)}
      onClick={onAttack}
    >
      <ShipSVG userBoard={userBoard} player={player} value={value} color={colorShip} />
    </Button>
  );
}

Ship.propTypes = {
  player: PropTypes.number.isRequired,
  num: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};
