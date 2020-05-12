import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native';
import Colors from '../constants/Colors';
import Time from '../constants/Time';

const NUMBER_OF_MINUTES = 4



const BusinessOwnerMinutePicker = props => {
    const [selectedMinuteValue, setSelectedMinuteValue] = props.selectedMinuteValueState;
    
    //const now = new Date();
    //const daynum = now.getDay();
    let minuteList = [];
    for (let index = 0; index < NUMBER_OF_MINUTES; index++) {

        const thisMinute = Time.hours[index];
        minuteList.push(
            <Picker.Item label={`${thisMinute}`} value={thisMinute} key={thisMinute} />
        );
    }
    return (

        <View>

            <Picker  mode = "dialog"
                selectedValue={selectedMinuteValue}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => setSelectedMinuteValue(itemValue)}
                itemStyle={{ borderBottomColor: Colors.primaryColor, borderBottomWidth: 1 }}
            >
                {
                     minuteList
                }
            </Picker>
        </View>

    )
}

export default BusinessOwnerMinutePicker

const styles = StyleSheet.create({})
