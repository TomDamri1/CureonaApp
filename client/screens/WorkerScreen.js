import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import Response from '../constants/Response';
import requestFromUrl from '../functions/routeFunctions/requestFromUrl';

//stxjwi - worker name



const WorkerScreen = props => {
    const [entranceKey, setEntranceKey] = useState('');
    const [pass, setPass] = useState('#fff');
    const [canTheUserGetIn, setCanTheUserGetIn] = useState(false);
    const [amountOfCustomersInBusiness, setAmountOfCustomersInBusiness] = useState('0');
    const [maxCapacity, setMaxCapacity] = useState('0');
    const username = props.navigation.getParam('username');
    const company_id = props.navigation.getParam('company_id');


    console.log(company_id)

    const handleSpontaneousAppointment = async () => {

        const resData = await requestFromUrl(Urls.routes.SpontaneousAppointment, { "company_id": company_id, "cellphone": entranceKey });
        console.log(resData);
        if (resData.state === "success") {
            Alert.alert("Success", "the user can get it.");
            setPass(Colors.success);
            setCanTheUserGetIn(true);
            setEntranceKey('');
        }
        else {
            Alert.alert("Falied", "something went wrong, check the details you'v entered.");
            console.log(resData);
            setPass(Colors.fail);
            setCanTheUserGetIn(false);
        }
    }

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

        else if (resData.state == Response.failed) {
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
    const checkAmountOfPeaple = async (company_id) => {
        const req = await requestFromUrl(Urls.routes.preciseAmount, { company_id: company_id });
        return req;
    }
    useEffect(() => {
        const interval = setInterval(async () => {
            const counter = await checkAmountOfPeaple(company_id)
            const AmountOfPeaple = counter["current_amount_in_business "];
            const MaxCapacity = counter.max_capacity;
            console.log(counter);
            setAmountOfCustomersInBusiness(AmountOfPeaple);
            setMaxCapacity(MaxCapacity);
        }, 5000);
        return () => clearInterval(interval);
    })

    const handleOutPress = async () => {
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
            Alert.alert(text.alert.success, text.alert.theUserCanGetOut)
            setPass(Colors.success);
            setCanTheUserGetIn(true);
        }

        else {
            Alert.alert(text.alert.failed, text.alert.theUserCannotGetOut)
            setPass(Colors.fail);
            setCanTheUserGetIn(false);
        }
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
            <View>
                <Button
                    color={Colors.primaryColor}
                    title="Spontaneous Appointment"
                    onPress={() => handleSpontaneousAppointment()}
                />
            </View>
            <View style={{ ...styles.getinTextContainer, backgroundColor: pass }}>
                <Text style={styles.getinText}>{canTheUserGetIn ? text.theUserCanGetIn : text.theUserCannotGetIn}</Text>
            </View>
            <View style={styles.customerNubmerText}>
                <Text style={styles.label}>{amountOfCustomersInBusiness} / {maxCapacity}</Text>
                <Text>Customers in the shop</Text>
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
    getinText: {
        fontSize: 25,
        color: 'white',
        letterSpacing: 1.2
    },
    getinTextContainer: {
        paddingTop: 5,
        width: '100%',
        height: 50,
        textAlign: "center",
        alignItems: "center"
    },
    customerNubmerText:{
        alignItems:"center",
        margin : 20,
    }

})

export default WorkerScreen
