import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ItemsStack from '../src/navigator/itemsStack';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Inicio" component={ItemsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
