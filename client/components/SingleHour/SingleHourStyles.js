import Colors from '../../constants/Colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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