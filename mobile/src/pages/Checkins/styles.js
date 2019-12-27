import styled from 'styled-components/native';

export const List = styled.FlatList`
  flex: 1;
  margin-top: 15px;
`;

export const CheckInItemContainer = styled.View`
  height: 46px;
  background: #fff;
  margin: 10px 0;
  flex-direction: row;
  border-radius: 4px;
  justify-content: space-between;
  border: 1px solid #dddddd;
  padding: 10px;
`;
export const CheckInItemNumber = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444444;
`;

export const CheckInItemTime = styled.Text`
  font-weight: normal;
  font-size: 14px;
  color: #666666;
`;
