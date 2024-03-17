import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';

const LocationSelector = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Mi dirección</Text>
      {location.latitude ? (
        <View style={styles.noLocationContainer}>
          <Text style={styles.addressText}>
            Lat: {location.latitude}, long: {location.longitude}
          </Text>
          <MapPreview location={location} />
        </View>
      ) : (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingBottom: 130,
    paddingTop: 40,
  },
  noLocationContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontFamily: 'InterRegular',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressText: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    color: 'red',
  },
});

export default LocationSelector;
