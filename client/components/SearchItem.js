import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors';
import text from '../constants/text';
import Urls from '../constants/Urls'


const makeAnAppointment = async (item, navigation, username) => {
    console.log(item.id);
    console.log("mymsg : ", JSON.stringify({
        company_id: "1230",
    }));
    console.log("into : ", Urls.routes.avilableQueues)

    navigation.navigate({ routeName: "Loading" });
    try {
        const response = await fetch(Urls.routes.avilableQueues, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_id: "1230",
            }),
        });

        const resData = await response.json();
        console.log(resData);
        navigation.pop();
        navigation.setParams({ item: item, username: username, schedule: resData,});
        navigation.navigate({
            routeName: "AppointmentScreen",
            params: {
                item: item,
                username: username,
                schedule: resData,
            }
        });
    }
    catch{
        Alert.alert("somthing went wrong , try again");
    }
    


}

const adminChanges = (item, navigation, username) => {
    navigation.setParams({ item: item, username: username });
    navigation.navigate({
        routeName: "AdminChangesScreen",
        params: {
            item: item,
            USERTYPE: navigation.getParam('USERTYPE'),
            username: username,
        }
    });

}

const decideWhatToDo = {
    "makeAnAppointment": makeAnAppointment,
    "adminChanges": adminChanges,
}

const SearchItem = props => {
    return (
        <TouchableOpacity onPress={() =>
            decideWhatToDo[props.pressAction](props.content, props.navigation, props.username)
        }>
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        margin: 10,
        padding: 10,
    }
})

export default SearchItem;