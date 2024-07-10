// HomeScreen.js
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db } from '../firebase.js'; // Import the db object from firebase.js
import { ref, set, push } from 'firebase/database';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen!</Text>
      <Button
        title="Go to Authentication Screen"
        onPress={() =>
          navigation.navigate('AuthScreen') 
        }
      />
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

export default HomeScreen;
