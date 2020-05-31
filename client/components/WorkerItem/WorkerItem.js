import React from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import Colors from '../../constants/Colors'

const WorkerItem = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.title}>
                            {props.user}
                        </Text>
                    </View>
                    <View style={styles.rowNoSpace}>
                        <Button title="remove" color={Colors.accentColor} onPress={()=>Alert.alert("This feature is locked for now")}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WorkerItem

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        height:80,
        padding: 10,
        alignContent:"center"
    },
    rowNoSpace : {
        borderLeftColor : Colors.accentColor,
        borderLeftWidth : 2,
        width : "35%",
        paddingLeft:10,
        height : 50,
        alignContent:"center",
    },
})
