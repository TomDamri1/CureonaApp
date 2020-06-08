import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Title from '../components/Title';
import DayPicker from '../components/DayPicker/DayPicker';
import Colors from '../constants/Colors';
import Time from '../constants/Time';
import { CheckBox } from "react-native-elements";
import FromTimeToTime from '../components/FromTimeToTime/FromTimeToTime';
import reqeustFromUrl from '../functions/routeFunctions/requestFromUrl';
import Urls from '../constants/Urls';
import getIntoLoadingScreen from "../functions/navigationFunctions/getIntoLoadingScreen";
import text from '../constants/text';

const BusinessOwnerchangesScreen = props => {
  const company_id = props.navigation.getParam('company_id')
  const [selectedDay, setSelectedDay] = useState(Time.days[0]);
  const [time, setTime] = useState('');
  const [secondTimeNeeded, setSecondTimeNeeded] = useState(false);
  const [secondTime, setSecondTime] = useState('');
  const [validation, setValidataion] = useState(false);
  /*
  show : your hours , remove
  show : add button for new hour -> go to modal

  */

  let EntringCount = 0;
  const checkBreakValidation = () => {
    if (!secondTimeNeeded) {
      return true;
    }
    else {
      const the_end_of_first_time = time.split("-")[1]
      const the_start_of_second_time = secondTime.split("-")[0]
      return Date.parse(`01/01/2011 ${the_end_of_first_time}:00`) < Date.parse(`01/01/2011 ${the_start_of_second_time}:00`)
    }
  }

  const handleUpdate = async () => {
    
    if (validation && checkBreakValidation()) {
      var itemToSend = {
        company_id: company_id,
        open_hours: {}
      }
      if (secondTimeNeeded) {
        itemToSend.open_hours[selectedDay.toLowerCase()] = [time, secondTime];
      }
      else {
        itemToSend.open_hours[selectedDay.toLowerCase()] = [time];
      }
      console.log(itemToSend);
      getIntoLoadingScreen(props.navigation)
      const resData = await reqeustFromUrl(Urls.routes.businessSettings, itemToSend);
      props.navigation.pop();
      if (resData.open_hours === "updated") {
        Alert.alert(text.alert.success, text.alert.hoursUpdated);
      }
      else {
        Alert.alert(text.alert.failed, text.alert.somethingWentWrong);
      }
    }
    else {
      Alert.alert("You cannot to that", "This hours seems impposible");
    }

  }



  return (
    <View style={styles.form}>
      <Title title="Change opening hours" />
      <View style={styles.hours}>
        <DayPicker selectedDayValueState={[selectedDay, setSelectedDay]} showDate={false} />
        <FromTimeToTime setTime={setTime} validation={setValidataion} />
        <CheckBox
          title='Got a break?'
          checked={secondTimeNeeded}
          onPress={() => setSecondTimeNeeded(!secondTimeNeeded)}
        />
        <FromTimeToTime setTime={setSecondTime} visible={secondTimeNeeded} validation={setValidataion} />
      </View>
      <Button color={Colors.primaryColor} title="Update this Day" onPress={() => { handleUpdate() }} />


    </View >
  )
}

export default BusinessOwnerchangesScreen

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
  },
  hours: {
    height: "70%",
  }
})
