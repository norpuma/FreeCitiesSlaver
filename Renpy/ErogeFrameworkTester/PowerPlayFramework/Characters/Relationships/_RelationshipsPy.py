from .SentimentsPy import Character_Sentiments
from .Interactions_HistoryPy import Characters_Interactions_History

ENUM__FAMILIARITY__STRANGER = 0
ENUM__FAMILIARITY__ACQUAINTANCE = 1
ENUM__FAMILIARITY__FAMILIAR = 2
ENUM__FAMILIARITY__INTIMATE = 3
ENUM__FAMILIARITY__VERY_INTIMATE = 4

class Characters_Relationship(object):
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.target = None
        self.sentiments = None
        self.history = None
    
    def build(self, target):
        self._reset()
        self.target = target
        self.history = Characters_Interactions_History()
        self.familiarity = ENUM__FAMILIARITY__STRANGER
        self.sentiments = Character_Sentiments()

        return self

    def apply(self, interaction):
        if interaction == "RECEIVE_POLITE_INTRODUCTION":
            self.familiarity = ENUM__FAMILIARITY__ACQUAINTANCE
            self.sentiments.satisfaction = 1
        elif interaction == "ACT_POLITE_INTRODUCTION":
            self.familiarity = ENUM__FAMILIARITY__ACQUAINTANCE
