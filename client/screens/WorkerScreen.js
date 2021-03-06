import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import Response from '../constants/Response';

//stxjwi - worker name

const WorkerScreen = props => {
    const [entranceKey, setEntranceKey] = useState('');
    const [pass, setPass] = useState('#fff');
    const [canTheUserGetIn, setCanTheUserGetIn] = useState(false);
    const username = props.navigation.getParam('username');
    const company_id = props.navigation.getParam('company_id');
    console.log(company_id)

    const handleInPress = async () => {
        props.navigation.navigate({
            routeName: "Loading"
        })
        console.log(JSON.stringify({
            company_id: company_id,
            key: entranceKey,
        }))
        const response = await fetch(Urls.routes.letsUserIntoBusiness, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_id: company_id,
                key: entranceKey,
            }),
        });
        const resData = await response.json();
        console.log(resData);
        props.navigation.pop();
        if (resData.state == Response.success) {
            Alert.alert(text.alert.success, text.alert.theUserCanGetIn)
            setPass(Colors.success);
            setCanTheUserGetIn(true);
        }

        if (resData.state == Response.failed) {
            Alert.alert(text.alert.failed, text.alert.theUserCannotGetIn)
            setPass(Colors.fail);
            setCanTheUserGetIn(false);
        }

        else {
            Alert.alert(text.alert.failed, text.alert.theUserCannotGetIn)
            setPass(Colors.fail);
            setCanTheUserGetIn(false);
        }

    }
    const handleOutPress = async () => {

    }

    return (
        <View style={styles.form}>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')} />
            <Text style={styles.label}>Enter user code here</Text>
            <TextInput
                placeholder={text.placeholder.code}
                style={styles.input}
                value={entranceKey}
                onChangeText={text => setEntranceKey(text)}
            />
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button
                        color={Colors.primaryColor}
                        title="IN"
                        onPress={() => handleInPress()}
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        color={Colors.accentColor}
                        title="OUT"
                        onPress={() => handleOutPress()}
                    />
                </View>
            </View>
            <View style={{ ...styles.getinTextContainer, backgroundColor: pass }}>
                <Text style={styles.getinText}>{canTheUserGetIn ? text.theUserCanGetIn : text.theUserCannotGetIn}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    label: {
        marginTop: 30,
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
    buttonRow: {
        flexDirection: "row",
    },
    button: {
        margin: "5%",
        width: "40%"
    },
    getinText : {
        fontSize :25,
        color : 'white',
        letterSpacing:1.2
    },
    getinTextContainer : {
        paddingTop:5,
        width: '100%', 
        height: 50,
        textAlign:"center",
        alignItems:"center"
    }

})

export default WorkerScreen
