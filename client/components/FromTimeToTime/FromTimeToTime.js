import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { generateHourList, generateMinuteList } from './FromTimeToTimeFunctions'
import IOSModal from '../IOSPicker/IOSPicker';

const hourValidation = (startHour, startMinute, endHour, endMinute) => {
  const start_hour = parseInt(startHour);
  const end_hour = parseInt(endHour);
  const start_minute = parseInt(startMinute);
  const end_minute = parseInt(endMinute);
  if (start_hour > end_hour) {
    Alert.alert("Warning", "This hours seems impposible");
    
    return false;
  }
  else if (start_hour == end_hour && end_minute - start_minute < 30) {
    Alert.alert("Warning", "This hours seems impposible");
    return false;
  }
  else if (start_hour - end_hour == 1 && end_minute - start_minute <= -15) {
    Alert.alert("Warning", "This hours seems impposible");
    return false;
  }
  return true;

}


const FromTimeToTime = props => {
  const hourList = generateHourList();
  const minuteList = generateMinuteList();
  const [startHour, setStartHour] = useState('00')
  const [startMinute, setStartMinute] = useState('00')
  const [endHour, setEndHour] = useState('00')
  const [endMinute, setEndMinute] = useState('00')
  const setValidataion = props.validation;
  
  useEffect(() => {
    setValidataion(hourValidation(startHour, startMinute, endHour, endMinute));
    props.setTime(startHour + ":" + startMinute + "-" + endHour + ":" + endMinute);
    console.log(startHour + ":" + startMinute + "-" + endHour + ":" + endMinute);
  }, [startMinute, startHour, endMinute, endHour]);
  if (props.visible === false) {
    return <View />
  }
  return (
    <View style={styles.time}>
      <View style={styles.hourContainer}>
        <IOSModal
          style={{ width: 50 }}
          data={hourList}
          setSelectedItem={setStartHour}
        />
        <View style={{ margin: 5 }} />
        <IOSModal
          style={{ width: 50 }}
          data={minuteList}
          setSelectedItem={setStartMinute}
        />
      </View>
      <Text style={styles.textLine}> - </Text>
      <View style={styles.hourContainer}>
        <IOSModal
          style={{ width: 50 }}
          data={hourList}
          setSelectedItem={setEndHour}
        />
        <View style={{ margin: 5 }} />
        <IOSModal
          style={{ width: 50 }}
          data={minuteList}
          setSelectedItem={setEndMinute}
        />
      </View>
    </View>
  )
}

export default FromTimeToTime

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  hourContainer: {
    flexDirection: "row",
    margin: 20,
  },
  time: {
    flexDirection: "row"
  },
  textLine: {
    paddingTop: 40,
    fontSize: 30
  }
})
