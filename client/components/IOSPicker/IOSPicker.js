import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import Colors from "../../constants/Colors";


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
    if(props.itemToDisplay !== undefined){
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
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {generateTouchableButtons()}
                    </View>
                </View>
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

const styles = StyleSheet.create({
    centeredView: {
        /*flex: 1,
        justifyContent: "center",
        /*alignItems: "center",*/
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: '50%',
    },
    openButton: {
        backgroundColor: "#fff",
        padding: 10,
        width: '100%',
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
        fontSize: 20,
        color: Colors.primaryColor,
    }
});

export default IOSModal;