import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  HelpOrderItemQuestion,
  HelpOrderItemTime,
  HelpOrderItemContainer,
  HelpOrderItemHeader,
  HelpOrderItemAnswered,
} from './styles';

export default function HelpOrderItem({ order, onPress }) {
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(order.createdAt), new Date(), {
      locale: pt,
    });
  }, [order.createdAt]);
  const isAnswered = useMemo(() => order.answerAt !== null, [order.answerAt]);
  const Touchable =
    order.answerAt !== null ? TouchableOpacity : TouchableWithoutFeedback;
  return (
    <Touchable onPress={onPress}>
      <HelpOrderItemContainer>
        <HelpOrderItemHeader>
          <HelpOrderItemAnswered answered={isAnswered}>
            {isAnswered ? 'Respondido' : 'Sem resposta'}
          </HelpOrderItemAnswered>
          <HelpOrderItemTime>{parsedDate}</HelpOrderItemTime>
        </HelpOrderItemHeader>

        <HelpOrderItemQuestion>{order.question}</HelpOrderItemQuestion>
      </HelpOrderItemContainer>
    </Touchable>
  );
}

HelpOrderItem.propTypes = {
  order: PropTypes.shape({
    question: PropTypes.string,
    answerAt: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
