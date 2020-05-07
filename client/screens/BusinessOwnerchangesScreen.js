import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, UnimplementedView, CheckBox} from 'react-native';
import Title from '../components/Title'
import Time from '../constants/Time';
import BusinessOwnerDayPicker from '../components/BusinessOwnerDayPicker';
import BusinessOwnerHourPicker from '../components/BusinessOwnerHourPicker';
import BusinessOwnerMinutePicker from '../components/BusinessOwnerMinutePicker';
import text from '../constants/text';

const  BusinessOwnerchangesScreen = props => {
    const date = new Date();
    const [selectedDayValue, setSelectedDayValue] = useState(Time.days[date.getDay()]);
    const [selectedHourValue, setSelectedHourValue] = useState(Time.hours[date.getHours()]);
    const [selectedMinuteValue, setSelectedMinuteValue] = useState(Time.minutes[date.getMinutes()]);
    const [closed, setClosed] = useState(false);
    const [selectedHour1Value, setSelectedHour1Value] = useState(Time.hours[date.getHours()]);
    const [selectedMinute1Value, setSelectedMinute1Value] = useState(Time.minutes[date.getMinutes()]);
    //const username = props.navigation.getParam('username');
    //const schedule = props.navigation.getParam('schedule');
    //console.log( "AS : " , schedule)
    console.log(closed);
    return (
        <View>
            <Title
                title={text.updateTheOpeningHoursBusinessOwner}
            />
            <Text style={styles.label}>{text.chooseDayBusinessOwner}</Text>
            <Text style={styles.label}>{text.updateTheOpeningHoursBusinessOwner}</Text>
            <View>
                <BusinessOwnerDayPicker selectedDayValueState={[selectedDayValue, setSelectedDayValue]} />
            </View>
            <View style={{margin:'35%', flexDirection: 'row'}}>
              <View style={{width: 50, height: 50,}}>
                  <BusinessOwnerHourPicker selectedHourValueState={[selectedHourValue, setSelectedHourValue]} />
              </View>
              <View style={{width: 50, height: 100,}}>
                <Text>:</Text>
              </View>
              <View style={{width: 50, height: 50,}}>
                  <BusinessOwnerMinutePicker selectedMinuteValueState={[selectedMinuteValue, setSelectedMinuteValue]} />
              </View>
            </View>
            <Text style={styles.label}>{text.DoYouhaveABreak}</Text>
            <Text style={styles.label}>{text.fillDowndTheHours}</Text>
            <CheckBox
              title={text.closed}
              checked={closed}
              onPress={() => setClosed(!closed)}
            />
            <View style={{margin:'35%', flexDirection: 'row'}}>
              <View style={{width: 50, height: 50,}}>
                  <BusinessOwnerHourPicker selectedHour1ValueState={[selectedHour1Value, setSelectedHour1Value]} />
              </View>
              <View style={{width: 50, height: 100,}}>
                <Text>:</Text>
              </View>
              <View style={{width: 50, height: 50,}}>
                  <BusinessOwnerMinutePicker selectedMinute1ValueState={[selectedMinute1Value, setSelectedMinute1Value]} />
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    form:{
      margin:20,
    },
    formControl: {
      width: 70,
      borderColor: 'black',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    Row: {
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-between",
      margin: 20,
    },
    label: {
        textAlign: 'center',
        fontSize: 20,
    },
  });

export default  BusinessOwnerchangesScreen;