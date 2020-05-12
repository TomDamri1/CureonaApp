export const generateHourList = () => {
    let hourList = [];
    for (let index = 0; index < 24; index++) {
      var num = index.toString();
      if (num.length < 2) {
        num = "0" + num;
      }
      hourList.push([num, num]);
    }
    return hourList;
  }
export const generateMinuteList = () => {
    let hourList = [];
    for (let index = 0; index < 60; index++) {
      var num = index.toString();
      if (num.length < 2) {
        num = "0" + num;
      }
      hourList.push([num, num]);
    }
    return hourList;
}