from MoodPy import Character_Mood

class Character_Status(object):
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.mood = Character_Mood()
