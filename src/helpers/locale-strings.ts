
type LocaleStrings = {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;

    mo: string;
    tu: string;
    we: string;
    th: string;
    fr: string;
    sa: string;
    su: string;

    longWeekday: string[];
    shortWeekday: string[];
}

let _localeStrings: LocaleStrings | undefined;


export const localeStrings = () => {
    if (_localeStrings)
        return _localeStrings;


    const longWeekday = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
    const shortWeekday = new Intl.DateTimeFormat(undefined, { weekday: 'short' });

    _localeStrings = {
        monday: longWeekday.format(new Date('2000-01-03T00:00:00')),
        tuesday: longWeekday.format(new Date('2000-01-04T00:00:00')),
        wednesday: longWeekday.format(new Date('2000-01-05T00:00:00')),
        thursday: longWeekday.format(new Date('2000-01-06T00:00:00')),
        friday: longWeekday.format(new Date('2000-01-07T00:00:00')),
        saturday: longWeekday.format(new Date('2000-01-08T00:00:00')),
        sunday: longWeekday.format(new Date('2000-01-09T00:00:00')),

        mo: shortWeekday.format(new Date('2000-01-03T00:00:00')),
        tu: shortWeekday.format(new Date('2000-01-04T00:00:00')),
        we: shortWeekday.format(new Date('2000-01-05T00:00:00')),
        th: shortWeekday.format(new Date('2000-01-06T00:00:00')),
        fr: shortWeekday.format(new Date('2000-01-07T00:00:00')),
        sa: shortWeekday.format(new Date('2000-01-08T00:00:00')),
        su: shortWeekday.format(new Date('2000-01-09T00:00:00')),

        longWeekday: [],
        shortWeekday: [],
    };

    _localeStrings.longWeekday = [
        _localeStrings.sunday,
        _localeStrings.monday,
        _localeStrings.tuesday,
        _localeStrings.wednesday,
        _localeStrings.thursday,
        _localeStrings.friday,
        _localeStrings.saturday,
    ];

    _localeStrings.shortWeekday = [
        _localeStrings.su,
        _localeStrings.mo,
        _localeStrings.tu,
        _localeStrings.we,
        _localeStrings.th,
        _localeStrings.fr,
        _localeStrings.sa,
    ];

    return _localeStrings;
}



// Monday
new Date('2000-01-03').toLocaleDateString(undefined, { weekday: 'long' }) 
