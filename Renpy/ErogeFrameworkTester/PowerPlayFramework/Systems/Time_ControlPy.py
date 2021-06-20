ENUM__TIME_CONTROL__DAY_PART__LATE_NIGHT = "EARLY_NIGHT"       # 0 - 3
ENUM__TIME_CONTROL__DAY_PART__LATE_NIGHT = "LATE_NIGHT"        # 3 - 6
ENUM__TIME_CONTROL__DAY_PART__EARLY_MORNING = "EARLY_MORNING"     # 6 - 9
ENUM__TIME_CONTROL__DAY_PART__LATE_MORNING = "LATE_MORNING"      # 9 - 12
ENUM__TIME_CONTROL__DAY_PART__EARLY_AFTERNOON = "EARLY_AFTERNOON"   # 12 - 15
ENUM__TIME_CONTROL__DAY_PART__LATE_AFTERNOON = "LATE_AFTERNOON"    # 15 - 18
ENUM__TIME_CONTROL__DAY_PART__EARLY_EVENING = "EARLY_EVENING"     # 18 - 21
ENUM__TIME_CONTROL__DAY_PART__LATE_EVENING = "LATE_EVENING"      # 21 - 24

ENUM__TIME_CONTROL__WEEK_DAY__SUNDAY__INDEX = 0
ENUM__TIME_CONTROL__WEEK_DAY__MONDAY__INDEX = 1
ENUM__TIME_CONTROL__WEEK_DAY__TUESDAY__INDEX = 2
ENUM__TIME_CONTROL__WEEK_DAY__WEDNESDAY__INDEX = 3
ENUM__TIME_CONTROL__WEEK_DAY__THURSDAY__INDEX = 4
ENUM__TIME_CONTROL__WEEK_DAY__FRIDAY__INDEX = 5
ENUM__TIME_CONTROL__WEEK_DAY__SATURDAY__INDEX = 6

from datetime import datetime
from datetime import timedelta
from datetime import date

class Time_Control(object):
    SECONDS_IN_AN_HOUR = 3600
    WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.date_time = None
        self.start_date = None
        self.game_day = 1
    
    def build(self, start_year, start_month = 1, start_day = 1, start_hour = 7, start_minutes = 0):
        self._reset()
        self.date_time = datetime(start_year, start_month, start_day, start_hour, start_minutes)
        self.start_date = date(self.date_time.year, self.date_time.month, self.date_time.day)
        return self

    @property
    def hour(self):
        return self.date_time.hour
    
    @property
    def minutes(self):
        return self.date_time.minute
    
    @property
    def week_day(self):
        return Time_Control.WEEKDAY_NAMES[self.date_time.isoweekday()]

    def get_timestamp(self):
        return self.date_time
    
    def days_since(self, timestamp):
        return (timestamp - self.date_time).days

    def hours_since(self, timestamp):
        return (timestamp - self.date_time).total_seconds // Time_Control.SECONDS_IN_AN_HOUR

    def progress_by_time(self, time_interval):
        self.date_time += time_interval
        self._update_game_date()

    def progress_to_time(self, date_time):
        self.date_time = date_time
        self._update_game_date()

    def _update_game_date(self):
        self.game_date = (self.date_time - self.start_time).days + 1
