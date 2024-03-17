import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ItemsStack from '../src/navigator/itemsStack';
import { FontAwesome } from '@expo/vector-icons';

import MyProfileStack from '../src/navigator/MyProfileStack';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Inicio" component={ItemsStack} />
        <Tab.Screen
          name="MiPerfil"
          component={MyProfileStack}
          options={{
            tabBarIcon: () => (
              <View style={styles.tabContainer}>
                <FontAwesome
                  name="user-circle"
                  size={30} // Tamaño del icono
                  color="blue" // Color del icono
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
