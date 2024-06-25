import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth } from './firebase'; // Import the auth object from firebase.js

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      Alert.alert('Success', `Welcome ${user.email}`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button
        title="Sign In"
        onPress={handleSignIn}
      />
    </View>
  );
};

export default SignInScreen;
