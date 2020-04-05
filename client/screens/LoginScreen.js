import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Title from '../components/Title'
import text from '../constants/text';
import Colors from '../constants/Colors'



const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [userType, setUserType] = useState('customer');

  const handleLogin = async () => {
    const response = await fetch('https://cureona.herokuapp.com/Login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        password: userPassword,
      }),
    });

  const resData = await response.json();
  console.log(resData);
  if (resData.state === "success"){
    props.navigation.navigate({
      routeName:"UserScreen",
      params:{
        username:username,
      }
    })
  }
  else{
    Alert.alert("pleas check your username and password.")
  }

  }

  const handleRegister = () =>{
    props.navigation.navigate({
      routeName:"Registration",
    })
  }

  return (
    <ScrollView>
      <Title title={text.applicationName} subTitle={text.login} />
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>{text.username}</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={text => setUsername(text)}
            returnKeyType="next"

          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>{text.password}</Text>
          <TextInput
            style={styles.input}
            value={userPassword}
            onChangeText={text => setUserPassword(text)}
            secureTextEntry={true}

          />
        </View>
        <View style={styles.gap}/>
        <Button color={Colors.primaryColor} title={text.login} onPress={() => { handleLogin() }} />
        <View style={styles.registerContainer}>
          <Text>{text.or_if_you_dont_have_user}</Text>
          <TouchableOpacity onPress={()=>handleRegister()}>
            <Text>{text.register}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%'
  },
  label: {
    marginTop: 30,
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  gap: {
    margin: 50,
  },
  registerContainer:{
    marginTop:20,
    alignContent:"center",
    alignItems:"center"
  }
});


export default LoginScreen;


/*

const ADMIN = "admin";
const CUSTOMER = "customer";
const BUSINESS_OWNER = "business_owner"


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