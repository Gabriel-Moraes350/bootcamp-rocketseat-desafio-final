import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

export default function ReactAsyncSelect({ name, label, callback, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.select.state.selectValue[0];

    return selectValue ? selectValue.value : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        styles={{
          control: styles => ({ ...styles, height: 45 }),
        }}
        name={name}
        id={name}
        loadOptions={callback}
        aria-label={fieldName}
        ref={ref}
        cacheOptions
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
