import React from 'react'
import { View, Picker } from 'react-native';
import styles from './AndroidDayPickerStyles';
import {generateDayListForToday_Andorid , } from '../DayPickerFunctions';

const AndroidDayPicker = props => {
    const [selectedDayValue, setSelectedDayValue] = props.selectedDayValueState;
    const dayList = generateDayListForToday_Andorid();
    return (
        <View>
            <Picker
                selectedValue={selectedDayValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedDayValue(itemValue)}
                itemStyle={styles.item}
            >
                {dayList}
            </Picker>
        </View>

    )
}

export default AndroidDayPicker