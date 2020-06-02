import React ,{useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import PureChart from 'react-native-pure-chart';
import Colors from '../constants/Colors';
import IOSDayPicker from '../components/DayPicker/iOS_DayPicker/IOSDayPicker';
import Time from '../constants/Time';
import Title from '../components/Title';



let sampleData = [
    {
      seriesName: 'series1',
      data: [
        {x: '07:00', y: 30},
        {x: '08:00', y: 200},
        {x: '09:00', y: 170},
        {x: '10:00', y: 250},
        {x: '11:00', y: 10}
      ],
      color: Colors.primaryColor
    },
  ]

const BusinessStatistics = (props) => {
    const [selectedDay, setSelectedDay] = useState(Time.days[0]);
    return (
        <View>
            <View>
                <Title title="Amount of people that need to be in the store"/>
            </View>
            <View style={styles.picker}>
                <IOSDayPicker selectedDayValueState={[selectedDay, setSelectedDay]} showDate={false} />
            </View>
            <View style={styles.gap}>
            </View>
            <PureChart data={sampleData} type='bar' highlightColor={Colors.accentColor} numberOfYAxisGuideLine={10} height={300}/>

            <View style={styles.image}>
                <Image style={{ width: 80, height: 80 }} source={require('../assets/cureonaIcon.png')} />
            </View>
        </View>
    )
}

export default BusinessStatistics

const styles = StyleSheet.create({
    gap : {
        margin :10,
    },
    image: {
        margin:10,
        alignItems: 'center'
    },
})
