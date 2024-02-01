import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import Items from './src/components/Items';

export default function App() {
  const [itemsEnCarrito, setItemsEnCarrito] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header itemsEnCarrito={itemsEnCarrito} />
      <Items setItemsEnCarrito={setItemsEnCarrito} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
