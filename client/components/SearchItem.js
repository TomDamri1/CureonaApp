import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors';
import text from '../constants/text'


const makeAnAppointment = (item, navigation , username) => {
    navigation.setParams({ item: item , username : username});
    navigation.navigate({
        routeName: "AppointmentScreen",
        params: {
            item: item,
            username : username,
        }
    });
}

const adminChanges = (item, navigation,username) => {
    navigation.setParams({item: item , username : username });
    navigation.navigate({
        routeName: "AdminChangesScreen",
        params: {
            item: item,
            USERTYPE : navigation.getParam('USERTYPE'),
            username : username,
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
            decideWhatToDo[props.pressAction](props.content, props.navigation , props.username)
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