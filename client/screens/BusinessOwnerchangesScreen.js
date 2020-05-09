import React, { useState } from 'react'
import { View, 
  Text, 
  StyleSheet, 
  TextInput, 
  CheckBox, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableWithoutFeedback,
  Keyboard,
  Button} from 'react-native';
import Title from '../components/Title'
import Time from '../constants/Time';
import BusinessOwnerDayPicker from '../components/BusinessOwnerDayPicker';
import BusinessOwnerHourPicker from '../components/BusinessOwnerHourPicker';
import BusinessOwnerMinutePicker from '../components/BusinessOwnerMinutePicker';
import text from '../constants/text';
import Colors from '../constants/Colors'

const  BusinessOwnerchangesScreen = props => {
    const date = new Date();
    const [selectedDayValue, setSelectedDayValue] = useState(Time.days[date.getDay()]);
    const [selectedHourValue, setSelectedHourValue] = useState(Time.hours[date.getHours()]);
    const [selectedMinuteValue, setSelectedMinuteValue] = useState(Time.minutes[date.getMinutes()]);
    const [selectedCloseHourValue, setSelectedCloseHourValue] = useState(Time.hours[date.getHours()]);
    const [selectedCloseMinuteValue, setSelectedCloseMinuteValue] = useState(Time.minutes[date.getMinutes()]);
    const [closed, setClosed] = useState(true);
    const [selectedHour1Value, setSelectedHour1Value] = useState(Time.hours[date.getHours()]);
    const [selectedMinute1Value, setSelectedMinute1Value] = useState(Time.minutes[date.getMinutes()]);
    const [selectedCloseHour1Value, setSelectedCloseHour1Value] = useState(Time.hours[date.getHours()]);
    const [selectedCloseMinute1Value, setSelectedCloseMinute1Value] = useState(Time.minutes[date.getMinutes()]);
    console.log(selectedDayValue)
    console.log(selectedDayValue)
    console.log(selectedMinuteValue)

    const validateHour = () => {
      if (selectedHourValue >=0 && selectedHourValue < 24) {
        return false;
      }
      else {
        return true;
      }
    }
    const validateMinute = () => {
      if (selectedMinuteValue >=0 && selectedMinuteValue < 60) {
        return false;
      }
      else {
        return true;
      }
    }

    const handleUpdate = async () => {
      const validatingHour = validateHour();
      const ValidatingMinute = validateMinute();
      const validatingCloseHour = validateHour();
      const ValidatingCloseMinute = validateMinute();
      const validatingHour1 = validateHour();
      const ValidatingMinute1 = validateMinute();
      const validatingCloseHour1 = validateHour();
      const ValidatingCloseMinute1 = validateMinute();
      console.log("===============================")
      console.log("validate Hour: ", validatingHour);
      console.log("validate Minute: ", ValidatingMinute);
  
  
      if (validatingHour && ValidatingMinute && validatingCloseHour && ValidatingCloseMinute && validatingHour1 && ValidatingMinute1 && validatingCloseHour1 && ValidatingCloseMinute1) {
        console.log("we all good now send somthing to the server!")
        props.navigation.navigate({
          routeName: "Loading"
        })
  
        const response = await fetch(Urls.routes.businessSettings , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: 
            JSON.stringify({
              company_id: company_id,
            //  open_hours: {`${selectedDayValue} : [${setSelectedHourValue}:${setSelectedMinuteValue}]`},
              /*{"sunday" : ["12:30-16:35", "17:00-19:30"],
              "monday" : ["12:31-16:30","20:00-21:30"],
              "tuesday" : ["12:30-16:35", "17:00-19:30"],
              "wednesday" : ["12:31-16:30","20:00-21:30"],
              "thursday" : "closed",
              "friday" : "closed" ,
              "saturday" : "closed"
           }	,*/
            })
          ,
        });
        console.log("after post");
        const resData = await response.json();
        props.navigation.pop();
        if (resData.state === Response.success) {
            props.navigation.pop();
            Alert.alert("Success", `The opening hours has been updated`);
            props.navigation.navigate({
              routeName: "BusinessOwnerScreen",
              params: {
                username: username,
              }
            })
        }
      }
      else {
        Alert.alert(text.alert.checkConditions)
      }
    }

    return (
      <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
        <ScrollView>
        <View>
            <Title
                title={text.updateTheOpeningHoursBusinessOwner}
            />
            <Text style={styles.label}>{text.chooseDayBusinessOwner}</Text>
            <Text style={styles.label}>{text.updateTheOpeningHoursBusinessOwner}</Text>
            <View>
                <BusinessOwnerDayPicker selectedDayValueState={[selectedDayValue, setSelectedDayValue]} />
            </View>
            <View style={{marginTop:130, flexDirection: 'row'}}>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  value={selectedHourValue}
                  onChangeText={text => setSelectedHourValue(text)}
                  returnKeyType="next"
                />
              </View>
              <View style={{paddingTop: 30}}>
                <Text>:</Text>
              </View>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  value={selectedMinuteValue}
                  onChangeText={text => setSelectedMinuteValue(text)}
                  returnKeyType="next"
                />
              </View>
              <View style={{paddingTop: 30}}>
                <Text>-</Text>
              </View>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  value={selectedCloseHourValue}
                  onChangeText={text => setSelectedCloseHourValue(text)}
                  returnKeyType="next"
                />
              </View>
              <View style={{paddingTop: 30}}>
                <Text>:</Text>
              </View>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  value={selectedCloseMinuteValue}
                  onChangeText={text => setSelectedCloseMinuteValue(text)}
                  returnKeyType="next"
                />
              </View>
            </View>
            <View>
            <Text style={styles.label}>{text.DoYouhaveABreak}</Text>
            <Text style={styles.label}>{text.fillDowndTheHours}</Text>
            </View>
            <View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.formControl}>
                <TextInput
                  defaultValue='No break 🤙🏽' 
                  style={styles.input}
                  value={selectedHour1Value}
                  onChangeText={text => setSelectedHour1Value(text)}
                  returnKeyType="next"

                />
              </View>
              <View style={{paddingTop: 30}}>
                <Text>:</Text>
              </View>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  value={selectedMinute1Value}
                  onChangeText={text => setSelectedMinute1Value(text)}
                  returnKeyType="next"
                />
              </View>
              <View style={{paddingTop: 30}}>
                <Text>-</Text>
              </View>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  value={selectedCloseHour1Value}
                  onChangeText={text => setSelectedCloseHour1Value(text)}
                  returnKeyType="next"
                />
              </View>
              <View style={{paddingTop: 30}}>
                <Text>:</Text>
              </View>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  value={selectedCloseMinute1Value}
                  onChangeText={text => setSelectedCloseMinute1Value(text)}
                  returnKeyType="next"
                />
              </View>
            </View>
            </View>
            <Button color={Colors.primaryColor} title={text.update} onPress={() => {handleUpdate()}} />
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
 
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
      margin: 20,
      height: 40,
      borderColor: Colors.primaryColor,
      borderWidth: 2,
      width: 50, 
      flexDirection: 'row', 
      textAlign: 'center'
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
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
  });

export default  BusinessOwnerchangesScreen;