/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Button from '~/components/Button';
import Background from '~/components/Background';
import HelpOrderItem from './HelpOrderItem';

import { List } from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [orders, setOrders] = useState({
    data: [],
    count: 0,
    page: 1,
    refreshing: false,
  });

  async function getOrders(page) {
    const { data } = await api.get(`/help-orders?page=${page}`);

    const { rows, count } = data;

    const newRows = page !== 1 ? [...new Set([...orders.data, ...rows])] : rows;

    if (newRows.length > 0) {
      setOrders({
        data: newRows,
        page: page + 1,
        count,
        refreshing: false,
      });
    } else {
      setOrders({
        ...orders,
        refreshing: false,
      });
    }
  }

  useEffect(() => {
    if (isFocused) {
      getOrders(1);
    }
  }, [isFocused]);

  function enterHelpOrderRequest() {
    navigation.navigate('HelpOrdersNew');
  }

  function onEndReached() {
    if (orders.data.length < orders.count) {
      getOrders(orders.page);
    }
  }

  function onRefresh() {
    getOrders(1);
  }

  function openDetails(order) {
    if (order.answerAt !== null) {
      navigation.navigate('HelpOrdersDetails', { order });
    }
  }

  return (
    <Background>
      <Button onPress={enterHelpOrderRequest}>Novo pedido de auxílio</Button>
      <List
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        data={orders.data}
        onRefresh={onRefresh}
        refreshing={orders.refreshing}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <HelpOrderItem onPress={() => openDetails(item)} order={item} />
        )}
      />
    </Background>
  );
}

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrders);
