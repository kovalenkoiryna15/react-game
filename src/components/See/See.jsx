import * as React from 'react';

import './See.scss';

export default function See({ id, num }) {
  return (
    <div className="content see">{`${num}${id}`}</div>
  );
}
