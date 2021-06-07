init -2 python:
    common_activities = {}
    def register_common_activity(activity):
        common_activities.update({activity.name: activity})
        return
    
    ENUM__ACTIVITY__SLEEP = "SLEEP"
    ENUM__ACTIVITY__RELAX = "RELAX"
    class Character_Activity(renpy.store.object):
        def __init__(self, name, location):
            self.name = name
            self.location = location
            return
    
    register_common_activity(Character_Activity(ENUM__ACTIVITY__SLEEP, "HOME"))
    register_common_activity(Character_Activity(ENUM__ACTIVITY__RELAX, "HOME"))