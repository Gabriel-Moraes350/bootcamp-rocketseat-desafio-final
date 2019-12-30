import React, { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Background from '~/components/Background';
import Button from '~/components/Button';
import { Input } from './styles';

export default function NewHelpOrder({ navigation }) {
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    if (question.trim() === '') {
      Alert.alert('Erro', 'Necessário preenchimento da pergunta');
      return;
    }

    try {
      await api.post(`/help-orders`, {
        question,
      });

      setQuestion('');
      Keyboard.dismiss();
      navigation.navigate('HelpOrders');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o pedido de ajuda');
    }
  }

  return (
    <Background>
      <Input
        returnKeyType="done"
        multiline
        onChangeText={text => setQuestion(text)}
        value={question}
        placeholder="Inclua seu pedido de auxílio"
      />
      <Button onPress={handleSubmit}>Enviar pedido</Button>
    </Background>
  );
}

NewHelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
