// App.jsx
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Header from './src/components/Header';
import Items from './src/components/Items';
import { NavigationContainer } from '@react-navigation/native';
import ItemsStack from './src/navigator/itemsStack';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <ItemsStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
