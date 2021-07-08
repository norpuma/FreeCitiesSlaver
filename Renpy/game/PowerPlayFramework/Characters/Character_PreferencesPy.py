ENUM__PREFERENCES_CONTEXTS__FRIENDLY_SOCIAL = "ENUM__PREFERENCES_CONTEXTS__FRIENDLY_SOCIAL"
ENUM__PREFERENCES_CONTEXTS__SENSUAL_FLIRTING = "ENUM__PREFERENCES_CONTEXTS__SENSUAL_FLIRTING"
ENUM__PREFERENCES_CONTEXTS__SEXUAL_MAKEOUT = "ENUM__PREFERENCES_CONTEXTS__SEXUAL_MAKEOUT"
ENUM__PREFERENCES_CONTEXTS__SEXUAL_EXPOSED_GENITALIA = "ENUM__PREFERENCES_CONTEXTS__SEXUAL_EXPOSED_GENITALIA"
ENUM__PREFERENCES_CONTEXTS__SEXUAL_INTERCOURSE = "ENUM__PREFERENCES_CONTEXTS__SEXUAL_INTERCOURSE"
ENUM__PREFERENCES_CONTEXTS__POWER_AS_AUTHORITY = "ENUM__PREFERENCES_CONTEXTS__POWER_AS_AUTHORITY"
ENUM__PREFERENCES_CONTEXTS__POWER_AS_UNDERLING = "ENUM__PREFERENCES_CONTEXTS__POWER_AS_UNDERLING"

ENUM__PREFERENCE_LEVEL__DISGUSTED = "ENUM__PREFERENCE_LEVEL__DISGUSTED"
ENUM__PREFERENCE_LEVEL__INDIFFERENT = "ENUM__PREFERENCE_LEVEL__INDIFFERENT"
ENUM__PREFERENCE_LEVEL__APPRECIATIVE = "ENUM__PREFERENCE_LEVEL__APPRECIATIVE"
ENUM__PREFERENCE_LEVEL__ENTHUSIASTIC = "ENUM__PREFERENCE_LEVEL__ENTHUSIASTIC"
ENUM__PREFERENCE_LEVEL__ENTHUSIASTIC__ENDEARING = "ENUM__PREFERENCE_LEVEL__ENTHUSIASTIC__ENDEARING"
ENUM__PREFERENCE_LEVEL__ENTHUSIASTIC__EXCITING = "ENUM__PREFERENCE_LEVEL__ENTHUSIASTIC__EXCITING"
ENUM__PREFERENCE_LEVEL__FASCINATED = "ENUM__PREFERENCE_LEVEL__FASCINATED"
ENUM__PREFERENCE_LEVEL__OBSESSED = "ENUM__PREFERENCE_LEVEL__OBSESSED"

default_common_preferences_by_context = {}
default_potential_preferences_by_context = {}

class Character_Preferences(object):
    def __init__(self):
        return

class Character_Preference(object):
    def __init__(self, personality_type_prefix, default_prefix = None,
        common_likes = None, common_dislikes = None, common_sexy_likes = None, common_sexy_dislikes = None,
        titles_function = None, possessive_titles_function = None, player_titles_function = None):

        self.liked = 0 # 5 to 0 to -5 ranging from INTENSELY LIKED to INTENSELY DISLIKED.
        self.arousing = 0 # 5 to 0 to -5 ranging from INTENSELY AROUSING to INTENSELY DISGUSTING.
        self.reassuring = 0 # 5 to 0 ranging from INTENSELY REASSURING to NOT REASSURING.
        self.embarrassing = 0 # 0 to -5 ranging from NOT EMBARRASSING to INTENSELY EMBARRASSING.
        self.humiliating = 0 # 0 to -5 ranging from NOT HUMILIATING to INTENSELY HUMILIATING.
        self.moral = 0 # 5 to 0 ranging from INTENSELY MORAL to INTENSELY IMMORAL.
        self.pleasurable = 0 # 5 to 0 ranging from INTENSELY PLEASURABLE to NOT PLEASURABLE.
        self.painful = 0 # 0 to -5 ranging from NOT PAINFUL to INTENSELY PAINFUL.
        self.fun = 0 # 5 to 0 to -5 ranging from INTENSELY FUN to INTENSELY BORING.

        self.is_taboo = False
        self.is_kink = False
        self.is_dehumanizing = False

        self.romantic_feelings = 0 # 0 to 5
        self.arousal = 0 # 0 to 5
        self.intimacy = 0 # 0 to 5
        self.trust = 0 # 0 to 5
        return

    @classmethod
    def generate_base(cls, character_id):
        pass

    @classmethod
    def generate_random(cls, character_id):
        pass
