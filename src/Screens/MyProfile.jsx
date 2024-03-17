import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const MyProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Location Selector')}
      >
        <Text style={styles.buttonText}>My Addresses</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'RobotoLight',
    fontWeight: 'bold',
  },
});

export default MyProfile;
