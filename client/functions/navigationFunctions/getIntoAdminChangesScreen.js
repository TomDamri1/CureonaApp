export default (props, navigation)=> {
    const username = props.username;
    const item = props.content;

    navigation.setParams({ item: item, username: username });
    navigation.navigate({
        routeName: "AdminChangesScreen",
        params: {
            item: item,
            USERTYPE: navigation.getParam('USERTYPE'),
            username: username,
        }
    });
}