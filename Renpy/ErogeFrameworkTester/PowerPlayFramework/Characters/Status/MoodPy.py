import random

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
    
    @happiness.setter
    def happiness(self, value):
        self._happiness = value
    
    @property
    def calm(self):
        return self._calm
    
    @calm.setter
    def calm(self, value):
        self._calm = value

    def build(self, character_personality):
        self._reset()
        self.character_personality = character_personality
        return self
    
    def apply_modifiers(self, modifiers):
        self.happiness += modifiers.happiness_modifier
        self.calm += modifiers.calm_modifier

class Character_Mood_Modifier(object):
    def __init__(self, happiness_modifier, calm_modifier):
        self.happiness_modifier = happiness_modifier
        self.calm_modifier = calm_modifier
    
    @classmethod
    def generate_small_range_modifier(cls):
        # 08% they had a very bad day -2
        # 12% they had a rather bad day -1
        # 20% they had a not very good day -0.5
        # 20% they had an unremarkable day 0
        # 20% they had a not very bad day +0.5
        # 12% they had a rather nice day +1
        # 08% they had a great day +2
        rand = random.randint(1, 100)
        if rand <= 8:
            return -2
        elif rand <= 20:
            return -1
        elif rand <= 40:
            return -0.5
        elif rand <= 60:
            return 0
        elif rand <= 80:
            return 0.5
        elif rand <= 92:
            return 1
        else: # rand <= 100
            return 2

    @classmethod
    def generate_large_range_modifier(cls):
        # 05% the last few days were horrible -4
        # 07% the last few days were pretty bad -3
        # 08% the last few days were rather bad -2
        # 10% the last few days were not great -1
        # 15% the last few days were less than great -0.5
        # 10% the last few days, on balance, were unremarkable 0
        # 15% the last few days, on balance, were good rather than bad +0.5
        # 10% the last few days were not bad +1
        # 08% the last few days were rather nice +2
        # 07% the last few days were pretty good +3
        # 05% the last few days were really great +4
        rand = random.randint(1, 100)
        if rand <= 5:
            return -4
        elif rand <= 12:
            return -3
        elif rand <= 20:
            return -2
        elif rand <= 30:
            return -1
        elif rand <= 45:
            return -0.5
        elif rand <= 55:
            return 0
        elif rand <= 70:
            return 0.5
        elif rand <= 80:
            return 1
        elif rand <= 88:
            return 2
        elif rand <= 95:
            return 3
        else: # rand <= 100
            return 4

    @classmethod
    def generate_random(cls, limited_to_small_range = False):
        range = 8
        if limited_to_small_range:
            happiness_modifier = cls.generate_small_range_modifier()
        else:
            happiness_modifier = cls.generate_large_range_modifier()
        if limited_to_small_range:
            calm_modifier = cls.generate_small_range_modifier()
        else:
            calm_modifier = cls.generate_large_range_modifier()
        result = cls(happiness_modifier = happiness_modifier, calm_modifier = calm_modifier)

        return result
