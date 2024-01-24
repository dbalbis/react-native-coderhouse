import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_100Thin,
  Roboto_300Light_Italic,
  Roboto_300Light,
} from '@expo-google-fonts/roboto';

export default function App() {
  const [loaded] = useFonts({
    Roboto: Roboto_300Light,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 35,
          fontFamily: 'Roboto',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        Hola, Coder! 🚀
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
