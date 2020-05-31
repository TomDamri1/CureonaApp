import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import getIntoLoadingScreen from '../functions/navigationFunctions/getIntoLoadingScreen';
import requestFromUrl from '../functions/routeFunctions/requestFromUrl';
import Urls from '../constants/Urls';

const BusinessOwnerScreen = props => {
    const handleAddWorkerUserToMyBusiness = () => {
        props.navigation.setParams({company_id : company_id});
        props.navigation.navigate({
            routeName: "AddWorkerScreen",
            params : {
                company_id : company_id,
            }
        })
    }
    const company_id = props.navigation.getParam('company_id');
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
            <Title title={`your business : ${props.navigation.getParam('businessName')}`}/>
            <Button title="manage business"/>
            <Button title="view workers" onPress={ async () => {
                props.navigation.setParams({company_id : company_id});
                getIntoLoadingScreen(props.navigation);
                const workers = await requestFromUrl(Urls.routes.getMyWorkers, {
                    username : props.navigation.getParam('username'),
                });
                console.log(workers);
                props.navigation.pop();
                props.navigation.navigate({
                    routeName: "ViewWorkersScreen",
                    params : {
                        company_id : company_id,
                        username : props.navigation.getParam('username'),
                        workers : workers,
                    }
                })
            }}/>
            <Button title="Add worker user to my business" onPress={() => {
                props.navigation.setParams({company_id : company_id});
                props.navigation.navigate({
                    routeName: "AddWorkerScreen",
                    params : {
                        company_id : company_id
                    }
                })
            }} />
            <Button title={text.updateTheOpeningHoursBusinessOwner}onPress={() => {
                props.navigation.setParams({company_id : company_id});
                props.navigation.navigate({
                    routeName: "BusinessOwnerchangesScreen",
                    params : {
                        company_id : company_id
                    }
                })
            }} />

        </View>

    )
}



export default BusinessOwnerScreen