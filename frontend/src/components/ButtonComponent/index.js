import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function ButtonComponent({ title, onClick }) {
  return <Button onClick={onClick}>{title}</Button>;
}

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
