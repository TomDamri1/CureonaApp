import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title'

const BusinessOwnerScreen = props => {
    const company_id = props.navigation.getParam('company_id');
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
            <Title title={`your business : ${props.navigation.getParam('businessName')}`}/>
            <Button title="manage business"/>
            <Button title="manage workers"/>
            <Button title="Add worker user to my business" onPress={() => {
                props.navigation.setParams({company_id : company_id});
                props.navigation.navigate({
                    routeName: "AddWorkerScreen",
                    params : {
                        company_id : company_id
                    }
                })
            }} />
            <Button title="Update business opening hours" onPress={() => {
                props.navigation.setParams({company_id : company_id});
                props.navigation.navigate({
                    routeName: "BOchangesScreen",
                    params : {
                        company_id : company_id
                    }
                })
            }} />

        </View>

    )
}



export default BusinessOwnerScreen