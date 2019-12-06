import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';

export default function DefaultWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

DefaultWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
