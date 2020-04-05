import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title'

const BusinessOwnerScreen = props => {
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
            <Title title={`your business : ${props.navigation.getParam('business')}`}/>
        </View>

    )
}



export default BusinessOwnerScreen