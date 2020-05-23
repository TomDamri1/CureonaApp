export default async (route , requestBody) => {
    //console.log(requestBody);
    const response = await fetch(route, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    const resData = await response.json();
    //console.log("from inside :",resData)
    return resData;
}
