import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SingleHour from './SingleHour'

const MakeAppointment = props => {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.item.hours}
                renderItem={({ item, index }) =>
                    <SingleHour time={item}/>
                }
                keyExtractor={(item, index) => index.toString()}
                style={styles.gap}
            />
            <Text>{props.item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        padding: 20
    },
    listConainer: {

    },
    label: {
        marginVertical: 8,
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    gap: {
        marginBottom: 100,
    }
})

export default MakeAppointment;
