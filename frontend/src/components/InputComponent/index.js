import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { Input } from '@rocketseat/unform';

import { Container } from './styles';

export default function InputComponent({
  label,
  name,
  width,
  mask,
  disabled,
  ...props
}) {
  return (
    <Container width={width}>
      <label htmlFor={name}>{label}</label>
      {mask ? (
        <InputMask
          formatChars={{ '9': '[0-9]', t: '[0-9-]', '?': '[0-9 ]' }}
          maskChar={null}
          disabled={disabled}
          {...props}
          mask={mask}
        >
          {inputProps => (
            <Input disabled={disabled} id={name} name={name} {...inputProps} />
          )}
        </InputMask>
      ) : (
        <Input disabled={disabled} id={name} name={name} {...props} />
      )}
    </Container>
  );
}

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  mask: PropTypes.string,
  disabled: PropTypes.bool,
};

InputComponent.defaultProps = {
  width: '100%',
  mask: '',
  disabled: false,
};
