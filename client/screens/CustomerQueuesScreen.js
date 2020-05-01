import React from 'react'
import SearchList from '../components/SearchList';
import Urls from  '../constants/Urls'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import { FlatList } from 'react-native-gesture-handler';
import QueueItem from '../components/QueueItem';


const CustomerQueuesScreen = props => {
    const username = props.navigation.getParam('username');
    const queuesList = props.navigation.getParam('queuesList');
    console.log(queuesList);

    
    return (
        <View>
            <Title title={text.screenHeaders.myQueues}/>
            <FlatList
                    data={queuesList}
                    renderItem={({ item }) =>
                        <QueueItem
                            title={item.businessName}
                            address={item.address}
                            date={item.date}
                            hour={item.hour}
                            content = {item}
                            navigation={props.navigation}
                            username={props.username}
                            id = {item.id}
                        />}
                    keyExtractor={item => item.id}
            />
        </View>
    )
}

export default CustomerQueuesScreen;