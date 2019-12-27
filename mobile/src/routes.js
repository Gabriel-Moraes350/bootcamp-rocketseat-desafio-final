import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Header from '~/components/Header';
import SignIn from '~/pages/SignIn';
import Checkins from '~/pages/Checkins';
import HelpOrders from '~/pages/HelpOrders';
import HelpOrdersNew from '~/pages/HelpOrders/New';
import HelpOrdersDetails from '~/pages/HelpOrders/Details';
import LogoutButton from './components/LogoutButton';
import TabBarIcon from './components/TabBarIcon';

export default (signedIn = false) => {
  const tabBarOptions = {
    style: {
      height: 70,
    },
    labelStyle: {
      fontSize: 14,
      marginBottom: 15,
    },
    activeTintColor: '#EE4E62',
    inactiveTintColor: '#999999',
  };

  const defaultNavigationOptions = {
    headerTitleContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      right: 0,
    },
    headerStyle: {
      height: 64,
    },
    headerTitle: props => {
      return <Header {...props} />;
    },
    headerBackTitleVisible: false,
    headerRight: props => {
      return <LogoutButton {...props} />;
    },
    headerRightContainerStyle: {
      right: 20,
    },
  };

  return createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        Main: createStackNavigator(
          {
            Main: createBottomTabNavigator(
              {
                Checkins,
                HelpOrders: {
                  screen: createStackNavigator(
                    {
                      HelpOrders,
                      HelpOrdersNew,
                      HelpOrdersDetails,
                    },
                    { header: null, headerMode: 'none' }
                  ),
                  navigationOptions: {
                    tabBarLabel: 'Pedir ajuda',
                    tabBarIcon: props => (
                      <TabBarIcon name="question" {...props} />
                    ),
                  },
                },
              },
              {
                tabBarOptions,
              }
            ),
          },
          {
            defaultNavigationOptions,
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'Main' : 'SignIn',
      }
    )
  );
};
