import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import text from '../constants/text'


/*
props : 
businessNameState
cidState
ownerNameState
ownerLastNameState
ownerIdState
*/
const BusinessOwnerRegistration = (props) => {
     const [businessName, setBusinessName] = props.businessNameState
     const [cid, setCid] = props.cidState
     const [ownerName, setOwnerName] = props.ownerNameState
     const [ownerLastName, setOwnerLastName] = props.ownerLastNameState
     const [ownerId, setOwnerId] = props.ownerIdState
    if (!props.isBusinessOwner) {
        return <View />
    }
    return (
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>{text.businessName}</Text>
                <TextInput
                    placeholder={text.placeholder.businessName}
                    style={styles.input}
                    value={businessName}
                    onChangeText={text => {setBusinessName(text) }}
                    returnKeyType="next"
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>{text.cid}</Text>
                <TextInput
                    placeholder={text.placeholder.cid}
                    style={styles.input}
                    value={cid}
                    onChangeText={text => {setCid(text) }}
                    returnKeyType="next"
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>{text.ownerId}</Text>
                <TextInput
                    placeholder={text.placeholder.ownerId}
                    style={styles.input}
                    value={ownerId}
                    onChangeText={text => {setOwnerId(text) }}
                    returnKeyType="next"
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>{text.ownerName}</Text>
                <TextInput
                    placeholder={text.placeholder.ownerName}
                    style={styles.input}
                    value={ownerName}
                    onChangeText={text => {setOwnerName(text) }}
                    returnKeyType="next"
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>{text.ownerLastName}</Text>
                <TextInput
                    placeholder={text.placeholder.ownerLastName}
                    style={styles.input}
                    value={ownerLastName}
                    onChangeText={text => {setOwnerLastName(text) }}
                    returnKeyType="next"
                />
            </View>
        </View>
    )
}

export default BusinessOwnerRegistration

const styles = StyleSheet.create({
    image: {
        alignItems: 'center'
    },
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
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
    Instructions:
    {
        marginVertical: 8,
        color: 'red',
        fontSize: 12,
    },
    gap: {
        margin: 50,
    },
})
