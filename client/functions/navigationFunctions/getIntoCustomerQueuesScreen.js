export default (navigation, username,queuesList) =>{
    navigation.setParams({ username: username, queuesList: queuesList });
    navigation.navigate({
        routeName: "CustomerQueuesScreen",
        params: {
            username: username,
            queuesList: queuesList,
        }
    })
}