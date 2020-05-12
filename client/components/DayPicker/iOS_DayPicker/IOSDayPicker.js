import React from 'react'
import IOSPicker from '../../IOSPicker/IOSPicker';
import {generateDayListForToday_iOS} from '../DayPickerFunctions'

const DayPickerIOS = props => {
    const [selectedDayValue, setSelectedDayValue] = props.selectedDayValueState;
    const dayList = generateDayListForToday_iOS(props.showDate)
    return (
        <IOSPicker
            data={dayList}
            itemToDisplay={selectedDayValue}
            setSelectedItem={setSelectedDayValue}
        />

    )
}

export default DayPickerIOS