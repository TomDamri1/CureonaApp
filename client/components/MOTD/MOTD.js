import React, {useState } from 'react'
import { StyleSheet, Text, View, Modal, Button, ScrollView, TextInput, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import requestFromUrl from '../../functions/routeFunctions/requestFromUrl';
import Urls from '../../constants/Urls';
import getIntoLoadingScreen from '../../functions/navigationFunctions/getIntoLoadingScreen';
import text from '../../constants/text';


const MOTD = (props) => {
    const [modalVisible, setModalVisible] = props.modalVisible
    const [motd, setMotd] = useState('');
    
    return (
        <View style={{ ...styles.centeredView, ...props.style }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <ScrollView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>{text.MOTD}</Text>
                            <TextInput
                                placeholder={text.enterYourMotd}
                                style={styles.input}
                                value={motd}
                                onChangeText={text => setMotd(text)}

                            />
                        </View>
                        <View style={styles.row}>
                        <Button title={text.cancel}
                            color = {Colors.accentColor}
                            onPress={() => {
                                setModalVisible(false);
                            }} 
                        />
                        <Button title={text.publish}
                            color = {Colors.primaryColor}
                            onPress={async () => {
                                setModalVisible(false);
                                getIntoLoadingScreen(props.navigation)
                                const resData = await requestFromUrl(Urls.routes.updateMyMessage, {
                                    company_id : props.company_id,
                                    msg: motd,
                                })
                                const resData_confirmed = await requestFromUrl(Urls.routes.getBusinessMessage, {
                                    company_id : props.company_id,
                                })
                                props.navigation.pop();
                                if (resData.state === "success"){
                                    Alert.alert("Success!",`your message: "${resData_confirmed.msg}" has been recorded`)
                                    
                                }
                                else{
                                    setModalVisible(true);
                                    Alert.alert("Failed!","you may try again")
                                }
                                
                            }} 
                        />
                        </View>


                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default MOTD

const styles = StyleSheet.create({
    centeredView: {
        marginTop: 22,
    },
    row:{
        marginTop: 30,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginTop: '50%',

    },
    openButton: {
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 10,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textStyle: {
        fontSize: 20,
        color: "teal",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    listItem: {
        height: 50,
        fontSize: 20,

    },
    itemInList: {
        fontSize: 16,
        color: Colors.primaryColor,
    },
    label: {
        marginVertical: 8,
        fontWeight: 'bold',
        fontSize: 18,
      },
      input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
      },
})
