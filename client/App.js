import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';

export default function App() {
  return (
    <LoginScreen/>
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