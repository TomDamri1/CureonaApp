import getIntoLoadingScreen from "../../functions/navigationFunctions/getIntoLoadingScreen";
import requestFromUrl from "../../functions/routeFunctions/requestFromUrl";
import Urls from "../../constants/Urls";
import Response from "../../constants/Response";
import text from '../../constants/text';
import { Alert } from "react-native";


const makeRegistrationHourBody = (props) => {
    const x = {
        Hour: props.time,
        BusinessName: props.businessName,
        Day: props.selectedDay.toLowerCase(),
        username: props.username,
        company_id: props.id
    }
    console.log("x=" ,x);
    return x;
}

export default registerToHour = async (props, navigation) => {
    const hour = props.time
    getIntoLoadingScreen(navigation);
    const registerHourBody = makeRegistrationHourBody(props);
    const resData = await requestFromUrl(Urls.routes.makeAnAppointment, registerHourBody)
    console.log(resData);
    navigation.pop();
    
}
