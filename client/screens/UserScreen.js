import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title'

const UserScreen = props => {
    return (
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')} />
            <Text>this is an initial-dummy user-screen </Text>
            <Button title="sign up for a queue" />
            <Button title="my queues" />

        </View>

    )
}



export default UserScreen