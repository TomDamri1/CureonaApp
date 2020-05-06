import React, { useState } from 'react'
import { View, Text, StyleSheet,} from 'react-native';
import Title from '../components/Title'
import MakeAppointment from '../components/MakeAppointment'
import DayPicker from '../components/DayPicker';
import Time from '../constants/Time';
import BusinessOwnerDayPicker from '../components/BusinessOwnerDayPicker';
import text from '../constants/text';

const  BusinessOwnerchangesScreen = props => {
    const date = new Date();
    const [selectedDayValue, setSelectedDayValue] = useState(Time.days[date.getDay()]);
    const username = props.navigation.getParam('username');
    const schedule = props.navigation.getParam('schedule');
    console.log( "AS : " , schedule)
    console.log(username);
    return (
        <View>
            <Title
                title={text.updateTheOpeningHoursBusinessOwner}
            />
            <Text style={styles.label}>{text.chooseDayBusinessOwner}</Text>
            <Text style={styles.label}>{text.updateTheOpeningHoursBusinessOwner}</Text>
            
            <BusinessOwnerDayPicker/>
        </View>

    )

    
}
const styles = StyleSheet.create({
    label: {
        textAlign: 'center',
        fontSize: 20,
    },
  });


export default  BusinessOwnerchangesScreen;