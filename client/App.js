import React, {useState} from 'react';
import { StyleSheet } from 'react-native';

import LoginNavigator from './navigation/LoginNavigator';

export default function App() {
  return (
    <LoginNavigator/>
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
