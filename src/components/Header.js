import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ itemsEnCarrito }) => {
  const [loaded] = useFonts({
    RobotoBlack: Roboto_900Black,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Zooko Store</Text>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() => {
            // Lógica boton carrito
          }}
        >
          <FontAwesome
            name="shopping-cart"
            size={32}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        {itemsEnCarrito > 0 && (
          <View style={styles.circleContainer}>
            <Text style={styles.circleText}>{itemsEnCarrito}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'RobotoBlack',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  circleContainer: {
    backgroundColor: 'black',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  circleText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'RobotoBlack',
  },
});

export default Header;
