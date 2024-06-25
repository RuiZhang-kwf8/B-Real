// ProfileScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { name } = route.params;
  return (
    <View style={styles.container}>
      <Text>This is {name}'s profile</Text>
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

export default ProfileScreen;
