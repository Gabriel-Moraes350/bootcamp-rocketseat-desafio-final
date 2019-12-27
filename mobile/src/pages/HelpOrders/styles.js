import styled from 'styled-components/native';

export const List = styled.FlatList`
  flex: 1;
  margin-top: 15px;
`;

export const HelpOrderItemContainer = styled.View`
  height: 150px;
  background: #fff;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #dddddd;
  padding: 20px;
`;

export const HelpOrderItemQuestion = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-weight: normal;
  line-height: 26px;
  margin-top: 15px;
  font-size: 14px;
  color: #666666;
  flex: 1;
`;
export const HelpOrderItemAnswered = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
`;

export const HelpOrderItemTime = styled.Text`
  font-weight: normal;
  font-size: 14px;
  color: #666666;
  flex: 1;
  text-align: right;
`;

export const HelpOrderItemHeader = styled.View`
  flex-direction: row;
  padding-left: 20px;
  justify-content: space-between;
`;
