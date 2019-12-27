import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  CheckInItemContainer,
  CheckInItemNumber,
  CheckInItemTime,
} from './styles';

export default function CheckInItem({ item, index, total }) {
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(item.createdAt), new Date(), { locale: pt });
  }, [item.createdAt]);

  return (
    <CheckInItemContainer>
      <CheckInItemNumber>Checkin: #{total - index}</CheckInItemNumber>
      <CheckInItemTime>{parsedDate}</CheckInItemTime>
    </CheckInItemContainer>
  );
}

CheckInItem.propTypes = {
  item: PropTypes.shape({
    createdAt: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
