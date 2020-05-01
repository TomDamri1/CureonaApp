import React from 'react';
import text from '../constants/text';

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
import AppointmentScreen from '../screens/AppointmentScreen';
import AdminChangesScreen from '../screens/AdminChangesScreen';
<<<<<<< HEAD
import WorkerScreen from '../screens/WorkerScreen';
import AddWorkerScreen from '../screens/AddWorkerScreen';
=======
import CustomerQueuesScreen from '../screens/CustomerQueuesScreen';
>>>>>>> 678385523ae3744ba95453409176e37cf86551b5

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