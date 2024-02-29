import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import React, { useState } from 'react'; // Importa useState de 'react'
import { FontAwesome } from '@expo/vector-icons';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const search = () => {
    onSearch(input);
    setInput('');
  };

  return (
    <View style={styles.searchContainer}>
      <Pressable onPress={search}>
        <FontAwesome
          name="search"
          size={20}
          color="black"
          style={styles.icon}
        />
      </Pressable>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Buscar..."
        onSubmitEditing={search}
        style={styles.input}
        placeholderTextColor="#A0A0A0"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    paddingLeft: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
});

export default Search;
