import React, { useState } from "react";
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    ScrollView
} from "react-native";
import styles from './IOSPickerStyles';


/*
    gets in props :
    1. list of items in the next way :
        for each item includes the next list:
        data = {[<label to display> , <value>]}
    2. the current label to display : 
        itemToDisplay = {"some display name"}
        if you want to use the first item on the data pass nothing.
    3. a function to change the selected value : 
        setSelectedItem = {setSelectedItem}
*/
const IOSModal = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const data = props.data;
    var firstItemToDisplay ='';
    if(props.itemToDisplay === undefined){
        firstItemToDisplay = data[0][0];
    }
    else {
        firstItemToDisplay = props.itemToDisplay
    }
    const [itemToDisplay , setItemToDisplay] = useState(firstItemToDisplay);
    const setSelectedItem = props.setSelectedItem;
    const hanldeItemPress = (item) => {
        setModalVisible(false);
        setSelectedItem(item[1]);
        setItemToDisplay(item[0]);
    };

    const generateTouchableButtons = () => {
        let displayItems = [];
        data.map(item => {
            displayItems.push(
                <View key={item[0]} style={styles.listItem}>
                    <TouchableHighlight onPress={() => hanldeItemPress(item)}>
                        <Text style={styles.itemInList}>{item[0]}</Text>
                    </TouchableHighlight>
                </View>
            )
        })
        return displayItems;
    }
    return (
        <View style={{...styles.centeredView, ...props.style}}>
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
                        {generateTouchableButtons()}
                    </View>
                </ScrollView>
            </Modal>

            <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={styles.textStyle}>{itemToDisplay}</Text>
            </TouchableHighlight>
        </View>
    );
};



export default IOSModal;