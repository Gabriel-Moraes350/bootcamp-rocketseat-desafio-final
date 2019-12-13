import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function ButtonComponent({ title, onClick, color }) {
  return (
    <Button color={color} onClick={onClick}>
      {title}
    </Button>
  );
}

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

ButtonComponent.defaultProps = {
  onClick: () => {},
  color: '#ee4d64',
};
