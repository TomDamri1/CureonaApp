import React from 'react';
import { View, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SingleHour from '../SingleHour/SingleHour';
import styles from './MakeAppointmentStyles';

const MakeAppointment = props => {
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle = {Platform.OS === 'ios' ? {paddingBottom:60} : {}}
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



export default MakeAppointment;
