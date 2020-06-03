import React, {useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Title from '../components/Title'
import MOTD from '../components/MOTD/MOTD';

const ManageBusiness = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const company_id = props.navigation.getParam('company_id');
    return (
        <View>
            <Title title="Manage your business"/>
            <View>
                <Button title="Enter new MOTD" onPress={()=>setModalVisible(!modalVisible)}/>
                <MOTD modalVisible={[modalVisible,setModalVisible]} company_id={company_id} navigation={props.navigation}/>
            </View>
        </View>
    )
}

export default ManageBusiness

const styles = StyleSheet.create({})
