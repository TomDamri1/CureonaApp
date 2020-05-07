import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SingleHour from './SingleHour/SingleHour'

const MakeAppointment = props => {
    console.log("MA : " ,props.schedule.queue[props.selectedDay.toLowerCase()] )
    return (
        <View style={styles.container}>
            <FlatList
                data={props.schedule.queue[props.selectedDay.toLowerCase()]}
                renderItem={({ item, index }) =>
                    <SingleHour
                        time={item}
                        navigation = {props.navigation}
                        businessName = {props.item.name}
                        selectedDay = {props.selectedDay}
                        username = {props.username}
                        id = {props.item.id}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                style={styles.gap}
            />
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
