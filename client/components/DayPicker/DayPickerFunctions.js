import React from 'react';
import { Picker } from 'react-native';
import Time, { NUMBER_OF_DAYS_IN_THE_WEEK } from '../../constants/Time';



const generateLableForDay = (day, dateToDisplay) => {
    return `${day} \t\t ${dateToDisplay}`
}

const generateDayListForToday_WithDate_Andorid = () => {
    const now = new Date();
    const daynum = now.getDay();
    let dayList = [];
    for (let index = 0; index < NUMBER_OF_DAYS_IN_THE_WEEK; index++) {
        const thisDay = Time.days[(daynum + index) % NUMBER_OF_DAYS_IN_THE_WEEK];
        const newDate = new Date();
        newDate.setDate(now.getDate() + index)
        const displayDate = newDate.getDate() + "-" + Time.months[newDate.getMonth()] + "-" + newDate.getFullYear();
        dayList.push(
            <Picker.Item
                label={generateLableForDay(thisDay, displayDate)}
                value={thisDay}
                key={thisDay}
            />
        );
    }
    return dayList;
}

const generateDayListForToday_WithoutDate_Andorid = () => {
    const now = new Date();
    const daynum = now.getDay();
    let dayList = [];
    for (let index = 0; index < NUMBER_OF_DAYS_IN_THE_WEEK; index++) {
        const thisDay = Time.days[(daynum + index) % NUMBER_OF_DAYS_IN_THE_WEEK];
        dayList.push(
            <Picker.Item
                label={thisDay}
                value={thisDay}
                key={thisDay}
            />
        );
    }
    return dayList;
}

export const generateDayListForToday_Andorid = (showDate) => {
    if (showDate) {
        return generateDayListForToday_WithDate_Andorid();
    }
    else {
        return generateDayListForToday_WithoutDate_Andorid();
    }
}


export const generateDayListForToday_iOS = (showDate) => {
    if (showDate) {
        const now = new Date();
        const daynum = now.getDay();
        let dayList = [];
        for (let index = 0; index < NUMBER_OF_DAYS_IN_THE_WEEK; index++) {
            const thisDay = Time.days[(daynum + index) % NUMBER_OF_DAYS_IN_THE_WEEK];
            const newDate = new Date();
            newDate.setDate(now.getDate() + index)
            const displayDate = newDate.getDate() + "-" + Time.months[newDate.getMonth()] + "-" + newDate.getFullYear();
            dayList.push(
                [generateLableForDay(thisDay, displayDate), thisDay.toLowerCase()]
            );
        }
        return dayList;
    }
    else {
        const now = new Date();
        const daynum = now.getDay();
        let dayList = [];
        for (let index = 0; index < NUMBER_OF_DAYS_IN_THE_WEEK; index++) {
            const thisDay = Time.days[(daynum + index) % NUMBER_OF_DAYS_IN_THE_WEEK];
            dayList.push(
                [thisDay, thisDay.toLowerCase()]
            );
        }
        return dayList;
    }
}

