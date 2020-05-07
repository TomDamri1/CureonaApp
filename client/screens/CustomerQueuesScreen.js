import React from 'react'
import { StyleSheet, View } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import { FlatList } from 'react-native-gesture-handler';
import QueueItem from '../components/QueueItem/QueueItem';


const CustomerQueuesScreen = props => {
    const username = props.navigation.getParam('username');
    const queuesList = props.navigation.getParam('queuesList');
    console.log("username : ",username);

    
    return (
        <View>
            <Title title={text.screenHeaders.myQueues}/>
            <FlatList
                    data={queuesList}
                    style={styles.gap}
                    renderItem={({ item }) =>
                        <QueueItem
                            username = {username}
                            title={item.businessName}
                            address={item.address}
                            date={item.date}
                            hour={item.hour}
                            content = {item}
                            navigation={props.navigation}
                            id = {item.id}
                            code = {item.code}
                        />}
                    keyExtractor={item => item.id}
            />
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    gap: {
        marginBottom: 100,
    },
})

export default CustomerQueuesScreen;