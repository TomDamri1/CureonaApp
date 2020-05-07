import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import SearchItem from '../SearchItem/SearchItem';
import { TextInput } from 'react-native-gesture-handler';
import text from '../../constants/text';
import styles from './SearchListStyles';
import filterData ,{getAction} from './SearchListFunctions';

const SearchList = props => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        filterData(props.navigation, searchInput, setFilteredData);
        console.log(filteredData)
    }, [searchInput])

    return (

        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{text.searchBusiness}</Text>
                    <TextInput
                        style={styles.input}
                        value={searchInput}
                        onChangeText={text => setSearchInput(text)}
                    />
                </View>
            </TouchableWithoutFeedback >

            <FlatList
                style={styles.gap}
                data={filteredData}
                renderItem={({ item }) =>
                    <SearchItem
                        title={item.name}
                        address={item.address}
                        keywords={item.keywords}
                        pressAction={getAction(props.navigation)}
                        content={item}
                        navigation={props.navigation}
                        username={props.username}
                        id={item.id}
                    />}
                keyExtractor={item => item.id}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.gap} />

            </TouchableWithoutFeedback>
        </View>

    )
}



export default SearchList;