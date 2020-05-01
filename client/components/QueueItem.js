
import React from 'react'
import { View, Text, StyleSheet, Alert, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors';
import text from '../constants/text';
import Urls from '../constants/Urls'

const QueueItem = props => {

    console.log("==================================", props.address);
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.address}>
                        {props.address}
                    </Text>
                    <View style={styles.rowNoSpace}>
                        <Text>{props.date}</Text>
                        <Text>{props.hour}</Text>
                        <Button title="cancel" />
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    rowNoSpace: {
        marginTop:-30,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
    }
})

export default QueueItem;