import * as React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button } from 'react-bootstrap';

import { setRandom } from '~store/game/actions';
import {
  PLAYER1,
  PLAYER2,
} from '~constants';

export default function Options() {
  const dispatch = useDispatch();
  const loading = useSelector(({ game: { isLoading } }) => isLoading);

  function onStart() {
    dispatch(setRandom(PLAYER1));
    dispatch(setRandom(PLAYER2));
  }

  return (
    <Col md={4} sm={12} xs={12} className="flex-grow-1">
      <h4>Options</h4>
      <Button onClick={onStart} disabled={loading}>Start</Button>
      <ul>
        <li>4 - 1 cell</li>
        <li>3 - 2 cell</li>
        <li>2 - 3 cell</li>
        <li>1 - 4 cell</li>
      </ul>
    </Col>
  );
}

// Options.propTypes = {};
