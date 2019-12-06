import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';

export default function AuthWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

AuthWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
