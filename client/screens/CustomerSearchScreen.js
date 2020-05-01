import React from 'react'
import SearchList from '../components/SearchList';
import Urls from  '../constants/Urls'


const CustomerSerchScreen = props => {
    const username = props.navigation.getParam('username')
    return (
        <SearchList navigation = {props.navigation} username={username}/>
    )
}

export default CustomerSerchScreen;