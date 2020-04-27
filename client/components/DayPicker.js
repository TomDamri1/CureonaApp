import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native';
import Colors from '../constants/Colors';
import Time from '../constants/Time';

const NUMBER_OF_DAYS_IN_THE_WEEK = 7



const DayPicker = props => {
    const [selectedDayValue, setSelectedDayValue] = props.selectedDayValueState;
    
    const now = new Date();
    const daynum = now.getDay();
    let dayList = [];
    for (let index = 0; index < NUMBER_OF_DAYS_IN_THE_WEEK; index++) {

        const thisDay = Time.days[(daynum + index) % 7];
        const newDate = new Date();
        newDate.setDate(now.getDate() + index)
        const displayDate = newDate.getDate() + "-" + Time.months[newDate.getMonth()] + "-" + newDate.getFullYear();
        dayList.push(
            <Picker.Item label={`${thisDay} \t\t ${displayDate}`} value={thisDay} key={thisDay} />
        );
    }

    return (

        <View>

            <Picker
                selectedValue={selectedDayValue}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => setSelectedDayValue(itemValue)}
                itemStyle={{ borderBottomColor: Colors.primaryColor, borderBottomWidth: 1 }}
            >
                {
                     dayList
                }
            </Picker>
        </View>

    )
}

export default DayPicker

const styles = StyleSheet.create({})
