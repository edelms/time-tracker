const dict = {

    nav: {
        timebooking: 'Time Booking',
        projects: 'Projects',
    },

    calendar: {
        calendarWeek: {
            short: 'CW',
        },
        navigate: {
            prevWeek: 'Goto previous week',
            nextWeek: 'Goto next week',
            currentWeek: 'Goto current week',
            weekSettings: 'Week Settings',
            record: 'Start live record',
            stopRecord: 'Stop live record',
            projectList: 'Open Project list',
            dataMgmt: 'Data Management',
        },

        day: {
            mode: {
                office: 'Office',
                homeoffice: 'Home Office',
                free: 'Free',
            }
        },

        info: {
            noWeekSettings: {
                short: 'No week settings!',
                longBeforeIcon: 'There are no settings attached to this week. Use the',
                longAfterIcon: 'Button to select one!',
            },
        }
    },

    time: {
        hours: {
            short: 'Hrs.',
        }
    },

    calc: {
        quota: 'Plan',
        actual: 'Actual',
    },

    booking: {
        emptyText: '[No text]',
        edit: {
            dialogHeader: 'Edit Booking',
            removeConfirm: 'Remove this booking?',
        },
        label: {
            startTime: 'Start time',
            endTime: 'End time',
        },
    },

    dataManagement: {
        dialog: {
            header: 'Data Management',
            warning: 'Warning: This can overwrite or remove your data, consider making a backup before executing these operations!'
        },
        message: {
            verifyError: 'Could not verify data, {{error}}',
            importError: 'Could not import data, {{error}}',
            importSuccessNoChange: 'Import successful, no data has been changed',
            importSuccessChanged: 'Import successful, {{changes}} data sets has been changed. Confirm to reload...',
            enterToRemovePrompt: 'Enter "REMOVE ALL" to continue removing all data.',
            removeSuccess: 'Data has been cleared, Confirm to reload...',
        },
        error: {
            inputNotArray: 'Input is not an array',
            rowsNotArray: 'Some rows are not an array',
            rowsInvalidItemCount: 'Some rows have an invalid item count',
            keyNotString: 'Key is not a string',
            invalidKey: 'Some of the rows have an invalid key: {{key}}',
            selectSingleFile: 'Select one file',
            selectJsonFile: 'Select a JSON file',
            openJsonError: 'Could not open JSON file, {{error}}',
        }
    },

    project: {
        empty: '[No project]',
        list: {
            dialogHeader: 'Projects',
        },
        edit: {
            createLabel: 'Create a new project',
            removeConfirm: 'Remove this project?',
        },
        browser: {
            search: 'Search project...',
            info: {
                recentlyUsed: 'Your recently used projects...',
                someFound: 'We have found these projects...',
                noProjects: {
                    message: 'There are no matching projects,',
                    createPrompt: 'should we create one?',
                },
            },
        },
    },

    weeksetting: {
        list: {
            dialogHeader: 'Week Settings',
            defaultItem: '(Default)',
        },
        edit: {
            dialogHeader: 'Edit Setting',
            removeConfirm: 'Confirm remove of {{name}}?',
        },
        stats: {
            workDays: 'Work days',
            workTime: 'Work time',
            hrsPerWeek: 'Hrs. / Week',
            hrsPerMonth: 'Hrs. / Month',
        },

        columns: {
            workdaysGrid: 'Work Days',
            weekDay: 'Week Day',
            isVisible: 'Visible',
            isWOrkDay: 'Work day',
            timeQuota: 'Worktime Quota',
        },

        message: {
            noWeekSettings: 'You have no week settings, create one with the button below!',
            thisIsDefault: 'This is the default weeek setting.',
        }
    },

    form: {
        project: {
            key: {
                label: 'Project Key',
                requiredError: 'Project KEY is required',
                inUseError: 'This project key is in use',
            },
            name: {
                label: 'Project Name',
                requiredError: 'Project NAME is required',
            },
        },
        weeksetting: {
            name: {
                label: 'Name',
            },
        },
        time: {
            parseError: 'Time could not be parsed',
        },
        button: {
            add: 'Add',
            edit: 'Edit',
            remove: 'Remove',
            back: 'Back',
            setAsDefault: 'Set as default',
            select: 'Select',
            backup: 'Backup',
            restore: 'Restore',
            clearAll: 'Clear All',
            addBooking: 'Add Booking',
        },
        alt: {
            selectProject: 'Select Project',
            more: 'More',
        }
    },
};

export default dict;