import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { Input } from '@rocketseat/unform';

import { Container } from './styles';

export default function InputComponent({ label, name, width, mask, ...props }) {
  return (
    <Container width={width}>
      <label htmlFor={name}>{label}</label>
      {mask ? (
        <InputMask {...props} mask={mask}>
          {inputProps => <Input id={name} name={name} {...inputProps} />}
        </InputMask>
      ) : (
        <Input id={name} name={name} {...props} />
      )}
    </Container>
  );
}

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  mask: PropTypes.string,
};

InputComponent.defaultProps = {
  width: '100%',
  mask: '',
};
