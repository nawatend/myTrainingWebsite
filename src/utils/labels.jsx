

let getLabels = () => {


    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let d = new Date();
    let dayName = days[d.getMonth()];

    return {
        day: [

            (days[d.getDay() - 6]) ? days[d.getDay() - 6] : days[days.length - (6 - d.getDay())],
            (days[d.getDay() - 5]) ? days[d.getDay() - 5] : days[days.length - (5 - d.getDay())],
            (days[d.getDay() - 4]) ? days[d.getDay() - 4] : days[days.length - (4 - d.getDay())],
            (days[d.getDay() - 3]) ? days[d.getDay() - 3] : days[days.length - (3 - d.getDay())],
            (days[d.getDay() - 2]) ? days[d.getDay() - 2] : days[days.length - (2 - d.getDay())],
            (days[d.getDay() - 1]) ? days[d.getDay() - 1] : days[days.length - (1 - d.getDay())],
            days[d.getDay()]
        ],
        week: ["Week 1", "Week 2", "Week 3", "Week 4"],
        // month: [
        //     (months[d.getMonth() - 11]) ? months[(d.getMonth() - 11)] : months[months.length - (11 - d.getMonth())],
        //     (months[d.getMonth() - 10]) ? months[(d.getMonth() - 10)] : months[months.length - (10 - d.getMonth())],
        //     (months[d.getMonth() - 9]) ? months[(d.getMonth() - 9)] : months[months.length - (9 - d.getMonth())],
        //     (months[d.getMonth() - 8]) ? months[(d.getMonth() - 8)] : months[months.length - (8 - d.getMonth())],
        //     (months[d.getMonth() - 7]) ? months[(d.getMonth() - 7)] : months[months.length - (7 - d.getMonth())],
        //     (months[d.getMonth() - 6]) ? months[(d.getMonth() - 6)] : months[months.length - (6 - d.getMonth())],
        //     (months[d.getMonth() - 5]) ? months[(d.getMonth() - 5)] : months[months.length - (5 - d.getMonth())],
        //     (months[d.getMonth() - 4]) ? months[(d.getMonth() - 4)] : months[months.length - (4 - d.getMonth())],
        //     (months[d.getMonth() - 3]) ? months[(d.getMonth() - 3)] : months[months.length - (3 - d.getMonth())],
        //     (months[d.getMonth() - 2]) ? months[(d.getMonth() - 2)] : months[months.length - (2 - d.getMonth())],
        //     (months[d.getMonth() - 1]) ? months[(d.getMonth() - 1)] : months[months.length - (1 - d.getMonth())],
        //     months[d.getMonth()]],
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        year: [d.getFullYear() - 4, d.getFullYear() - 3, d.getFullYear() - 2, d.getFullYear() - 1, d.getFullYear()]
    }
}
export default getLabels