import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import Colors from '../constants/Colors'


export default Title = props => {
    if(props.title.toUpperCase()==="CUREONA")
    return (
        <View>
            <View style={styles.imageContainer}>
                <Image style={styles.titleImage} source={require('../assets/cureonaTitle.png')}/>
            </View>
            <View >
                <Text style={styles.subTitle}>{props.subTitle}</Text>
            </View>
        </View>
    )
    if (props.subTitle) {
        return (
            <View>
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View >
                    <Text style={styles.subTitle}>{props.subTitle}</Text>
                </View>
            </View>
        )
    }
    else {
        return (
            <View >
                <Text style={styles.subTitle}>{props.title}</Text>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    title: {
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 50,
        color: Colors.primaryColor,
        fontStyle: 'italic'
    },
    subTitle: {
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        color: Colors.primaryColor,
    },
    titleImage: {
        width:'80%',
        
    },
    imageContainer:{
        alignItems:'center',
        marginVertical:25
    }
});
