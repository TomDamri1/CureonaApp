import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text'

const WorkerScreen = props => {
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
            <Title title="this is an worker screen"/>
            <Title title="In this page you can enter customers codes"/>
        </View>
    )
}



export default WorkerScreen