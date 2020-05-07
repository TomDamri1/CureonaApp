
import text from '../../constants/text';

const getStoreList = (navigation) => {
    return navigation.getParam('storeList');
}

const matchByName = (data , searchInput)=> {
    return data.filter(item => item.name.toUpperCase().includes(searchInput.toUpperCase()));
}
const matchByKey = (data , searchInput) => {
    return data.filter(item => item.keywords.filter(keyword => keyword.toUpperCase().includes(searchInput.toUpperCase())).length > 0)
}
const makeASetFromMatches = (nameMatch , keyMatch) => {
    return  [...new Set([...nameMatch.map(item => item.id), ...keyMatch.map(item => item.id)])];
}
const generateDispalyData = (displayIds,data) => {
    return data.filter(item => displayIds.indexOf(item.id) > -1)
}
export default filterData = (navigation, searchInput, setFilteredData) => {
    const data = getStoreList(navigation)
    const nameMatch = matchByName(data , searchInput);
    const keyMatch = matchByKey(data , searchInput);
    const displayIds = makeASetFromMatches(nameMatch,keyMatch);
    const display = generateDispalyData(displayIds,data);
    
    setFilteredData([...display]);
}

export const getAction = (navigation) => {
    if (navigation.getParam('USERTYPE') === text.type.admin) {
        return text.decisions.adminChanges;
    }
    else {
        return text.decisions.makeAnAppointment;
    }
}