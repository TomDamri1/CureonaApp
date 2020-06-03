import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import PureChart from 'react-native-pure-chart';
import Colors from '../constants/Colors';
import IOSDayPicker from '../components/DayPicker/iOS_DayPicker/IOSDayPicker';
import Time from '../constants/Time';
import Title from '../components/Title';
import requestFromUrl from '../functions/routeFunctions/requestFromUrl';
import Urls from '../constants/Urls';

/*
const getDayData = async (day, company_id) => {
    let dayData = [];
    for (let i = 0; i < 24; i++) {
        let hour = i < 10 ? "0" + i.toString() : i.toString();
        let hourData = [];
        let data = await requestFromUrl(Urls.routes.amountForDayAndHour, {
            company_id: company_id,
            day: day,
            hour: hour + ":00",
        })
        hourData.push(parseInt(data.amount));
        for (let j = 15; j < 60; j = j + 15) {
            data = await requestFromUrl(Urls.routes.amountForDayAndHour, {
                company_id: company_id,
                day: day,
                hour: hour + ":" + j.toString(),
            })
            hourData.push(parseInt(data.amount));
        }
        let sum = 0;
        hourData.forEach(element => {
            sum += element
        });
        let avg = Math.ceil(sum / 4);

        dayData.push({
            x: i < 10 ? "0" + i.toString() : i.toString(),
            y: isNaN(avg) ? 0 : avg
        })

    }
    
    const retval = [
        {
            seriesName: 'series1',
            data: dayData,
            color: Colors.primaryColor
        }
    ]

    return retval;
}
*/

let sampleData = [
    {
        seriesName: 'series1',
        data: [
            { x: '07:00', y: 30 },
            { x: '08:00', y: 200 },
            { x: '09:00', y: 170 },
            { x: '10:00', y: 250 },
            { x: '11:00', y: 10 }
        ],
        color: Colors.primaryColor
    },
]

//umbg


const BusinessStatistics = (props) => {
    const [selectedDay, setSelectedDay] = useState(Time.days[0]);
    const sampleData = props.navigation.getParam('data');
    const company_id = props.navigation.getParam('company_id');
    console.log(sampleData)
    
    return (
        <View style={styles.form}>
            <View>
                <Title title="Expected number of people " />
            </View>
            <View style={styles.picker}>
                <IOSDayPicker selectedDayValueState={[selectedDay, setSelectedDay]} showDate={false} />
            </View>
            <View style={styles.gap}>
            </View>
            <PureChart data={sampleData[selectedDay.toLowerCase()]} type='bar' highlightColor={Colors.accentColor} numberOfYAxisGuideLine={10} height={300} />

            <View style={styles.image}>
                <Image style={{ width: 80, height: 80 }} source={require('../assets/cureonaIcon.png')} />
            </View>
        </View>
    )
}

export default BusinessStatistics

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 20,
    },
    gap: {
        margin: 10,
    },
    image: {
        margin: 10,
        alignItems: 'center'
    },
    picker: {
        marginHorizontal: 30,
    }
})
