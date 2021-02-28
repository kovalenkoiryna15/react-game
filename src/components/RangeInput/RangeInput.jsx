import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './RangeInput.scss';
import { Col, Row } from 'react-bootstrap';

import * as c from '~constants';
import { resetShipNum } from '~store/game/actions';
import Ship from '~components/Ship';

const RangeInput = ({ max, ship }) => {
  const dispatch = useDispatch();
  const numShip = useSelector(({ game: { [ship]: { num } } }) => num);
  const cellNum = useSelector(({ game: { [ship]: { cells } } }) => cells);

  function onChange(e) {
    const { dataset: { type }, value } = e.target;
    dispatch(resetShipNum(type, value));
  }

  return (
    <Row md={12} sm={12} xs={12} className="range w-100">
      <Col sm={6} xs={12}>
        <label
          htmlFor="ship-range"
          className="w-100"
          style={{ display: 'inline-block' }}
        >
          <Row md={12} sm={12} xs={12}>
            <Col md={6} sm={12} xs={12}>{`Number of ${ship.split('_').join(' ').toLowerCase()}`}</Col>
            <Col md={6} sm={12} xs={12}>
              {
                [...Array(cellNum).keys()]
                  .map((cell) => (
                    <div
                      className="square"
                      style={{ width: '32px', height: '32px', display: 'inline-block' }}
                      key={cell}
                    >
                      <Ship
                        player={c.PLAYER1}
                        id="A"
                        num={String(cell)}
                        value={c.HERE_IS_SHIP}
                      />
                    </div>
                  ))
              }
            </Col>
          </Row>
        </label>
      </Col>
      <Col sm={6} xs={12}>
        <input
          type="range"
          value={numShip}
          data-type={ship}
          min="0"
          max={max}
          step="1"
          list="options"
          onInput={onChange}
          className="custom-range range__input"
          id="ship-range"
        />
        <datalist className="range__list" id="options">
          {
            [...Array(max + 1).keys()].map((value) => <option key={value} value={value} className="range__option" />)
          }
        </datalist>
      </Col>
    </Row>
  );
};

RangeInput.propTypes = {
  max: PropTypes.number.isRequired,
  ship: PropTypes.string.isRequired,
};

export default RangeInput;
