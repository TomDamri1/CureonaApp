import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors';


const makeAnAppointment = (item,navigation) => {
    console.log(item , navigation)
    navigation.setParams({item : item});
    navigation.navigate({
        routeName: "AppointmentScreen",
            params: {
              item: item,
            }
    });
}

decideWhatToDo = {
    "makeAnAppointment" : makeAnAppointment,
}

const SearchItem = props => {
    return (
        <TouchableOpacity onPress={()=>makeAnAppointment(props.content,props.navigation)}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.address}>
                        {props.address}
                    </Text>
                    <View style={styles.rowNoSpace}>
                        {props.keywords.map(word => <Text key={word}>{word} </Text>)}
                    </View>
                </View>
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
    address: {

    },
    row :{
        flexDirection:"row",
        justifyContent:"space-between",

    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
    }
})

export default SearchItem;