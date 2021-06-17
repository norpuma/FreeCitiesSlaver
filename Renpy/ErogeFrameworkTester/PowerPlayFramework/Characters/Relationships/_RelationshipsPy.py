from .SentimentsPy import Character_Sentiments
from .Interactions_HistoryPy import Characters_Interactions_History

class Characters_Relationship(object):
    def __init__(self):
        self._reset()
    
    def reset(self):
        self.target = None
        self.sentiments = None
    
    def build(self, target):
        self._reset()
        self.target = target
        self.history = Characters_Interactions_History()
        self.sentiments = Character_Sentiments()
