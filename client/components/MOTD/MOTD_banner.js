import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import requestFromUrl from '../../functions/routeFunctions/requestFromUrl'
import Urls from '../../constants/Urls'
import Colors from '../../constants/Colors'


const MOTD_banner = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Message from the Owner :</Text>
            <Text style={styles.nonLabel}>{props.msg}</Text>
        </View>
    )
}

export default MOTD_banner

const styles = StyleSheet.create({
    container: {
        borderBottomColor : Colors.accentColor,
        borderBottomWidth : 2

    },
    label: {
        margin:8,
        fontWeight: 'bold',
        fontSize: 18,
    },
    nonLabel: {
        margin: 8,
        fontSize: 18,
    }
})
