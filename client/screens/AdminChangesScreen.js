import React, { useState } from 'react';
import { Switch, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import Title from '../components/Title';
import SearchList from '../components/SearchList';
import Colors from '../constants/Colors';


const AdminChangesScreen = props => {
  const item = props.navigation.getParam('item');
  const [switchValue, setSwitchValue] = useState(false);
  const [amountOfPeople, setAmountOfPeople] = useState('50'); // shows the current amount - need to get from the server

  const handleApply = () => {
    Alert.alert("Changes",
      `You just commited changes to the business ${item.name}.\nThe business is now : ${switchValue?"open" : "close"}.\nThe new amount of people allowed is : ${amountOfPeople}.\n`)
  }
  return (
    <View style={styles.form}>
      <View>
        <Title title={`Here you can make any changes to ${item.name}`} />
        <View style={styles.Row}>
          <Text style={styles.label}>Close/Open</Text>
          <Switch
            onValueChange={() => setSwitchValue(!switchValue)}
            value={switchValue} />
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