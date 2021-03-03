import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './ColorSelect.scss';

import { selectShipColor } from '~store/app/actions';

const colourOptions = [
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#41E969' },
];

const Circle = (color) => ({
  alignItems: 'center',
  display: 'flex',
  color,

  '::before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? data.color
      : null,
    color: isSelected
      ? 'black'
      : data.color,
    cursor: 'pointer',

    '::active': {
      ...styles['::active'],
    },
  }),
  input: (styles) => ({ ...styles, ...Circle() }),
  placeholder: (styles) => ({ ...styles, ...Circle() }),
  singleValue: (styles, { data }) => ({ ...styles, ...Circle(data.color) }),
};

const ColorSelect = () => {
  const dispatch = useDispatch();
  const colorShip = useSelector(({ app: { shipColor } }) => shipColor);

  function onColorSelect(value) {
    const { color } = value;
    dispatch(selectShipColor(color));
  }

  return (
    <Select
      defaultValue={colourOptions[2]}
      label="Color select"
      className="basic-single w-100"
      classNamePrefix="select"
      options={colourOptions}
      styles={colourStyles}
      isSearchable={false}
      onChange={(value) => onColorSelect(value)}
      value={colourOptions.find((option) => option.color === colorShip)}
    />
  );
};

export default ColorSelect;
