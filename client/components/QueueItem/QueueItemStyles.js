import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    rowNoSpace: {
        marginTop: -30,
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
    },
    code: {
        fontSize: 18,
        marginTop: -20,
        fontWeight: "bold"
    }

})