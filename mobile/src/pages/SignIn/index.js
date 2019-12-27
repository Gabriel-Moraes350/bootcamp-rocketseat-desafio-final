import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';
import { signUp } from '~/store/modules/auth/actions';
import Button from '~/components/Button';

import { Container, Logo, Input } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [idValue, setIdValue] = useState('');
  const handleSubmit = () => {
    dispatch(signUp(idValue));
    Keyboard.dismiss();
    setIdValue('');
  };

  return (
    <Container>
      <Logo />
      <Input
        placeholder="Informe seu ID de cadastro"
        returnKeyType="send"
        autoCapitalize="none"
        keyboardType="numeric"
        autoCorrect={false}
        value={idValue}
        onChangeText={text => setIdValue(text)}
        onSubmitEditing={handleSubmit}
      />
      <Button onPress={handleSubmit}>Entrar no sistema</Button>
    </Container>
  );
}
