import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';

const SingleHour = props => {
    const registerToHour = async (hour) => {
            const myMSG = JSON.stringify({
                Hour: props.time,
                BusinessName: props.businessName,
                Day: props.selectedDay,
                username: props.username
              })
              console.log("my msg : " , myMSG);
            props.navigation.navigate({routeName: "Loading"});
            const response = await fetch(Urls.routes.makeAnAppointment, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  Hour: props.time,
                  BusinessName: props.businessName, // in the end will be cid
                  Day: props.selectedDay.toLowerCase(),
                  username: props.username
                }),
              });
          
              const resData = await response.json();
              console.log(resData);
              props.navigation.pop();
              if ( resData.state.toLowerCase() === "success") {
                Alert.alert("Success!" ,`you are now registerd to ${hour}. please dont be late. \nyour code is :${resData.key}`);
              }
              else {
                Alert.alert("Failed", "somthing went wrong");
              }
            
            //generate a code in the server, save the code in the server under the customer.
    }

    return (
        <TouchableOpacity onPress={()=>registerToHour(props.time)}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {props.time}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
    }
})

export default SingleHour;