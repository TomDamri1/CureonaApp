import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  Button,
  Image,
  Alert,
} from 'react-native';

import Title from '../components/Title'
import text from '../constants/text'
import Colors from '../constants/Colors';


const RegisterScreen = props => {
  const [username, setUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [userType, setUserType] = useState('customer');

  const [passwordAuthentication, setPasswordAuthentication] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordAuthenticationIsValid, setPasswordAuthenticationIsValid] = useState(false);

  /*const registerHandler = useCallback(() => {
    if (!passwordIsValid) {
      Alert.alert('Password is invalid', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
  })[username, userPassword, passwordAuthentication, passwordIsValid];*/

  //username validation testing
  const usernameChangeHandler = text => {
    if (/^[a-zA-Z]+$/.test(text)) {
      setUsernameIsValid(true);
    } else {
      setUsernameIsValid(false);
    }
    setUsername(text);
  };

  //password validation testing
  const passwordChangeHandler = text => {
    if (text.lenght < 6 || text.lenght > 8) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
    setUserPassword(text);
  };

  //password Authentication validation testing
  const passwordAuthenticationChangeHandler = text => {
    if (text == { userPassword }) {
      setPasswordAuthenticationIsValid(true);
    } else {
      setPasswordAuthenticationIsValid(false);
    }
    setPasswordAuthentication(text);
  };


  return (
    <ScrollView>
      <View style={styles.form}>
        <Title title={text.registration}/>
        <View style={styles.formControl}>
          <Text style={styles.label}>{text.username}</Text>
          <TextInput
            placeholder={text.placeholder.username}
            style={styles.input}
            value={username}
            onChangeText={text => setUsername(text)}
            returnKeyType="next"
            keyboardType='default'
            returnKeyType='next'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>{text.password}</Text>
          <TextInput
            placeholder={text.placeholder.password}
            style={styles.input}
            value={userPassword}
            onChangeText={text => setUserPassword(text)}
            secureTextEntry={true}
            keyboardType='default'
            returnKeyType='next'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>{text.passwordAuthentication}</Text>
          <TextInput
            placeholder={text.placeholder.passwordAuthentication}
            style={styles.input}
            value={passwordAuthentication}
            onChangeText={text => setPasswordAuthentication(text)}
            secureTextEntry={true}
            keyboardType='default'
            returnKeyType='next'
            onSubmitEditing={() => console.log('onSubmitingEditing')}//shows a massege when the user done input the authnt. password
          />
        </View>
        <View style={styles.gap}/>
        <Button 
          color = {Colors.primaryColor}
          title={text.register} 
          onPress={() => {}} 
          />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%'
  },
  label: {
    marginTop: 30,
    marginVertical: 8,
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  Instructions:
  {
    marginVertical: 8,
    color: 'red',
    fontSize: 12,
  },
  gap: {
    margin: 50,
  },
});



export default RegisterScreen;


/*
        <View style={styles.formControl}>
        <Text style={styles.label}>Type</Text>
          <Picker
            selectedValue={userType}
            mode='dropdown'
            onValueChange={(itemValue, itemIndex) => {
              setUserType(itemValue)
            }}
          >
            <Picker.Item label={ADMIN} value={ADMIN} />
            <Picker.Item label={CUSTOMER} value={CUSTOMER} />
            <Picker.Item label={"business owner"} value={BUSINESS_OWNER} />
          </Picker>
        </View>
*/