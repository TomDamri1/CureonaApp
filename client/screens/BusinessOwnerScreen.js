import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Title from '../components/Title';
import text from '../constants/text';
import getIntoLoadingScreen from '../functions/navigationFunctions/getIntoLoadingScreen';
import requestFromUrl from '../functions/routeFunctions/requestFromUrl';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';


const getDataSample = async (company_id) =>{
    let weeklyData = {}
    const res = await requestFromUrl(Urls.routes.avgStats,{company_id : company_id})
    await Object.keys(res).map( async (key,index) => {
        let dayData =[{seriesName: 'series1',
        data: [
        ],
        color: Colors.primaryColor}];
         Object.keys(res[key]).map((hour, i) => {
            dayData[0].data.push({x:hour, y:parseFloat(res[key][hour])});
        })
        weeklyData[key] = dayData;
    })
    return weeklyData;
}


const BusinessOwnerScreen = props => {
    const company_id = props.navigation.getParam('company_id');
    const [amountOfCustomersInBusiness, setAmountOfCustomersInBusiness] = useState('0');
    const [maxCapacity, setMaxCapacity] = useState('0');
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

    return (
        <View>
            <Title title="welcome!" subTitle={props.navigation.getParam('username')} />
            <Title title={`your business : ${props.navigation.getParam('businessName')}`} />
            <Button title="manage business" onPress={() => {
                props.navigation.setParams({ company_id: company_id });
                props.navigation.navigate({
                    routeName: "ManageBusiness",
                    params: {
                        company_id: company_id
                    }
                })
            }} />
            <Button title="view workers" onPress={async () => {
                console.log(props.navigation.getParam('username'))
                props.navigation.setParams({ company_id: company_id });
                getIntoLoadingScreen(props.navigation);
                const workers = await requestFromUrl(Urls.routes.getMyWorkers, {
                    username: props.navigation.getParam('username'),
                });
                console.log(workers);
                props.navigation.pop();
                props.navigation.navigate({
                    routeName: "ViewWorkersScreen",
                    params: {
                        company_id: company_id,
                        username: props.navigation.getParam('username'),
                        workers: workers,
                    }
                })
            }} />
            <Button title="Add worker user to my business" onPress={() => {
                props.navigation.setParams({ company_id: company_id });
                props.navigation.navigate({
                    routeName: "AddWorkerScreen",
                    params: {
                        company_id: company_id
                    }
                })
            }} />
            <Button title={text.updateTheOpeningHoursBusinessOwner} onPress={() => {
                props.navigation.setParams({ company_id: company_id });
                props.navigation.navigate({
                    routeName: "BusinessOwnerchangesScreen",
                    params: {
                        company_id: company_id
                    }
                })
            }} />

            <Button title="statistics" onPress={ async () => {
                getIntoLoadingScreen(props.navigation);
                const data = await getDataSample(company_id);
                props.navigation.pop();
                props.navigation.setParams({ company_id: company_id, data : data });
                props.navigation.navigate({
                    routeName: "BusinessStatistics",
                    params: {
                        company_id: company_id,
                        data : data,
                        max_capacity : maxCapacity,
                    }
                }
                )
            }

            }
            />

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
    customerNubmerText: {
        alignItems: "center",
        margin: 20,
    }

})


export default BusinessOwnerScreen