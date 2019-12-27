import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TabBarIcon({ tintColor, name }) {
  return <Icon name={name} size={20} color={tintColor} />;
}

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
