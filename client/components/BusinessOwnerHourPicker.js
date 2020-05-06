import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native';
import Colors from '../constants/Colors';
import Time from '../constants/Time';

const NUMBER_OF_HOURS = 24



const BusinessOwnerHourPicker = props => {
    const [selectedHourValue, setSelectedHourValue] = props.selectedHourValueState;
    
    //const now = new Date();
    //const daynum = now.getDay();
    let hourList = [];
    for (let index = 0; index < NUMBER_OF_HOURS; index++) {

        const thisHour = Time.hours[index];
        hourList.push(
            <Picker.Item label={`${thisHour}`} value={thisHour} key={thisHour} />
        );
    }
    return (

        <View>

            <Picker  mode = "dropdown"
                selectedValue={selectedHourValue}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => setSelectedHourValue(itemValue)}
                itemStyle={{ borderBottomColor: Colors.primaryColor, borderBottomWidth: 1 }}
            >
                {
                     hourList
                }
            </Picker>
        </View>

    )
}

export default BusinessOwnerHourPicker

const styles = StyleSheet.create({})
