import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.min.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');


    *{
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
    }

    *:focus{
      outline:0;
    }

    html, body, #root{
      height: 100%;
    }

    body{
      -webkit-font-smoothing: antialiased;
    }

    body, input, button{
      font: 14px 'Roboto', sans-serif;
    }

    a{
      text-decoration: none;
    }

    ul{
      list-style: none;
    }

    button{
      cursor: pointer;
    }

    input, button{
      border: 0;
      outline: 0;
    }

    h1{
      font-style: 'Roboto', sans-serif;
    }
`;
