import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  useFonts,
  Roboto_300Light,
  Roboto_300Light_Italic,
} from '@expo-google-fonts/roboto';

const Items = ({ setItemsEnCarrito }) => {
  const [loaded] = useFonts({
    RobotoLight: Roboto_300Light,
    RobotoLightItalic: Roboto_300Light_Italic,
  });

  if (!loaded) {
    return null;
  }

  const items = [
    { id: 1, name: 'Artículo 1', description: 'Descripción del artículo 1' },
    { id: 2, name: 'Artículo 2', description: 'Descripción del artículo 2' },
    { id: 3, name: 'Artículo 3', description: 'Descripción del artículo 3' },
    { id: 4, name: 'Artículo 4', description: 'Descripción del artículo 4' },
    { id: 5, name: 'Artículo 5', description: 'Descripción del artículo 5' },
    { id: 6, name: 'Artículo 6', description: 'Descripción del artículo 6' },
  ];

  const handleAddToCart = (id) => {
    setItemsEnCarrito((prevItemsEnCarrito) => prevItemsEnCarrito + 1);
    console.log('Agregado producto:', id);
  };

  const handleRemoveFromCart = (id) => {
    setItemsEnCarrito((prevItemsEnCarrito) =>
      prevItemsEnCarrito > 0 ? prevItemsEnCarrito - 1 : 0
    );
    console.log('Eliminado producto:', id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} key={item.id}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item.id)}
              >
                <FontAwesome name="cart-plus" size={20} color="white" />{' '}
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromCart(item.id)}
              >
                <FontAwesome name="trash" size={20} color="white" />{' '}
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
  },
  flatlistContent: {
    flexGrow: 1,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
  },
  name: {
    fontSize: 18,
    fontFamily: 'RobotoLight',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontFamily: 'RobotoLightItalic',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  removeButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'RobotoLight',
    marginLeft: 5,
  },
});

export default Items;
