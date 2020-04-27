import React, { useState } from 'react';
import { Switch, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import Title from '../components/Title';
import SearchList from '../components/SearchList';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls'


const AdminChangesScreen = props => {
  const item = props.navigation.getParam('item');
  const [openOrClose, setOpenOrClose] = useState(false);
  const [amountOfPeople, setAmountOfPeople] = useState('50'); // shows the current amount - need to get from the server


  const handleApply = async () => {
    const body = JSON.stringify({
      company_id : item.id,
      open : openOrClose ? "True" : "False",
      max_capacity : amountOfPeople
    });
    console.log(body)  ;
    props.navigation.navigate({
      routeName: "Loading"
    })
    const response = await fetch(Urls.routes.businessSettings, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          company_id : item.id,
          open : openOrClose ? "True" : "False",
          max_capacity : amountOfPeople
        })
      ,
    });
    const resData = await response.json();
    console.log(resData);
    props.navigation.pop();
    Alert.alert("Changes",
      `You just commited changes to the business ${item.name}.\nThe business is now : ${openOrClose?"open" : "close"}.\nThe new amount of people allowed is : ${amountOfPeople}.\n`)
  }
  return (
    <View style={styles.form}>
      <View>
        <Title title={`Here you can make any changes to ${item.name}`} />
        <View style={styles.Row}>
          <Text style={styles.label}>Close/Open</Text>
          <Switch
            onValueChange={() => setOpenOrClose(!openOrClose)}
            value={openOrClose} />
        </View>
      </View>
      <View style={styles.Row}>
        <Text style={styles.label}>People allowed:</Text>
        <TextInput
          style={styles.formControl}
          onChangeText={amountOfPeople => setAmountOfPeople(amountOfPeople)}
          defaultValue={amountOfPeople}
          keyboardType="numeric"
        />
      </View>
      <Button color={Colors.primaryColor} title='apply the changes' onPress={() => handleApply()} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  form:{
    margin:20,
  },
  formControl: {
    width: 70,
    borderColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  Row: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default AdminChangesScreen