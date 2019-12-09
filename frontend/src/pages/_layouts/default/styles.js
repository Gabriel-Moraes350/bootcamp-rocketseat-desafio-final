import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background-color: #f2f2f2;
  min-height: 100%;
`;
export const Header = styled.header`
  height: 64px;
  padding: 5px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  .header__menu {
    display: flex;
    justify-content: center;
    align-items: center;

    .header__menu__items {
      margin-left: 20px;
      padding-left: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      border-left: 1px solid #ccc;
      height: 100%;
      align-items: center;
    }

    a.active {
      color: #444444;
    }

    a {
      font-size: 15px;
      text-transform: uppercase;
      font-weight: bold;
      padding: 0 10px;
      cursor: pointer;
      color: #999999;
    }

    a:not(.active):hover {
      color: ${darken(0.2, '#999999')};
    }
  }
  img {
    width: 135px;
    height: 24px;
    margin: 0 20px;
  }

  .header__profile {
    justify-self: flex-end;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      font-size: 14px;
      font-weight: bold;
      color: #666666;
      text-align: left;
    }

    button {
      font-size: 14px;
      font-weight: normal;
      text-align: right;
      border: 0;
      outline: 0;
      background: transparent;
      color: #DE3B3B;
    }
    }
  }
`;
