import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  useFonts,
  Roboto_300Light,
  Roboto_300Light_Italic,
} from '@expo-google-fonts/roboto';
import items from '../../data/products.json';

const Items = ({
  setItemsEnCarrito,
  searchedProduct,
  setSearchedProduct,
  setSelectedCategory,
  selectedCategory,
}) => {
  const [loaded] = useFonts({
    RobotoLight: Roboto_300Light,
    RobotoLightItalic: Roboto_300Light_Italic,
  });

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (searchedProduct && searchedProduct.trim() !== '') {
      setSelectedCategory('');
      console.log('Producto', searchedProduct);
      // Si hay una búsqueda, filtramos los productos por el término de búsqueda
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchedProduct.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchedProduct]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.trim() !== '') {
      setSearchedProduct('');
      console.log('Categoria:', selectedCategory);
      // Si hay una categoría seleccionada, filtramos los productos por la categoría
      const filtered = items.filter((item) =>
        item.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!searchedProduct && !selectedCategory) {
      // Si no hay búsqueda ni categoría seleccionada, mostramos los primeros 10 productos
      setFilteredItems(items.slice(0, 10));
    }
  }, [searchedProduct, selectedCategory]);

  if (!loaded) {
    return null;
  }

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
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} key={item.id}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <Text style={styles.name}>{item.title}</Text>
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
  itemContainer: {
    flex: 1,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
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
