// App.jsx
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import Items from './src/components/Items';

export default function App() {
  const [searchedProduct, setSearchedProduct] = useState('');
  const [itemsEnCarrito, setItemsEnCarrito] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchedProduct(searchTerm);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header
        itemsEnCarrito={itemsEnCarrito}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        setSearchedProduct={setSearchedProduct}
        setSelectedCategory={setSelectedCategory}
      />
      <Items
        setItemsEnCarrito={setItemsEnCarrito}
        searchedProduct={searchedProduct}
        setSearchedProduct={setSearchedProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
