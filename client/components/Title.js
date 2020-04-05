import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import Colors from '../constants/Colors'


export default Title = props => {
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
      padding:50,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 50,
      color: Colors.primaryColor,
      fontStyle: 'italic'
    },
    subTitle: {
      padding:0,
      textAlign: 'center', 
      fontWeight: 'bold',
      fontSize: 35,
      color: Colors.primaryColor,
    },
    titleImage : {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    }
  });
  