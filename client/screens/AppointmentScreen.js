import React, { useState } from 'react'
import { View } from 'react-native';
import Title from '../components/Title'
import MakeAppointment from '../components/MakeAppointment'
import DayPicker from '../components/DayPicker';
import Time from '../constants/Time';

const AppointmentScreen = props => {
    const date = new Date();
    const [selectedDayValue, setSelectedDayValue] = useState(Time.days[date.getDay()]);
    const username = props.navigation.getParam('username');
    const schedule = props.navigation.getParam('schedule');
    console.log( "AS : " , schedule)
    console.log(username);
    return (
        <View>
            <Title
                title={`${props.navigation.getParam('item').name}`}
                subTitle="Make an appointment"
            />
            <DayPicker selectedDayValueState={[selectedDayValue, setSelectedDayValue]} />
            <MakeAppointment
                item={props.navigation.getParam('item')}
                selectedDay={selectedDayValue}
                navigation = {props.navigation}
                username = {username}
                schedule = {schedule}
            />
        </View>

    )
}



export default AppointmentScreen;