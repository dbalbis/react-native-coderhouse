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
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from '../features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [itemsEnCarrito, setItemsEnCarrito] = useState(0);
  const [searchedProduct, setSearchedProduct] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantities, setQuantities] = useState({}); // Estado local para las cantidades

  const dispatch = useDispatch();

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
    navigation.navigate('ItemDetail', { item });
  };

  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
    dispatch(increment()); // Incrementa el contador global
  };

  const handleDecrement = (id) => {
    if (quantities[id] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: prevQuantities[id] - 1,
      }));
      dispatch(decrement()); // Decrementa el contador global
    }
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
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = items;
    if (searchedProduct && searchedProduct.trim() !== '') {
      setSelectedCategory('');
      console.log('Producto', searchedProduct);
      filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchedProduct.toLowerCase())
      );
    } else if (selectedCategory && selectedCategory.trim() !== '') {
      setSearchedProduct('');
      console.log('Categoria:', selectedCategory);
      filtered = items.filter((item) =>
        item.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    } else {
      filtered = items.slice(0, 10);
    }

    setFilteredItems(filtered);
  }, [searchedProduct, selectedCategory, items]);

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
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleDecrement(item.id)}
              >
                <FontAwesome name="minus" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>
                {quantities[item.id] || 0}
              </Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleIncrement(item.id)}
              >
                <FontAwesome name="plus" size={20} color="black" />
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
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Home;
