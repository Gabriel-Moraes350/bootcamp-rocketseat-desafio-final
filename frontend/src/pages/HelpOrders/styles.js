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
