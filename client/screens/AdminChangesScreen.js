import React, {useState} from 'react';
import { Switch, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Title from '../components/Title';
import SearchList from '../components/SearchList';


const AdminChangesScreen = props => {
    const item = props.navigation.getParam('item');
    const [switchValue, setSwitchValue] = useState(false);
    const [amountOfPeople, setAmountOfPeople] = useState(); // show the current amount

    return (
        <View>
            <Title title='' subTitle='Here you can make any changes to the business' />
            <Text>this is {item.name} page!</Text>
            <Text>Close or Open the business:</Text>
            <View style={styles.container}>
                <Text>{switchValue?'Switch is ON':'Switch is OFF'}</Text>
                <Switch
                style={{marginTop:30}}
                onValueChange = {() => setSwitchValue(!switchValue)}
                value = {switchValue}/>
            </View>
            <Text>change the amount of people in the business:</Text>
            <TextInput
                style={styles.formControl}
                placeholder="Enter the maximum amount for people"
                onChangeText={amountOfPeople => setAmountOfPeople(amountOfPeople)}
                defaultValue={amountOfPeople}
            />
            <Button title='apply the changes' onPress={() =>{console.log(switchValue); console.log(amountOfPeople);} }/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  formControl: {
    padding: 10,
    width: '65%',
    borderColor: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 23,
  },
});

export default AdminChangesScreen