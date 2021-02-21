import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Ship.scss';
import { Button } from 'react-bootstrap';

import { HERE_IS_FIRE, HERE_IS_SHIP } from '~constants';
import { getHit, countAttacks } from '~store/game/actions';

export default function Ship({
  id, num, player, value,
}) {
  const [classes, setClasses] = useState(['content', 'ship']);
  const dispatch = useDispatch();
  const userBoard = useSelector(({ game: { user } }) => user);

  function onAttack() {
    dispatch(countAttacks(player));
    dispatch(getHit(id, num, player));
  }

  useEffect(() => {
    if (value === HERE_IS_FIRE) {
      setClasses(['content', 'ship', 'fired']);
    }
    if (value === HERE_IS_SHIP) {
      setClasses(['content', 'ship']);
    }
  }, [value]);

  return (
    <Button
      className={classes.join(' ')}
      disabled={userBoard === player || value === HERE_IS_FIRE}
      onClick={onAttack}
    >
      {`${num}${id}`}
    </Button>
  );
}

Ship.propTypes = {
  player: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};
