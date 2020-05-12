import getIntoLoadingScreen from '../../functions/navigationFunctions/getIntoLoadingScreen';
import Urls from '../../constants/Urls';
import getIntoAppointmentScreen from '../../functions/navigationFunctions/getIntoAppointmentScreen';
import requestFromUrl from '../../functions/routeFunctions/requestFromUrl';
import getIntoAdminChangesScreen from '../../functions/navigationFunctions/getIntoAdminChangesScreen';


export default ChooseBetweenAdminAndCustomer = (action, props, navigation) => {
    console.log("got to : ChooseBetweenAdminAndCustomer")
    const decideWhatToDo = {
        "makeAnAppointment": makeAnAppointment,
        "adminChanges": getIntoAdminChangesScreen,
    }
    return decideWhatToDo[action](props, navigation)
}


const makeAnAppointment = async (props, navigation) => {
    const item = props.content;
    console.log("got to : makeAnAppointment")
    getIntoLoadingScreen(navigation);
    try {
        const resData = await getAvailableQueues(item);
        navigation.pop();
        if (resData.state === "success") {
            getIntoAppointmentScreen(props, navigation, resData);
        }
    }
    catch{
        Alert.alert("somthing went wrong , try again");
    }
}

const getAvailableQueues = async (item) => {
    console.log("got to : getAvailableQueues")
    const requestBody = { company_id: item.id }
    const response = await requestFromUrl(Urls.routes.availableQueues, requestBody)
    console.log(response);
    return response;
}

