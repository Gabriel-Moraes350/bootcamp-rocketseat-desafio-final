import styled from 'styled-components/native';

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  textAlignVertical: 'top',
})`
  height: 300px;
  border-radius: 4px;
  padding: 30px 10px;
  justify-content: flex-start;
  align-items: flex-start;
  background: #fff;
  margin: 20px 0;
`;
