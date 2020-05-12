import React from 'react'
import { StyleSheet, View, Picker } from 'react-native';
import Colors from '../constants/Colors';
import Time from '../constants/Time';

const NUMBER_OF_DAYS_IN_THE_WEEK = 7



const BusinessOwnerDayPicker = props => {
    const [selectedDayValue, setSelectedDayValue] = props.selectedDayValueState;
    
    //const now = new Date();
    //const daynum = now.getDay();
    let dayList = [];
    for (let index = 0; index < NUMBER_OF_DAYS_IN_THE_WEEK; index++) {

        const thisDay = Time.days[index];
        dayList.push(
            <Picker.Item label={`${thisDay}`} value={thisDay} key={thisDay} />
        );
    }
    dayList.push(
        <Picker.Item label={`${'All Week'}`} value={'All Week'} key={'All Week'} />
    );
    return (

        <View>

            <Picker mode = "dialog"
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

export default BusinessOwnerDayPicker

const styles = StyleSheet.create({})
