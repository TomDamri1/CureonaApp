import Urls from '../constants/Urls';

export default async () => {
      // extract data from server
    const response = await fetch(Urls.routes.getBusiness, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
  
      const resData = await response.json();
      // console.log("=====================================")
      // console.log(resData);
      // console.log("=====================================")

    //retrun date in the front format
    return resData;
}