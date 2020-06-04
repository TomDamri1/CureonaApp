import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import Urls from '../constants/Urls';

const AdminScreen = props => {
    const handleViewAllBusiness = async () => {
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
        props.navigation.setParams({ USERTYPE: text.type.admin, storeList: storeList });
        props.navigation.navigate({
            routeName: "CustomerSearchScreen",
            params: {
                USERTYPE: text.type.admin,
                storeList: storeList,
            }
        })
    }


    return (
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')} />
            <Title title="this is an admin screen" />
            <Button title="View all businesses" onPress={() => handleViewAllBusiness()} />
        </View>
    )
}



export default AdminScreen