import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './SingleHourStyles';
import registerToHour from './SingleHourFunctions';

const SingleHour = props => {
  return (
    <TouchableOpacity onPress={() => registerToHour(props, props.navigation)}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {props.time}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default SingleHour;