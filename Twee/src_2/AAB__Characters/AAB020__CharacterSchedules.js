/*
    Base schedule is:
    * Weekdays
    00:00 to 07:59 sleep
    08:00 to 08:59 breakfast + overhead
    09:00 to 12:59 morning duties
    13:00 to 13:59 lunch + overhead
    14:00 to 17:59 afternoon duties
    18:00 to 18:59 dinner
    19:00 to 20:59 unproductive time
    21:00 to 22:59 enjoyment
    23:00 to 23:59 personal care

    * Weekends
    00:00 to 07:59 sleep
    08:00 to 08:59 breakfast + overhead
    09:00 to 09:59 Fitness practice
    10:00 to 10:59 Social practice
    11:00 to 11:59 Knowledge practice
    12:00 to 12:59 unproductive time
    13:00 to 13:59 lunch + overhead
    14:00 to 17:59 unproductive time
    18:00 to 18:59 dinner
    19:00 to 20:59 unproductive time
    21:00 to 22:59 enjoyment
    23:00 to 23:59 personal care
*/

class StandardWeeklyScheduledActivities {
    static SLEEP = "SLEEP"
    static BREAKFAST = "BREAKFAST"
    static DUTY = "DUTY"
    static LUNCH = "LUNCH"
    static DINNER = "DINNER"
    static UNPRODUCTIVE_TIME = "UNPRODUCTIVE_TIME"
    static ENJOYMENT = "ENJOYMENT"
    static PERSONAL_CARE = "PERSONAL_CARE"
    static PRACTICE = "PRACTICE"
}

class TimeBudget {
    static TOTAL_BUDGET = 24 * 7
    static DEFAULT_DAILY_SLEEP_HOURS_REQUIRED = 8
    static DEFAULT_WEEKLY_SLEEP_HOURS_REQUIRED = 7 * TimeBudget.DEFAULT_DAILY_SLEEP_HOURS_REQUIRED
    static DEFAULT_DAILY_OVERHEAD_HOURS_REQUIRED = 3
    static DEFAULT_WEEKLY_OVERHEAD_HOURS_REQUIRED = 7 * TimeBudget.DEFAULT_DAILY_OVERHEAD_HOURS_REQUIRED
    static DEFAULT_WEEKDAY_DAILY_MORNING_DUTY_HOURS_REQUIRED = 4
    static DEFAULT_WEEKLY_MORNING_DUTY_HOURS_REQUIRED = 5 * TimeBudget.DEFAULT_WEEKDAY_DAILY_MORNING_DUTY_HOURS_REQUIRED
    static DEFAULT_WEEKDAY_DAILY_AFTERNOON_DUTY_HOURS_REQUIRED = 4
    static DEFAULT_WEEKLY_AFTERNOON_DUTY_HOURS_REQUIRED = 5 * TimeBudget.DEFAULT_WEEKDAY_DAILY_AFTERNOON_DUTY_HOURS_REQUIRED
    static DEFAULT_DAILY_ENJOYMENT_HOURS = 2
    static DEFAULT_WEEKLY_ENJOYMENT_HOURS = 7 * TimeBudget.DEFAULT_DAILY_ENJOYMENT_HOURS
    static DEFAULT_DAILY_PERSONAL_CARE_HOURS = 1
    static DEFAULT_WEEKLY_PERSONAL_CARE_HOURS = 7 * TimeBudget.DEFAULT_DAILY_PERSONAL_CARE_HOURS
    static DEFAULT_WEEKEND_DAILY_FITNESS_PRACTICE_HOURS = 1
    static DEFAULT_WEEKLY_FITNESS_PRACTICE_HOURS = 2 * TimeBudget.DEFAULT_WEEKEND_DAILY_FITNESS_PRACTICE_HOURS
    static DEFAULT_WEEKEND_DAILY_KNOWLEDGE_PRACTICE_HOURS = 1
    static DEFAULT_WEEKLY_KNOWLEDGE_PRACTICE_HOURS = 2 * TimeBudget.DEFAULT_WEEKEND_DAILY_KNOWLEDGE_PRACTICE_HOURS
    static DEFAULT_WEEKEND_DAILY_SOCIAL_PRACTICE_HOURS = 1
    static DEFAULT_WEEKLY_SOCIAL_PRACTICE_HOURS = 2 * TimeBudget.DEFAULT_WEEKEND_DAILY_SOCIAL_PRACTICE_HOURS
    // Default Unproductive Time should be 24 hours per week (2 hours per day on week days and 7 hours per day on weekends)
    static DEFAULT_WEEKLY_UNPRODUCTIVE_HOURS = TimeBudget.TOTAL_BUDGET - TimeBudget.DEFAULT_WEEKLY_SLEEP_HOURS_REQUIRED - TimeBudget.DEFAULT_WEEKLY_OVERHEAD_HOURS_REQUIRED - TimeBudget.DEFAULT_WEEKLY_MORNING_DUTY_HOURS_REQUIRED - TimeBudget.DEFAULT_WEEKLY_AFTERNOON_DUTY_HOURS_REQUIRED - TimeBudget.DEFAULT_WEEKLY_ENJOYMENT_HOURS - TimeBudget.DEFAULT_WEEKLY_PERSONAL_CARE_HOURS - TimeBudget.DEFAULT_WEEKLY_FITNESS_PRACTICE_HOURS - TimeBudget.DEFAULT_WEEKLY_KNOWLEDGE_PRACTICE_HOURS - TimeBudget.DEFAULT_WEEKLY_SOCIAL_PRACTICE_HOURS
}

class ScheduleDefaults {
    static DEFAULT_SLEEP_START_HOUR = 0
    static DEFAULT_SLEEP_DURATION_HOURS = 8
    static DEFAULT_BREAKFAST_START_HOUR = 8
    static DEFAULT_BREAKFAST_DURATION = 1
    static DEFAULT_MONRING_DUTY_START_HOUR = 9
    static DEFAULT_MORNING_DUTY_DURATION = 4
    static DEFAULT_LUNCH_START_HOUR = 13
    static DEFAULT_LUNCH_DURATION = 1
    static DEFAULT_AFTERNOON_DUTY_START_HOUR = 14
    static DEFAULT_AFTERNOON_DUTY_DURATION = 4
    static DEFAULT_DINNER_START_HOUR = 18
    static DEFAULT_DINNER_DURATION = 1
    static DEFAULT_ENJOYMENT_START_HOUR = 21
    static DEFAULT_ENJOYMENT_DURATION = 2
    static DEFAULT_SELF_CARE_START_HOUR = 23
    static DEFAULT_SELF_CARE_DURATION = 1
}

class ActivityDescription {
    constructor(text, isPassageName = false){
        if (isPassageName == true){
            this.descriptionPassage = text
        } else {
            this.descriptionString = text
        }
    }
}

class ScheduledActvity {
    constructor(shortName, startTime, standardDuration, prompt, upcomingActivityDescription, executionDescription){
        this.shortName = shortName
        this.startTime = startTime
        this.standardDuration = standardDuration
        this.prompt = prompt
        this.upcomingActivityDescription = upcomingActivityDescription
        this.executionDescription = executionDescription
    }
}

class ScheduleControl {
    constructor(){
        this.scheduledActivitiesByStartTime = new Map()
    }
    addActivity(scheduledActvity){
        // TODO: Check for conflicts. Consider that activities may start earlier but have a duration that overlaps with this activities start time.
        this.scheduledActivitiesByStartTime.set(scheduledActvity.startTime, scheduledActvity)
    }
    getNextActivity(currentTime){
        let startTimes = this.scheduledActivitiesByStartTime.keys()
        startTimes.sort()
        for (let startTime of startTimes){
            if (startTime >= currentTime){
                return this.scheduledActivitiesByStartTime.get(startTime)
            }
        }
        return undefined
    }
}
