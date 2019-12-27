import React from 'react';
import logo from '~/assets/horizontal-logo.png';

import { Logo } from './styles';

export default function Header() {
  return <Logo resizeMode="contain" source={logo} />;
}
