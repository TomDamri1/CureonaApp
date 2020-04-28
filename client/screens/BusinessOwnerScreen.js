import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title'

const BusinessOwnerScreen = props => {
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
            <Title title={`your business : ${props.navigation.getParam('businessName')}`}/>
            <Button title="manage business"/>
            <Button title="manage workers"/>
        </View>

    )
}



export default BusinessOwnerScreen