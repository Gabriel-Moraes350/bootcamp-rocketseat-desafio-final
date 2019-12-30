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

    #react-paginate ul {
      display: inline-block;
      padding-left: 15px;
      padding-right: 15px;
    }

    #react-paginate li {
        display: inline-block;
    }

    .pagination {
      height: 36px;
      margin: 18px 0;
    }
    .pagination ul {
      display: inline-block;
      *display: inline;
      /* IE7 inline-block hack */

      *zoom: 1;
      margin-left: 0;
      margin-bottom: 0;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    .pagination li {
      display: inline;
    }
    .pagination a {
      float: left;
      padding: 0 14px;
      line-height: 34px;
      text-decoration: none;
      border: 1px solid #ddd;
      border-left-width: 0;
      cursor: pointer;
    }
    .pagination a:hover,
    .pagination .active a {
      background-color: #f5f5f5;
    }
    .pagination .active a {
      color: #999999;
      cursor: default;
    }
    .pagination .disabled span,
    .pagination .disabled a,
    .pagination .disabled a:hover {
      color: #999999;
      background-color: transparent;
      cursor: default;
    }
    .pagination li:first-child a {
      border-left-width: 1px;
      -webkit-border-radius: 3px 0 0 3px;
      -moz-border-radius: 3px 0 0 3px;
      border-radius: 3px 0 0 3px;
    }
    .pagination li:last-child a {
      -webkit-border-radius: 0 3px 3px 0;
      -moz-border-radius: 0 3px 3px 0;
      border-radius: 0 3px 3px 0;
    }
    .pagination-centered {
      text-align: center;
    }
    .pagination-right {
      text-align: right;
    }
    .pager {
      margin-left: 0;
      margin-bottom: 18px;
      list-style: none;
      text-align: center;
      *zoom: 1;
    }
    .pager:before,
    .pager:after {
      display: table;
      content: "";
    }
    .pager:after {
      clear: both;
    }
    .pager li {
      display: inline;

    }
    .pager a {
      display: inline-block;
      padding: 5px 14px;
      background-color: #fff;
      border: 1px solid #ddd;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
    }
    .pager a:hover {
      text-decoration: none;
      background-color: #f5f5f5;
    }
    .pager .next a {
      float: right;
    }
    .pager .previous a {
      float: left;
    }
    .pager .disabled a,
    .pager .disabled a:hover {
      color: #999999;
      background-color: #fff;
      cursor: default;
    }
`;
