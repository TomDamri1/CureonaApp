import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title'
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
//import getStoreList from "../data/getStoreList";

const STORE_NAME = 0;
const DATE = 1;
const HOUR = 2;
const CODE = 3;
const ADDRESS = 4;

const CustomerScreen = props => {
    const username = props.navigation.getParam('username');
    console.log(username)
    const handleSearchABusinessPress = async () => {
        props.navigation.navigate({
            routeName: "Loading"
        })
        const response = await fetch(Urls.routes.getBusiness, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        });

        const gottenStoreList = await response.json();
        var storeList = [];
        await gottenStoreList.map(store => {
            const newStore = {
                id: store.company_id,
                name: store.business_name,
                address: store.address,
                keywords: [...store.search_key],
            }
            storeList.push(newStore);
        })

        console.log(storeList);


        props.navigation.pop(); //pop out the loading screen from the stack 
        props.navigation.setParams({ username: username, storeList: storeList });
        props.navigation.navigate({
            routeName: "CustomerSearchScreen",
            params: {
                username: username,
                storeList: storeList,
            }
        })
    }
    const handleMyQueuesPress = async () => {
        props.navigation.navigate({
            routeName: "Loading"
        })
        const response = await fetch(Urls.routes.getMyQueue, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            }),
        });

        const queues = await response.json();
        var queuesList = [];
        await queues.map(queue => {
            const newQueue = {
                id: queue[CODE],
                code: queue[CODE],
                businessName: queue[STORE_NAME],
                address: queue[ADDRESS],
                date: queue[DATE],
                hour: queue[HOUR],
            }
            queuesList.push(newQueue);
        })

        console.log(queuesList);


        props.navigation.pop(); //pop out the loading screen from the stack 
        props.navigation.setParams({ username: username, queuesList: queuesList });
        props.navigation.navigate({
            routeName: "CustomerQueuesScreen",
            params: {
                username: username,
                queuesList: queuesList,
            }
        })
    }

    return (
        <View style={styles.form}>
            <Title title="cureona" />
            <View style={styles.buttonContainer}>
                <Button
                    title="Search a Business"
                    onPress={() => handleSearchABusinessPress()}
                    color={Colors.primaryColor}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="my queues"
                    onPress={() => handleMyQueuesPress()}
                    color = {Colors.accentColor}
                />
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    form: {

    },
    buttonContainer: {
        marginHorizontal: 30,
        marginVertical:20,
    }

});




export default CustomerScreen