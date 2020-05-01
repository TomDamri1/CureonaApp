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
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Title from '../components/Title'
import text from '../constants/text'
import Colors from '../constants/Colors';
import Urls from '../constants/Urls'
import Response from '../constants/Response';
import { CheckBox } from "react-native-elements";
import LoadingScreen from '../screens/LoadingScreen';

const AddWorkerScreen = props => {
  const company_id = props.navigation.getParam('company_id')
  //console.log("company_id : " , company_id )

  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordAuthentication, setUserPasswordAuthentication] = useState('');

  const validatePassword = () => {
    if (userPassword === userPasswordAuthentication) {
      return true;
    }
    else {
      return false;
    }
  }
  const passwordLengthValidation = () => {
    const passLen = userPassword.length
    if (passLen < 6 || passLen > 8) {
      return false;
    }
    else {
      return true;
    }
  }

  const handleRegister = async () => {
    const validatingPassword = validatePassword();
    const passwordLengthValidating = passwordLengthValidation();
    console.log("===============================")
    console.log("validate password: ", validatingPassword);
    console.log("validate password length: ", passwordLengthValidating);


    if (passwordLengthValidating && validatingPassword) {
      console.log("we all good now send somthing to the server!")
      props.navigation.navigate({
        routeName: "Loading"
      })

      const response = await fetch(Urls.routes.registerWorker , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: 
          JSON.stringify({
            company_id: company_id,
            password: userPassword,
            type: text.type.worker,
            
          })
        ,
      });
      console.log("after post");
      const resData = await response.json();
      props.navigation.pop();
      if (resData.state === Response.success) {
          props.navigation.pop();
          Alert.alert("Success", `The worker has been register successfully\nUsername: ${resData.username}\nPassword: ${resData.password}`);
          props.navigation.navigate({
            routeName: "BusinessOwnerScreen",
            params: {
              username: username,
            }
          })
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Title title={text.addWorker} />
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>{text.password}</Text>
              <TextInput
                placeholder={text.placeholder.password}
                style={styles.input}
                value={userPassword}
                onChangeText={text => setUserPassword(text)}
                secureTextEntry={true}

              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>{text.passwordAuthentication}</Text>
              <TextInput
                placeholder={text.placeholder.passwordAuthentication}
                style={styles.input}
                value={userPasswordAuthentication}
                onChangeText={text => setUserPasswordAuthentication(text)}
                secureTextEntry={true}

              />
            </View>
            <View style={styles.gap} />
            <Button color={Colors.primaryColor} title={text.addWorkerbButton} onPress={() => { handleRegister() }} />

          </View>
          <View style={styles.image}>
            <Image style={{ width: 80, height: 80 }} source={require('../assets/cureonaIcon.png')} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center'
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



export default AddWorkerScreen;