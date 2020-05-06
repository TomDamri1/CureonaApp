import React from 'react'
import { View, Text, Button } from 'react-native'
import Colors from '../../constants/Colors';
import { createQueueCancelDialog,} from './QueueItemFunctions';
import styles from './QueueItemStyles';

const QueueItem = props => {
    const queueCancelDialog = createQueueCancelDialog(props, props.navigation);
    
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.address}>
                        {props.address}
                    </Text>
                    <View style={styles.rowNoSpace}>
                        <Text>{props.date}</Text>
                        <Text>{props.hour}</Text>
                        <Button title="cancel" color={Colors.accentColor} onPress={() => queueCancelDialog()} />
                    </View>
                </View>
                <Text style={styles.code}>
                    {props.code}
                </Text>
            </View>
        </View>
    )
}
export default QueueItem;