import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { useField } from '@rocketseat/unform';
import { Container } from '../InputComponent/styles';

export default function CurrencyCustomInput({
  label,
  name,
  width,
  disabled,
  ...props
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(value) {
    return value === 0 ? '' : value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container width={width}>
      <label htmlFor={name}>{label}</label>
      <CurrencyInput
        disabled={disabled}
        id={name}
        name={name}
        ref={ref}
        {...props}
        prefix="R$"
        decimalSeparator=","
        thousandSeparator="."
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

CurrencyCustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

CurrencyCustomInput.defaultProps = {
  width: '100%',
  disabled: false,
};
