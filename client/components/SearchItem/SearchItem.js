import React from 'react'
import { View, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './SearchItemStyles'
import Urls from '../../constants/Urls'
import ChooseBetweenAdminAndCustomer from './SearchItemFunctions';





//props.pressAction](props, props.navigation)

const SearchItem = props => {
    return (
        <TouchableOpacity onPress={() =>
            ChooseBetweenAdminAndCustomer(props.pressAction,props, props.navigation)
        }>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <View style={styles.row}>
                    <Text>
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


export default SearchItem;