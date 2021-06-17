class Character_Mood(object):
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.character_personality = None
        self._happiness = 0
        self._calm = 0

    @property
    def happiness(self):
        return self._happiness
    
    @property
    def calm(self):
        return self._calm

    def build(self, character_personality):
        self._reset()
        self.character_personality = character_personality
        return self

