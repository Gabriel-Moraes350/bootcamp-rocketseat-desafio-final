import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  text-align: center;
  justify-content: center;
  background-color: #ee4e62;
  border-radius: 4px;
  height: 45px;
  align-items: center;
  align-self: stretch;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
