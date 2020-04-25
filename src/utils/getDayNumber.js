let getDayNumber = (date) => {
  let now = new Date(date);
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  //console.log('Day of year: ' + day);

  return day
}


let getWeekNumber = (date) => {
  let now = new Date(date);
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  let oneWeek = 1000 * 60 * 60 * 24 * 7;
  let week = Math.floor(diff / oneWeek);
  //console.log('Day of year: ' + day);

  return week
}



export {
  getDayNumber, getWeekNumber
}