import React from 'react';

// import navigators:
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

//import screens : 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from "../screens/RegisterScreen";
import CustomerScreen from "../screens/CustomerScreen";
import BusinessOwnerScreen from "../screens/BusinessOwnerScreen";
import AdminScreen from '../screens/AdminScreen';
import LoadingScreen from '../screens/LoadingScreen';
import CustomerSearchScreen from '../screens/CustomerSearchScreen'
import text from '../constants/text';
import AppointmentScreen from '../screens/AppointmentScreen';
import AdminChangesScreen from '../screens/AdminChangesScreen';
import WorkerScreen from '../screens/WorkerScreen';
import AddWorkerScreen from '../screens/AddWorkerScreen';

const LoginNavigator = createStackNavigator({
    Login: LoginScreen,
    Registration: RegisterScreen,
    CustomerScreen: CustomerScreen,
    CustomerSearchScreen : {
        screen : CustomerSearchScreen,
        navigationOptions : {
            headerTitle : text.screenHeaders.search
        }
    },
    AppointmentScreen : AppointmentScreen,
    BusinessOwnerScreen: BusinessOwnerScreen,
    AdminScreen: AdminScreen,
    Loading : {
        screen :LoadingScreen,
        navigationOptions:{
            headerShown : false
        }
    },
    AdminChangesScreen : AdminChangesScreen,
    WorkerScreen: WorkerScreen,
    Loading : {
        screen :LoadingScreen,
        navigationOptions:{
            headerShown : false
        }
    },
    AddWorkerScreen : AddWorkerScreen,
})


export default createAppContainer(LoginNavigator);