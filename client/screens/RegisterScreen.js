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

const ADMIN = "admin";
const CUSTOMER = "customer";
const BUSINESS_OWNER = "business_owner"

const RegisterScreen = () => {
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
  const usernameChangeHandler = text =>{
    if (/^[a-zA-Z]+$/.test(text)){
      setUsernameIsValid(true);
    } else {
      setUsernameIsValid(false);
    }
    setUsername(text);
  };

  //password validation testing
  const passwordChangeHandler = text =>{
    if (text.lenght < 6 || text.lenght > 8){
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
    setUserPassword(text);
  };
  
  //password Authentication validation testing
  const passwordAuthenticationChangeHandler = text =>{
    if (text=={userPassword}){
      setPasswordAuthenticationIsValid(true);
    } else {
      setPasswordAuthenticationIsValid(false);
    }
    setPasswordAuthentication(text);
  };


  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
        <Text style={styles.title}>CureOna</Text>
        </View>
        <View >
            <Text style={styles.subTitle}>Registration</Text>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="The username consists of A-Z, a-z letters" 
            style={styles.input}
            value={username}
            onChangeText = {usernameChangeHandler} //{text => setUsername(text)}
            returnKeyType="next"
            keyboardType='default'
            returnKeyType='next'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password must be between 6-8 characters" 
            style={styles.input}
            value={userPassword}
            onChangeText= {passwordChangeHandler}//{text => setUserPassword(text)}
            secureTextEntry={true}
            keyboardType='default'
            returnKeyType='next'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Password Authentication</Text>
          <TextInput
            placeholder="Enter the password again"
            style={styles.input}
            value={passwordAuthentication}
            onChangeText = {passwordAuthenticationChangeHandler}//{text => setPasswordAuthentication(text)}
            secureTextEntry={true}
            keyboardType='default'
            returnKeyType='next'
            onSubmitEditing={() => console.log('onSubmitingEditing')}//shows a massege when the user done input the authnt. password
          />
        </View>
        <Button title="Register" onPress={()=>(({passwordIsValid} && {passwordAuthenticationIsValid} && {usernameIsValid}) ? alert('the data is correct'): alert('invalid data'))} />
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
  title: {
    padding:50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: 'teal',
    fontStyle: 'italic'
  },
  subTitle: {
    padding:0,
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 35,
    color: 'teal',
  },
  Instructions:
  {
    marginVertical: 8,
    color: 'red',
    fontSize: 12,
  }
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