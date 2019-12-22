import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 50px;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }

  button {
    margin-right: 10px;
  }

  section {
    padding: 20px;
    background: white;
    width: 100%;
    border-radius: 4px;
  }

  table {
    text-align: left;
    border-collapse: collapse;
    width: 100%;

    th {
      font-size: 16px;
      font-weight: bold;
      color: #444444;
      padding: 20px;
      text-transform: uppercase;
    }

    td {
      padding: 20px;
      font-weight: normal;
      font-size: 16px;
      color: #666666;

      button {
        font-size: 15px;
        color: #4d85ee;
        background: transparent;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #ccc;
      }
      tr:last-child {
        border-bottom: 0;
      }
    }
  }
`;

export const ModalForm = styled.div`
  background: #ffffff;
  border-radius: 4px;
  width: 450px;
  max-width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  span {
    color: red;
    padding: 4px;
  }

  h4 {
    margin: 10px 0;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    width: 100%;
  }

  p {
    font-size: 16px;
    font-weight: normal;
    color: #666666;
    margin-bottom: 10px;
    width: 100%;
  }

  textarea {
    min-height: 127px;
    margin-bottom: 5px;
    padding: 10px;
    width: 100%;
    resize: none;
    border-radius: 4px;
  }

  button {
    height: 45px;
    width: 100%;
    text-align: center;
    background: #ee4d64;
    color: white;
    border-radius: 4px;
    margin: 20px 0;
  }
`;
