import React from 'react'
import SearchList from '../components/SearchList';

const CustomerSerchScreen = props => {
    const username = props.navigation.getParam('username')
    console.log("customer search screen : " , username )
    return (
        <SearchList navigation = {props.navigation} username={username}/>
    )
}

export default CustomerSerchScreen;