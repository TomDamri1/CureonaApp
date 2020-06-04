import React, { useState } from 'react'
import { View, FlatList } from 'react-native';
import Title from '../components/Title'
import MakeAppointment from '../components/MakeAppointment/MakeAppointment'
import DayPicker from '../components/DayPicker/DayPicker';
import Time from '../constants/Time';
import WorkerItem from '../components/WorkerItem/WorkerItem';
import text from '../constants/text';

const ViewWorkersScreen = props => {
    const username = props.navigation.getParam('username');
    const workers = props.navigation.getParam('workers');
    console.log(username,workers);


    return (
        <View>
            <Title
                title={text.workers}
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