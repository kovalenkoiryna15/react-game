import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './See.scss';
import { Button } from 'react-bootstrap';

import { HERE_IS_LOSER } from '~constants';
import { missHit, countAttacks, randomPlay } from '~store/game/actions';

export default function See({
  id, num, player, value,
}) {
  const classes = `content see ${value === HERE_IS_LOSER ? 'lose' : ''}`;
  const dispatch = useDispatch();
  const enemy = +!player;
  const boardState = useSelector(({ game: { [enemy]: { rows } } }) => rows);
  const boardSize = useSelector(({ game: { size } }) => size);
  const last4Attacks = useSelector(({ game: { [player]: { attacks } } }) => attacks);
  const userBoard = useSelector(({ game: { user } }) => user);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);

  function onAttack() {
    dispatch(countAttacks(player));
    dispatch(missHit(id, num, player));
    dispatch(randomPlay(enemy, boardSize, boardState, last4Attacks));
  }

  return (
    <Button
      className={classes}
      disabled={userBoard === player || value === HERE_IS_LOSER || userBoard !== whoseTurn}
      onClick={onAttack}
    >
      {`${num}${id}`}
    </Button>
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
