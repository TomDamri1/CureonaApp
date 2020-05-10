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
                showDate = {props.showDate}
            />
        )
    }
    else {
        return (
            <AndroidDayPicker 
                selectedDayValueState = {[selectedDayValue, setSelectedDayValue]}
                showDate = {props.showDate}
            />
        )
    }
}

export default DayPicker


