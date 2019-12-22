import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, label, selected, onChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      parseValue: parseSelectValue(ref.current),
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={onChange}
        ref={ref}
        dateFormat="dd/MM/yyyy"
        className="datepicker-input"
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
