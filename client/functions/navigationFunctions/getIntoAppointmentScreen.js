
export default (props , navigation , schedule, motd) => {
    const username = props.username;
    const item = props.content;
    navigation.setParams({ item: item, username: username, schedule: schedule, motd: motd });
    navigation.navigate({
        routeName: "AppointmentScreen",
        params: {
            motd : motd,
            item: item,
            username: username,
            schedule: schedule,
        }
    });
}