import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './See.scss';
import { Button } from 'react-bootstrap';

import { HERE_IS_SEE, HERE_IS_LOSER } from '~constants';
import { missHit, countAttacks } from '~store/game/actions';

export default function See({
  id, num, player, value,
}) {
  const [classes, setClasses] = useState(['content', 'see']);
  const dispatch = useDispatch();
  const userBoard = useSelector(({ game: { user } }) => user);

  function onAttack() {
    dispatch(countAttacks(player));
    dispatch(missHit(id, num, player));
  }

  useEffect(() => {
    if (value === HERE_IS_LOSER) {
      setClasses(['content', 'see', 'lose']);
    }
    if (value === HERE_IS_SEE) {
      setClasses(['content', 'see']);
    }
  }, [value]);

  return (
    <Button
      className={classes.join(' ')}
      disabled={userBoard === player || value === HERE_IS_LOSER}
      onClick={onAttack}
    >
      {`${num}${id}`}
    </Button>
  );
}

See.propTypes = {
  player: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};
