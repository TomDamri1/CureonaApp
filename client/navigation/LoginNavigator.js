import React from 'react';

// import navigators:
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

//import screens : 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from "../screens/RegisterScreen";
import UserScreen from "../screens/UserScreen"

const LoginNavigator = createStackNavigator({
    Login : LoginScreen,
    Registration : RegisterScreen,
    UserScreen : UserScreen,
})


export default createAppContainer(LoginNavigator);