import * as React from 'react';
import { useEffect } from 'react';
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
  const userBoard = useSelector(({ game: { user } }) => user);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const classes = `content ship ${value === HERE_IS_FIRE ? 'fired' : ''}`;
  const colorShip = useSelector(({ app: { shipColor } }) => shipColor);
  const isAutoPlay = useSelector(({ game: { [userBoard]: { autoPlay } } }) => autoPlay);
  const fired = useSelector(({ game: { [player]: { firedShips } } }) => firedShips);

  function onAttack() {
    // Sound
    const sound1 = new Howl({
      src: [laser],
    });
    sound1.play();
    const sound2 = new Howl({
      src: [shipExplosion],
    });
    sound2.play();
    dispatch(countAttacks(whoseTurn));
    dispatch(countFired(player));
    dispatch(resetLife({ player, fired }));
    dispatch(getHit(id, num, player));
  }

  useEffect(() => {
    if (player === userBoard && value === HERE_IS_FIRE) {
      // Sound
      const sound1 = new Howl({
        src: [laser],
      });
      sound1.play();
      const sound2 = new Howl({
        src: [shipExplosion],
      });
      sound2.play();
    }
  }, [value, player, userBoard, fired, dispatch]);

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
