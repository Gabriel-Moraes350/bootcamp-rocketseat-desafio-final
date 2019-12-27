import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  margin: 20px 0;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const TitleText = styled.Text`
  color: #444444;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 10px 0;
`;
export const TimeText = styled.Text`
  font-size: 14px;
  color: #666666;
  text-align: right;
`;
export const ContentText = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: #666666;
  margin: 20px 0;
`;
