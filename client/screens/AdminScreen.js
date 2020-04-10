import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title'

const AdminScreen = props => {
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
            <Title title="this is an admin screen"/>
            <Title title="with alot of fancy options"/>
        </View>

    )
}



export default UserScreen