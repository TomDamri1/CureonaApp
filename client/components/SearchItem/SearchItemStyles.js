import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

export default StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        height:80,
        padding: 10,
        alignContent:"center"
    },
    rowNoSpace : {
        borderLeftColor : Colors.accentColor,
        borderLeftWidth : 2,
        width : "35%",
        paddingLeft:10,
        height : 50,
        alignContent:"center",
    },
})