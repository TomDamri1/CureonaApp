import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title'

const UserScreen = props => {
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
        </View>

    )
}



export default UserScreen