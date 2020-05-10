import React, { useState } from 'react'
import { View } from 'react-native';
import Title from '../components/Title'
import MakeAppointment from '../components/MakeAppointment/MakeAppointment'
import DayPicker from '../components/DayPicker/DayPicker';
import Time from '../constants/Time';

const AppointmentScreen = props => {
    const date = new Date();
    const [selectedDayValue, setSelectedDayValue] = useState(Time.days[date.getDay()]);
    const username = props.navigation.getParam('username');
    const schedule = props.navigation.getParam('schedule');
    
    return (
        <View>
            <Title
                title={`${props.navigation.getParam('item').name}`}
                subTitle="Make an appointment"
            />
            <DayPicker 
                selectedDayValueState={[selectedDayValue, setSelectedDayValue]} 
                showDate={true}
            />
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