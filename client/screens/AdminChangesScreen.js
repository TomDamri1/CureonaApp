import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title'

const AdminChangesScreen = props => {
    const item = props.navigation.getParam('item');
    return (
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')} />
            <Text>this is an initial-dummy adminChanges-screen </Text>
            <Text>this is {item.name} page!</Text>
            

        </View>

    )
}



export default AdminChangesScreen