import React from 'react';
import { Picker } from 'react-native';
import Time, {NUMBER_OF_DAYS_IN_THE_WEEK} from '../../constants/Time';



const generateLableForDay = (day, dateToDisplay) => {
    return `${day} \t\t ${dateToDisplay}`
}

export default generateDayListForToday = () => {
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



