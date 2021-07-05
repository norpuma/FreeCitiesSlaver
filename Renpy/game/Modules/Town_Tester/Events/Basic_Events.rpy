init python:
    _PowerPlayFramework__events_initialization_first_pass_labels.append("_TOWN_TESTER__Basic_Events__Initialization__First_Pass")

label _TOWN_TESTER__Basic_Events__Initialization__First_Pass:
    #####################################
    # SCHEDULES register events for characters.
    # OCCUPATIONS add schedules to characters. Typical occupations: student, teacher, salesclerk, town hall bureaucrat.
    # INTERESTS/PREFERENCES overwrite relax blocks. <----- How to identify relax blocks?
    #####################################
    $ events_json = {
        "TOWN_TESTER__JOBLESS_HOMEBODY": [
            {
                "starts_at_timestamp": "22:00",
                "location": "HOME",
                "activity": "SLEEP",
                "recurring": "EVERYDAY"
            },
            {
                "starts_at_timestamp": "6:00",
                "location": "HOME",
                "activity": "GROOMING",
                "recurring": "EVERYDAY"
            },
            {
                "starts_at_timestamp": "8:00",
                "location": "HOME",
                "activity": "RELAX",
                "recurring": "EVERYDAY"
            }
        ],
        "TOWN_TESTER__TEACHER__WORK_SCHEDULE": [
            {
                "starts_at_timestamp": "22:00",
                "location": "HOME",
                "activity": "SLEEP",
                "recurring": "EVERYDAY"
            },
            {
                "starts_at_timestamp": "6:00",
                "location": "HOME",
                "activity": "GROOMING",
                "recurring": "EVERYDAY"
            },
            {
                "starts_at_timestamp": "8:00",
                "location": "TOWN_TESTER__SCHOOL",
                "activity": "WORK_SHIFT",
                "recurring": "WEEKDAYS"
            },
            {
                "starts_at_timestamp": "12:00",
                "location": "TOWN_TESTER__SCHOOL",
                "activity": "LUNCH",
                "recurring": "WEEKDAYS"
            },
            {
                "starts_at_timestamp": "13:00",
                "location": "TOWN_TESTER__SCHOOL",
                "activity": "WORK_SHIFT",
                "recurring": "WEEKDAYS"
            },
            {
                "starts_at_timestamp": "18:00",
                "location": "HOME",
                "activity": "RELAX",
                "recurring": "EVERYDAY"
            }
        ],
        "TOWN_TESTER__TEACHER_1__BIRTHDAY": {
            "starts_at_timestamp": "8:00",
            "location": "TOWN_TESTER__SCHOOL",
            "activity": "WORK_SHIFT"
        }
    }
    return
