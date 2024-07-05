// HomeScreen.js
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Card = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Card Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Card;
