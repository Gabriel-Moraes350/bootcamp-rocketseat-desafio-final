import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import h_logo from '~/assets/horizontal-logo.png';
import { Wrapper, Header } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import history from '~/services/history';

export default function DefaultWrapper({ children }) {
  const dispatch = useDispatch();
  const headItems = [
    {
      title: 'Alunos',
      url: '/students',
      active: false,
    },
    {
      title: 'Planos',
      url: '/plans',
      active: false,
    },
    {
      title: 'Matriculas',
      url: '/registrations',
      active: false,
    },
    {
      title: 'Pedidos de auxilio',
      url: '/help-orders',
      active: false,
    },
  ];

  const [menuItems, setMenuItems] = useState(headItems);

  useEffect(() => {
    const lastPartUrl = window.location.pathname.split('/').pop();
    const result = headItems.map(item => {
      if (item.url === `/${lastPartUrl}`) {
        item.active = true;
      }

      return item;
    });

    setMenuItems(result);
  }, [headItems]);

  const handleMenuClick = item => {
    const newMenuItems = menuItems.map(i => {
      if (i.url !== item.url) {
        i.active = false;
      } else {
        i.active = true;
      }

      return i;
    });

    setMenuItems(newMenuItems);
  };

  const handleLogout = () => {
    dispatch(signOut());
    history.push('/');
  };

  return (
    <>
      <Header>
        <div className="header__menu">
          <img src={h_logo} alt="Logo horizontal" />

          <div className="header__menu__items">
            {menuItems.map(item => {
              return (
                <Link
                  className={item.active ? 'active' : ''}
                  key={item.url}
                  to={item.url}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="header__profile">
          <p>Gabriel Moraes</p>
          <button type="button" onClick={handleLogout}>
            Sair do sistema
          </button>
        </div>
      </Header>
      <Wrapper>{children}</Wrapper>
    </>
  );
}

DefaultWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
