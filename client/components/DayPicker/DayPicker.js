import React from 'react'
import {Platform } from 'react-native';
import IOSDayPicker from './iOS_DayPicker/IOSDayPicker';
import AndroidDayPicker from  './Android_DayPicker/AndriodDayPicker';

const DayPicker = props => {
    const [selectedDayValue, setSelectedDayValue] = props.selectedDayValueState;
    if (Platform.OS === 'ios') {
        return (
            <IOSDayPicker 
                selectedDayValueState = {[selectedDayValue, setSelectedDayValue]}
            />
        )
    }
    else {
        return (
            <AndroidDayPicker 
                selectedDayValueState = {[selectedDayValue, setSelectedDayValue]}
            />
        )
    }
}

export default DayPicker


