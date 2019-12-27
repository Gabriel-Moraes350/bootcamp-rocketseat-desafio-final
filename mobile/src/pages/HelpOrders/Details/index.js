import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Background from '~/components/Background';

import {
  Container,
  TitleText,
  TimeText,
  ContentText,
  HeaderContainer,
} from './styles';

export default function Details({ navigation }) {
  const {
    params: { order },
  } = navigation.state;

  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(order.answerAt), new Date(), {
      locale: pt,
    });
  }, [order.answerAt]);

  return (
    <Background>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <TitleText>Pergunta</TitleText>
          <TimeText>{parsedDate}</TimeText>
        </HeaderContainer>
        <ContentText>{order.question}</ContentText>
        <TitleText>Resposta</TitleText>
        <ContentText>{order.answer}</ContentText>
      </Container>
    </Background>
  );
}

Details.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        order: PropTypes.shape({
          question: PropTypes.string,
          answer: PropTypes.string,
          answerAt: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
