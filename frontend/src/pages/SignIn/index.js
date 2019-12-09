import React from 'react';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import logo from '~/assets/logo.svg';
import { Form } from './styles';
import { signUp } from '~/store/modules/auth/actions';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail deve ser válido')
      .required('Necessário preencher e-mail'),
    password: Yup.string().required('Necessário preencher senha'),
  });

  const dispatch = useDispatch();

  const handleSubmit = ({ email, password }) => {
    dispatch(signUp(email, password));

    return false;
  };

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <img src={logo} alt="Logo" />
      <div>
        <label htmlFor="email">Seu e-mail</label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="exemplo@gmail.com"
        />
      </div>
      <div>
        <label htmlFor="password">Sua senha</label>
        <Input
          id="password"
          type="password"
          name="password"
          placholder="***********"
        />
      </div>

      <button type="submit">Entrar no sistema</button>
    </Form>
  );
}
