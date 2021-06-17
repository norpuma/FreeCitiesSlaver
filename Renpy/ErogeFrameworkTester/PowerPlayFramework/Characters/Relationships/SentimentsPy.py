class Character_Sentiments(object):
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self._satisfaction = 0
        self._love = 0
        self._trust = 0
        self._superiority = 0
        self._indebtedness = 0
        self.is_romantic = False
        self._sexual_desire = 0

