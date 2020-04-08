import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title'
import MakeAppointment from '../components/MakeAppointment'

const AppointmentScreen = props => {
    return(
        <View>
            <Title 
                title={`${props.navigation.getParam('item').name}`} 
                subTitle="Make an appointment"
            />
            
            <MakeAppointment item={props.navigation.getParam('item')}/>
        </View>

    )
}



export default AppointmentScreen;