class Character_Sentiments(object):
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.satisfaction = 0
        self.love = 0
        self.trust = 0
        self.superiority = 0
        self.indebtedness = 0
        self.is_romantic = False
        self.sexual_desire = 0

