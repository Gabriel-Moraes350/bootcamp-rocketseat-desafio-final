import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({ name, label, options, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.selectValue[0];

    return selectValue ? selectValue.value : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        styles={{
          control: styles => ({ ...styles, height: 45 }),
        }}
        name={name}
        id={name}
        options={options}
        aria-label={fieldName}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
