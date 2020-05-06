export default (props , navigation , schedule) => {
    const username = props.username;
    const item = props.content;
    
    navigation.setParams({ item: item, username: username, schedule: schedule, });
    navigation.navigate({
        routeName: "AppointmentScreen",
        params: {
            item: item,
            username: username,
            schedule: schedule,
        }
    });
}