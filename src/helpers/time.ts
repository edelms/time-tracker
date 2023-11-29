
export function parseTime(value: string) {

    /* Available input formats
        1pm             => 13:00
        1am             => 01:00
        1:00pm          => 13:00
        1:00am          => 01:00
        1:00p           => 13:00
        1:00a           => 01:00
        1:00 a          => 01:00
        1:00 pm         => 13:00
        13:00           => 13:00
        18:40           => 18:40
        1840            => 18:40
        800             => 08:00
        1200            => 12:00
        300             => 03:00
        8               => 08:00
        10              => 10:00
        8,5             => 08:30
        8.5             => 08:30
        8,25            => 08:15
    */

    const test = /^([0-2]?[0-9])?(:?|,?|\.?)([0-5]?[0-9])?( ?[pP]?[aA]?[mM]?)$/;
    const res = test.exec(value);
    if (!res) return NaN;

    // Group 1 - hour
    let hour = parseInt(res[1], 10);
    if (isNaN(hour)) return NaN; // hour is required at least

    // Group 2 - separator?
    let isMinuteInFractions = false;
    let separator = res[2];
    if (separator === ',' || separator === '.')
        isMinuteInFractions = true;

    // Group 3 - minute
    let minute = parseInt(res[3], 10);
    if (isNaN(minute)) minute = 0;

    if (isMinuteInFractions) {
        const minuteFraction = parseFloat('0.' + minute);
        minute = Math.floor(60 * minuteFraction);
    }

    // Group 4 - am/pm
    const ampm = res[4];
    const isPm = ampm.indexOf('p') === 0 || ampm.indexOf('P') === 0;
    if (isPm) hour += 12;


    return hour * 60 + minute;
}


export function roundTime(time: number, minuteInterval: number) {
    if (minuteInterval < 1) return time;

    const hour = Math.floor(time / 60);
    const minutes = time % 60;

    const parts = Math.round(minutes / minuteInterval);
    return (hour * 60) + (parts * minuteInterval);
}


export function formatTime(value: number) {
    const minutes = Math.floor(value % 60);
    const hours = Math.floor(value / 60);

    if (hours < 100)
        return `${('0' + hours).substr(-2)}:${('0' + minutes).substr(-2)}`;
    else
        return `${hours}:${('0' + minutes).substr(-2)}`;
}


export function dayIdentifier(date: Date) {
    return date.toISOString().substring(0, 10);
}