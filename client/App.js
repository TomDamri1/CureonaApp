import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';

import LoginNavigator from './navigation/LoginNavigator';

export default function App() {
  return (
      <LoginNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});