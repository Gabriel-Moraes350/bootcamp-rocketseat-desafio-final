import styled from 'styled-components';
import { darken } from 'polished';
import { Form as FormComponent } from '@rocketseat/unform';

export const Form = styled(FormComponent)`
  display: flex;
  width: 360px;
  max-width: 100%;
  height: 448px;
  background: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;

  img {
    height: 100px;
    width: 153px;
    margin: 10px 0;
    justify-self: flex-start;
  }

  div {
    padding: 10px 30px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;

    span {
      color: red;
    }

    label {
      width: 100%;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: bold;
    }

    input {
      width: 100%;
      height: 45px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      outline: 0;
      padding-left: 10px;
    }
  }

  button {
    background: #ee4d64;
    color: #fff;
    border-radius: 4px;
    font-size: 16px;
    width: 300px;
    height: 45px;
    margin-top: 10px;
    border: 0;

    &:hover {
      background: ${darken(0.08, '#ee4d64')};
    }
  }
`;
