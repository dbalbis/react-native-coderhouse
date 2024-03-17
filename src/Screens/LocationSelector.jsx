import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>My Addresses</Text>
      {/* Flatlist con las direcciones */}
      {location ? (
        <View style={styles.noLocationContainer}>
          <Text>
            Lat: {location.latitude}, long: {location.longitude}.
          </Text>
        </View>
      ) : (
        <View style={styles.noLocationContainer}>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
};
export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20, // "gap" no es una propiedad válida en StyleSheet, podrías usar "marginVertical" para agregar espacio vertical entre los elementos
    paddingBottom: 130,
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'green',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
