import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: ${props => (props.width ? props.width : '100%')};
  label {
    color: #444444;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
  }

  input {
    height: 45px;
    width: 100%;
    border-radius: 4px;
    outline: 0;
    padding-left: 15px;
    border: 1px solid #dddddd;
  }
  span {
    padding: 4px;
    color: red;
  }
`;
