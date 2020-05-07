import React from 'react'
import { View, Picker } from 'react-native';
import styles from './DayPickerStyles';
import generateDayListForToday from './DayPickerFunctions';

const DayPicker = props => {
    const [selectedDayValue, setSelectedDayValue] = props.selectedDayValueState;
    const dayList = generateDayListForToday();
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

export default DayPicker


