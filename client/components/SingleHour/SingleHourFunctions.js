import getIntoLoadingScreen from "../../functions/navigationFunctions/getIntoLoadingScreen";
import requestFromUrl from "../../functions/routeFunctions/requestFromUrl";
import Urls from "../../constants/Urls";
import Response from "../../constants/Response";
import text from '../../constants/text';
import { Alert } from "react-native";


const makeRegistrationHourBody = (props) => {
    return {
        Hour: props.time,
        BusinessName: props.businessName,
        Day: props.selectedDay.toLowerCase(),
        username: props.username,
        company_id: props.id
    }
}

export default registerToHour = async (props, navigation) => {
    const hour = props.time

    getIntoLoadingScreen(navigation);

    const registerHourBody = makeRegistrationHourBody(props);
    const resData = await requestFromUrl(Urls.routes.makeAnAppointment, registerHourBody)
    navigation.pop();

    if (resData.state.toLowerCase() === Response.success) {
        Alert.alert(text.alert.success, text.alert.youAreNowRegisteredToHour(hour , resData.key));
    }
    else {
        Alert.alert(text.alert.failed, text.alert.somethingWentWrong);
    }
}
