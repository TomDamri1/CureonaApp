import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import Urls from '../constants/Urls';

const AdminScreen = props => {
    

    return (
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')} />
            <Title title="this is an admin screen" />
            <Button title="View all businesses"  />
        </View>
    )
}



export default AdminScreen