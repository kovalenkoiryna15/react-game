import * as React from 'react';
import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Ship.scss';
import { Button } from 'react-bootstrap';

// Sound
import { Howl } from 'howler';
import shipExplosion from '~audio/ship-explosion.wav';
import laser from '~audio/laser.mp3';

import { HERE_IS_FIRE } from '~constants';
import {
  getHit, countAttacks, countFired, resetLife,
} from '~store/game/actions';

import ShipSVG from './svg';

export default function Ship({
  id, num, player, value,
}) {
  const dispatch = useDispatch();
  const isPlay = useSelector(({ game: { isPlaying } }) => isPlaying);
  const userBoard = useSelector(({ game: { user } }) => user);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const classes = `content ship ${value === HERE_IS_FIRE ? 'fired' : ''}`;
  const colorShip = useSelector(({ app: { shipColor } }) => shipColor);
  const isAutoPlay = useSelector(({ game: { [userBoard]: { autoPlay } } }) => autoPlay);
  const fired = useSelector(({ game: { [player]: { firedShips } } }) => firedShips);
  const isGameStarted = useSelector(({ game: { isPlaying } }) => isPlaying);
  const isSoundOn = useSelector(({ app: { isSound } }) => isSound);
  const userTurn = useSelector(({ game: { user } }) => user);
  const soundLaser = useMemo(() => new Howl({
    src: [laser],
  }), []);
  const soundExplosion = useMemo(() => new Howl({
    src: [shipExplosion],
  }), []);

  const soundCall = useCallback(
    () => {
      if (player === userBoard
        && value === HERE_IS_FIRE
        && isSoundOn
        && isPlay
        && isGameStarted
        && userTurn !== whoseTurn
      ) {
        soundLaser.play();
        soundExplosion.play();
      }
    }, [
      isGameStarted,
      isSoundOn,
      value,
      player,
      userBoard,
      userTurn,
      whoseTurn,
      soundLaser,
      soundExplosion,
      isPlay,
    ],
  );

  function onAttack() {
    if (player !== userBoard
      && value === HERE_IS_FIRE
      && isSoundOn
      && isPlay
      && isGameStarted
    ) {
      soundLaser.play();
      soundExplosion.play();
    }
    dispatch(countAttacks(whoseTurn));
    dispatch(countFired(player));
    dispatch(resetLife({ player, fired }));
    dispatch(getHit(id, num, player));
  }

  useEffect(() => soundCall(), [soundCall]);

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
