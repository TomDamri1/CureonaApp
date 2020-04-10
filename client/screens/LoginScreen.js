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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Title from '../components/Title'
import text from '../constants/text';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import Response from '../constants/Response';



const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async () => {
    props.navigation.navigate({
      routeName: "Loading"
    })
    const response = await fetch(Urls.routes.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: userPassword,
      }),
    });

    const resData = await response.json();
    console.log(resData);
    props.navigation.pop(); //pop out the loading screen from the stack 
    if (resData.state === Response.success) {

      switch (resData.type) {

        case text.type.customer:
          props.navigation.navigate({
            routeName: "CustomerScreen",
            params: {
              username: username,
              USERTYPE: text.type.customer
            }
          })
          break;

        case text.type.businessOwner:
          props.navigation.navigate({
            routeName: "BusinessOwnerScreen",
            params: {
              username: username,
              businessName: "fake Business!!!",
              USERTYPE: text.type.businessOwner
            }
          })
          break;

        case text.type.admin:
          props.navigation.navigate({
            routeName: "AdminScreen",
            params: {
              username: username,
              USERTYPE: text.type.admin
            }
          })
          break;

        default:
          Alert.alert(text.alert.pleaseCheckYourUserNameAndPassword)
      }

    }
    else {
      Alert.alert(text.alert.pleaseCheckYourUserNameAndPassword)
    }

  }

  const handleRegister = () => {
    props.navigation.navigate({
      routeName: "Registration",
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <View style={styles.gap} />
            <Button color={Colors.primaryColor} title={text.login} onPress={() => { handleLogin() }} />
            <View style={styles.registerContainer}>
              <Text>{text.or_if_you_dont_have_user}</Text>
              <TouchableOpacity onPress={() => handleRegister()}>
                <Text style={styles.registerText}>{text.register}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  gap: {
    margin: 50,
  },
  registerContainer: {
    marginTop: 20,
    alignContent: "center",
    alignItems: "center"
  },
  registerText: {
    color: Colors.primaryColor
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