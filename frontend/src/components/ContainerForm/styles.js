import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled(Form)`
  padding-top: 50px;
  margin: 0 auto;
  width: 80%;
  max-width: 800px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  button {
    margin-right: 10px;
  }

  section {
    padding: 20px;
    background: white;
    width: 100%;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;
