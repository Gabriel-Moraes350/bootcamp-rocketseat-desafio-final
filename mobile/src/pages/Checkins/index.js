/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import api from '~/services/api';
import Button from '~/components/Button';
import CheckInItem from './CheckInItem';
import Background from '~/components/Background';
import { List } from './styles';
import TabBarIcon from '~/components/TabBarIcon';

export default function Checkins() {
  const [checkIns, setCheckins] = useState({
    data: [],
    page: 1,
    count: 0,
    refreshing: false,
    btnLoading: false,
  });
  async function getCheckins(page) {
    try {
      const { data } = await api.get(`/checkins?page=${page}`);
      const { rows, count } = data;

      const newRows =
        page !== 1 ? [...new Set([...checkIns.data, ...rows])] : rows;

      if (newRows.length > 0) {
        setCheckins({
          btnLoading: false,
          data: newRows,
          page: page + 1,
          count,
          refreshing: false,
        });
      } else {
        setCheckins({
          ...checkIns,
          refreshing: false,
        });
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível buscar checkins');
    }
  }

  useEffect(() => {
    getCheckins(1);
  }, []);

  async function doCheckIn() {
    setCheckins({ ...checkIns, btnLoading: true });
    await api.post(`/checkins`);
    setCheckins({ ...checkIns, btnLoading: false });
    getCheckins(1);
  }

  function onRefresh() {
    getCheckins(1);
  }

  function onEndReached() {
    if (checkIns.data.length < checkIns.count) {
      getCheckins(checkIns.page);
    }
  }

  return (
    <Background>
      <Button loading={checkIns.btnLoading} onPress={doCheckIn}>
        Novo check-in
      </Button>
      <List
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        data={checkIns.data}
        onRefresh={onRefresh}
        refreshing={checkIns.refreshing}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <CheckInItem item={item} index={index} total={checkIns.count} />
        )}
      />
    </Background>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: props => <TabBarIcon {...props} name="check" />,
};
