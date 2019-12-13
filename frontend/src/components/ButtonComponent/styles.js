import styled from 'styled-components';

export const Button = styled.button`
  width: 142px;
  height: 36px;
  color: white;
  background-color: ${props => props.color};
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  line-height: 14px;
  padding-right: 20px;
  text-transform: uppercase;
`;
