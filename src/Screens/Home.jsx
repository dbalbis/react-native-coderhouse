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
import Header from '../components/Header';

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [Items, setItems] = useState([]); // Estado para almacenar los productos
  const [itemsEnCarrito, setItemsEnCarrito] = useState(0);
  const [searchedProduct, setSearchedProduct] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchedProduct(searchTerm);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

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

  const handleItemDetailPress = (item) => {
    // Navegar a la pantalla ItemDetail.jsx pasando el artículo como parámetro
    navigation.navigate('ItemDetail', { item });
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false); // Marca que los productos se han cargado
      })
      .catch((error) => {
        setError(error.message); // Almacena el error en caso de que ocurra
        setLoading(false); // Marca que la carga ha terminado, incluso en caso de error
      });
  }, []);

  useEffect(() => {
    if (searchedProduct && searchedProduct.trim() !== '') {
      setSelectedCategory('');
      console.log('Producto', searchedProduct);
      // Si hay una búsqueda, filtramos los productos por el término de búsqueda
      const filtered = Items.filter((item) =>
        item.title.toLowerCase().includes(searchedProduct.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchedProduct, Items]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.trim() !== '') {
      setSearchedProduct('');
      console.log('Categoria:', selectedCategory);
      // Si hay una categoría seleccionada, filtramos los productos por la categoría
      const filtered = Items.filter((item) =>
        item.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [selectedCategory, Items]);

  useEffect(() => {
    if (!searchedProduct && !selectedCategory) {
      // Si no hay búsqueda ni categoría seleccionada, mostramos los primeros 10 productos
      setFilteredItems(Items.slice(0, 10));
    }
  }, [searchedProduct, selectedCategory, Items]);

  const [loaded] = useFonts({
    RobotoLight: Roboto_300Light,
    RobotoLightItalic: Roboto_300Light_Italic,
  });

  if (!loaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        itemsEnCarrito={itemsEnCarrito}
        onSearch={handleSearch}
        setSearchedProduct={setSearchedProduct}
        setSelectedCategory={setSelectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item.id)}
              >
                <FontAwesome name="cart-plus" size={20} color="white" />
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromCart(item.id)}
              >
                <FontAwesome name="trash" size={20} color="white" />
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleItemDetailPress(item)}>
              <Text style={styles.moreInfoText}>Más info</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  moreInfoText: {
    marginTop: 10, // Agregar un margen superior para el espacio
    textDecorationLine: 'underline', // Subrayado para indicar que es un enlace
    color: 'blue', // Color azul para indicar que es un enlace
    textAlign: 'center',
  },
});

export default Home;
