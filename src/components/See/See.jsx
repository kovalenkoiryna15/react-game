import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './See.scss';
import { Button } from 'react-bootstrap';

import { HERE_IS_LOSER, ATTACK_TIME } from '~constants';
import { missHit, countAttacks, randomPlay } from '~store/game/actions';

export default function See({
  id, num, player, value,
}) {
  const classes = `content see ${value === HERE_IS_LOSER ? 'lose' : ''}`;
  const dispatch = useDispatch();
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const enemy = +!whoseTurn;
  const boardState = useSelector(({ game: { [whoseTurn]: { rows } } }) => rows);
  const boardSize = useSelector(({ game: { size } }) => size);
  const lastAttacks = useSelector(({ game: { [enemy]: { attacks } } }) => attacks);
  const userTurn = useSelector(({ game: { user } }) => user);
  const isAutoPlay = useSelector(({ game: { [userTurn]: { autoPlay } } }) => autoPlay);

  function onAttack() {
    dispatch(countAttacks(whoseTurn));
    dispatch(missHit(id, num, player));
    const interval = setTimeout(
      () => dispatch(randomPlay(whoseTurn, boardSize, boardState, lastAttacks)), ATTACK_TIME,
    );
    return () => clearInterval(interval);
  }

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
