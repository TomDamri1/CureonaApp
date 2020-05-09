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
import BusinessOwnerRegistration from "../components/BusinessOwnerRegistration";


const RegisterScreen = props => {
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordAuthentication, setUserPasswordAuthentication] = useState('');
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  //for business only
  const [businessName, setBusinessName] = useState('');
  const [cid, setCid] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [ownerId, setOwnerId] = useState('');

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
  const validateUsername = () => {
    if (/^[a-zA-Z]+$/.test(username)) {
      return true;
    }
    else {
      return false;
    }
  }
  const validateBusinessOwner = () => {
    if (!isBusinessOwner) {
      return true;
    }
    else {
      let conditionCount = 0;
      if (businessName.length > 0) conditionCount += 1;
      if (cid.length > 0) conditionCount += 1;
      if (ownerId.length > 0 ) conditionCount += 1;
      if (ownerName.length > 0 ) conditionCount += 1;
      if (address.length > 0 ) conditionCount += 1;

      if (conditionCount == 5) {
        return true;
      }
      else {
        return false;
      }
    }
  }



  const handleRegister = async () => {
    const validatingPassword = validatePassword();
    const passwordLengthValidating = passwordLengthValidation();
    const validatingUsername = validateUsername();
    const validatingBusinessOwner = validateBusinessOwner();
    console.log("===============================")
    console.log("validate password: ", validatingPassword);
    console.log("validate password length: ", passwordLengthValidating);
    console.log("validate username: ", validatingUsername);

    if (validatingUsername && passwordLengthValidating && validatingPassword && validatingBusinessOwner) {
      console.log("we all good now send somthing to the server!")
      props.navigation.navigate({
        routeName: "Loading"
      })

      console.log(JSON.stringify({
        username: username,
        business_name: businessName,
        address: address,
        company_id: cid,
        password: userPassword,
        search_key: [businessName],
      }));

      const response = await fetch(!isBusinessOwner ? Urls.routes.register : Urls.routes.registerBusiness, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: !isBusinessOwner ?
          JSON.stringify({
            username: username,
            password: userPassword,
            type: text.type.customer
          })
          :
          JSON.stringify({
            username: username,
            business_name: businessName,
            address: address,
            company_id: cid,
            password: userPassword,
            search_key: {keys : [businessName]},

          })
        ,
      });

      const resData = await response.json();
      console.log(resData);
      console.log("got here");
      props.navigation.pop();
      if (resData.state === Response.success) {
        
        if (!isBusinessOwner) {
          props.navigation.popToTop();
          props.navigation.navigate({
            routeName: "CustomerScreen",
            params: {
              username: username,
            }
          })
        }
        else {
          props.navigation.popToTop();
          props.navigation.navigate({
            routeName: "BusinessOwnerScreen",
            params: {
              username: username,
              businessName: businessName,
            }
          })
        }
      }
      else if (resData.state === Response.userExist) {
        Alert.alert(Response.userExist)
      }
      else if (resData.state === Response.companyIdWasNotFound) {
        Alert.alert(Response.companyIdWasNotFound);
      }
      else {
        Alert.alert(text.alert.checkConditions)
      }

    }
    else {
      Alert.alert(text.alert.checkConditions)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Title title={text.register} />
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>{text.username}</Text>
              <TextInput
                placeholder={text.placeholder.username}
                style={styles.input}
                value={username}
                onChangeText={text => {setUsername(text)}}
                returnKeyType="next"

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
            <CheckBox
              title='Im business owner'
              checked={isBusinessOwner}
              onPress={() => setIsBusinessOwner(!isBusinessOwner)}
            />
            <BusinessOwnerRegistration
              isBusinessOwner={isBusinessOwner}
              businessNameState={[businessName, setBusinessName]}
              cidState={[cid, setCid]}
              ownerNameState={[ownerName, setOwnerName]}
              addressState={[address, setAddress]}
              ownerIdState={[ownerId, setOwnerId]}
            />


            <View style={styles.gap} />
            <Button color={Colors.primaryColor} title={text.register} onPress={() => { handleRegister() }} />

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



export default RegisterScreen;