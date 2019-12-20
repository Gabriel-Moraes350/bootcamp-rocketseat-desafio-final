import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';

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

    .datepicker-input{
      height: 45px;
      width: 100%;
      border-radius: 4px;
      outline: 0;
      padding-left: 15px;
      border: 1px solid #dddddd;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width:100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }

    .modal-main {
      position:fixed;
      background: white;
      height: auto;
      top:50%;
      left:50%;
      border-radius: 4px;
      transform: translate(-50%,-50%);
    }

    .display-block {
      display: block;
    }

    .display-none {
      display: none;
    }
`;
