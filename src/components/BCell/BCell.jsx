import * as React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import './BCell.scss';

import Ship from '../Ship';
import See from '../See';
import Notation from '../Notation';

export default function BCell({ id, num, value }) {
  return (
    num === '0' || num === '11'
      ? (
        <Col
          id={`${num}${id}`}
          value={value}
          className="border border-primary rounded square"
        >
          <Notation id={id} />
        </Col>
      ) : (
        <Col
          id={`${num}${id}`}
          value={value}
          className="border border-primary rounded square"
        >
          {
            value
              ? <Ship id={id} num={num} />
              : <See id={id} num={num} />
          }
        </Col>
      )
  );
}

BCell.propTypes = {
  id: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
};
