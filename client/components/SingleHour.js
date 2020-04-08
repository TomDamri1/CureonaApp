import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors';

const registerToHour = (hour) => {
    const checkTheHourWithTheServer = true ; // for now its true.
    if(checkTheHourWithTheServer === true) {
        //here notify the server for this user registration to the hour
        //push navigtaion - loading
        //pop navigation
        Alert.alert("Sucsses!" ,`you are now registerd to ${hour}. please dont be late.`  )
    }
}


const SingleHour = props => {
    return (
        <TouchableOpacity onPress={()=>registerToHour(props.time)}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {props.time}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
    }
})

export default SingleHour;