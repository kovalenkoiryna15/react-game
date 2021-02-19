import * as React from 'react';

import './Ship.scss';

export default function Ship({ id, num }) {
  return (
    <div className="content ship">{`${num}${id}`}</div>
  );
}
