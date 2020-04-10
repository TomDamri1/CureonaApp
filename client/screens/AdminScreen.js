import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text'

const AdminScreen = props => {
    return(
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')}/>
            <Title title="this is an admin screen"/>
            <Title title="with alot of fancy options"/>
            <Button title="try" onPress={()=>{props.navigation.navigate({
                routeName : "CustomerSearchScreen",
                params : {
                    USERTYPE : text.type.admin
                }
            })}}/>
        </View>
        
    )
}



export default AdminScreen