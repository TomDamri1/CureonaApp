import Urls from '../../constants/Urls';
import text from '../../constants/text';
import Response from '../../constants/Response';
import { Alert } from 'react-native';
import getIntoLoadingScreen from '../../functions/navigationFunctions/getIntoLoadingScreen';
import requestFromUrl from '../../functions/routeFunctions/requestFromUrl';
import getIntoCustomerQueuesScreen from '../../functions/navigationFunctions/getIntoCustomerQueuesScreen';

const deleteAppointment = async (requestBody) => {

    const response = await requestFromUrl(Urls.routes.deleteAppointment, requestBody);
    return (response);
}

const makeAppointmentFromProps = (props) => {
    return {
        business_name: props.title,
        username: props.username,
        code: props.code,
        date: props.date,
        time: props.hour
    }
}

const getIntoQueuesAgain = async (props, navigation) => {
    const queues = await getQueues(props.username);
    const queuesList = await getQueueList(queues);

    console.log(queuesList);
    getIntoCustomerQueuesScreen(navigation, props.username, queuesList);
}

const deleteAndReloadPage = async (props, navigation) => {
    const thisAppointment = await makeAppointmentFromProps(props);
    getIntoLoadingScreen(navigation);
    const res = await deleteAppointment(thisAppointment)
    navigation.pop();
    getIntoQueuesAgain(props, navigation)

    if (res.state === Response.success) {
        Alert.alert(text.alert.success, res.msg)
    }
    else {
        Alert.alert(text.alert.failed, res.msg)
    }
}

const createYesButton = (props, navigation) => {
    return {
        text: text.alert.yes,
        onPress: () => deleteAndReloadPage(props, navigation),
    }
}

const createNoButton = () => {
    return {
        text: text.alert.no,
        onPress: () => { },
        style: "cancel"
    }
}

export const createQueueCancelDialog = (props, navigation) => {
    const yesButton = createYesButton(props, navigation);
    const noButton = createNoButton();
    return async () => {
        Alert.alert(
            text.alert.cancelAppointment,
            text.alert.wouldYouLikeToCancelQueueToBusinessnameInDateAndHour(props.title, props.date, props.hour),
            [yesButton, noButton]);
    }
}

const getQueues = async (username) => {
    const requestBody = { username: username }
    const resData = await requestFromUrl(Urls.routes.getMyQueue, requestBody);
    return resData;
}
async function getQueueList(queues) {

    const STORE_NAME = 0;
    const DATE = 1;
    const HOUR = 2;
    const CODE = 3;
    const ADDRESS = 4;

    var queuesList = [];
    await queues.map(queue => {
        const newQueue = {
            id: queue[CODE],
            code: queue[CODE],
            businessName: queue[STORE_NAME],
            address: queue[ADDRESS],
            date: queue[DATE],
            hour: queue[HOUR],
        };
        queuesList.push(newQueue);
    });
    return queuesList;
}

