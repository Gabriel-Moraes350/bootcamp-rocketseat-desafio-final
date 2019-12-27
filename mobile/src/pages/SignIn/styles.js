import styled from 'styled-components/native';
import { Image } from 'react-native';
import logo from '~/assets/logo-signin.png';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const Logo = styled(Image).attrs({
  source: logo,
})`
  height: 80px;
  width: 123px;
  margin-bottom: 30px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  height: 45px;
  border-radius: 4px;
  align-self: stretch;
  margin-bottom: 10px;
  border: 1px solid #dddddd;
`;
