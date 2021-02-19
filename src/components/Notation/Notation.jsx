import * as React from 'react';

import './Notation.scss';

export default function Notation({ id }) {
  return (
    <div className="content notation">{id}</div>
  );
}
