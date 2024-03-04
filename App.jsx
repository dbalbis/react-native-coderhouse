// App.jsx
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import TabNavigator from './navigation/TabNavigator';
import store from './src/Store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <TabNavigator />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
