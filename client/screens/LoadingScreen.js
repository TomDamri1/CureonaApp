import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    }
})

export default LoadingScreen;

