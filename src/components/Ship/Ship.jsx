import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Ship.scss';
import { Button } from 'react-bootstrap';

import { HERE_IS_FIRE } from '~constants';
import { getHit, countAttacks } from '~store/game/actions';

export default function Ship({
  id, num, player, value,
}) {
  const classes = `content ship ${value === HERE_IS_FIRE ? 'fired' : ''}`;
  const dispatch = useDispatch();
  const userBoard = useSelector(({ game: { user } }) => user);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);

  function onAttack() {
    dispatch(countAttacks(player));
    dispatch(getHit(id, num, player));
  }

  return (
    <Button
      className={classes}
      disabled={userBoard === player || value === HERE_IS_FIRE || userBoard !== whoseTurn}
      onClick={onAttack}
    >
      {`${num}${id}`}
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
