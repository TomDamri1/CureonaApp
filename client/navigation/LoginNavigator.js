import React from 'react';

// import navigators:
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

//import screens : 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from "../screens/RegisterScreen";
import UserScreen from "../screens/UserScreen";
import BusinessOwnerScreen from "../screens/BusinessOwnerScreen";
import AdminScreen from '../screens/AdminScreen';

const LoginNavigator = createStackNavigator({
    Login: LoginScreen,
    Registration: RegisterScreen,
    UserScreen: UserScreen,
    BusinessOwnerScreen: BusinessOwnerScreen,
    AdminScreen: AdminScreen,
})


export default createAppContainer(LoginNavigator);