import Colors from "../../constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    centeredView: {
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
        elevation: 10,
        marginTop: '50%',
    },
    openButton: {
        borderRadius:5,
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
    }
});