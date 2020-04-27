import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title'
import Urls from '../constants/Urls';
//import getStoreList from "../data/getStoreList";

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
        await gottenStoreList.map( store => {
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

    return (
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')} />
            <Text>this is an initial-dummy user-screen </Text>
            <Button title="Search a Business" onPress={() => handleSearchABusinessPress()} />
            <Button title="my queues" />

        </View>

    )
}



export default CustomerScreen