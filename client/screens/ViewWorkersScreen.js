import React, { useState } from 'react'
import { View, FlatList } from 'react-native';
import Title from '../components/Title'
import MakeAppointment from '../components/MakeAppointment/MakeAppointment'
import DayPicker from '../components/DayPicker/DayPicker';
import Time from '../constants/Time';
import WorkerItem from '../components/WorkerItem/WorkerItem';

const ViewWorkersScreen = props => {
    const username = props.navigation.getParam('username');
    const workers = props.navigation.getParam('workers');



    return (
        <View>
            <Title
                title={`workers`}
            />

            <FlatList
                data={workers}
                renderItem={({ item }) =>
                    <WorkerItem user={item} businessOwner={username} navigation={props.navigation}/>
                }
                keyExtractor={item => item}
            />
        </View>

    )
}



export default ViewWorkersScreen;