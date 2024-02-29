// Header.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { FontAwesome } from '@expo/vector-icons';
import Search from './Search';
import Categories from '../data/categories.json';

const Header = ({
  onSearch,
  itemsEnCarrito,
  onCategorySelect,
  setSearchedProduct,
  setSelectedCategory,
}) => {
  const [loaded] = useFonts({
    RobotoBlack: Roboto_900Black,
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState('');

  const handleCategorySelect = (Selectedcategory) => {
    setCategory(Selectedcategory);
    setShowDropdown(false);
    onCategorySelect(Selectedcategory);
  };

  const handleHomePress = () => {
    setSearchedProduct('');
    setSelectedCategory('');
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => handleHomePress()}>
        <Text style={styles.headerText}>Zooko Store</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <FontAwesome
          name="caret-down"
          size={20}
          color="black"
          style={styles.caretIcon}
        />
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          {Categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.dropdownItem}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.rightContainer}>
        <Search onSearch={onSearch} />
        <TouchableOpacity
          onPress={() => {
            // Lógica botón carrito
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
    zIndex: 1,
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'RobotoBlack',
  },
  caretIcon: {
    marginLeft: 5,
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
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 35,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    zIndex: 2,
  },
  dropdownItem: {
    fontSize: 14,
    fontFamily: 'RobotoBlack',
    textTransform: 'uppercase',
  },
});

export default Header;
