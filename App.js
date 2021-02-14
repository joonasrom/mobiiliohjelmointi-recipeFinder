import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert, Image } from 'react-native';

export default function App() {

  const [listItems, setListItems] = React.useState([]);
  const [search, setSearch] = React.useState("");


  const getItems = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + search;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setListItems(data.results)
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });

  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginTop: 50 }}
        keyExtractor={item => item.href}
        renderItem={({ item }) =>
          <View>
            <Text>{item.title}</Text>
            <Image
              style={{ width: 70, height: 70 }}
              source={{
                uri: item.thumbnail
              }}
            />
          </View>
        }
        data={listItems}
      />
      <TextInput style={styles.inputField} value={search} placeholder='Ingredient' onChangeText={search => setSearch(search)} />
      <Button title="Find" onPress={getItems} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {

    width: 150,
    marginLeft: 10,
    height: 20,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 2,
    margin: 15
  }
});
