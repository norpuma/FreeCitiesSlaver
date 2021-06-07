init -2 python:
    # Autonomy identifies what aspects of their own lives a character has control over. Most free adult citizen characters with a job living on their own have control of all of these.
    # There are 3 levels of autonomy "FREE", "RESTRICTED" and "CONTROLLED".
    ENUM__AUTONOMY__MONEY = "ENUM__AUTONOMY__MONEY"  # The character has a money reserve under their name.
    ENUM__AUTONOMY__EXPENSES = "ENUM__AUTONOMY__EXPENSES" # The character can decide how to spend money.
    ENUM__AUTONOMY__WAGES = "ENUM__AUTONOMY__WAGES" # The money the character gains from working is their own.
    ENUM__AUTONOMY__CITIZENSHIP = "ENUM__AUTONOMY__CITIZENSHIP" # The character is a free citizen and can prove it to whomever they want.
    ENUM__AUTONOMY__FREEDOM = "ENUM__AUTONOMY__FREEDOM" # The character can come and go as they please.
    ENUM__AUTONOMY__DIET = "ENUM__AUTONOMY__DIET" # The character can eat whatever they want.
    ENUM__AUTONOMY__DIETARY_PORTIONS = "ENUM__AUTONOMY__DIETARY_PORTIONS" # The character can eat as much they want.
    ENUM__AUTONOMY__COMFORTS = "ENUM__AUTONOMY__COMFORTS" # The character is not the one deciding how well they live.
    ENUM__AUTONOMY__ENTERTAINMENT_FREQUENCY = "ENUM__AUTONOMY__ENTERTAINMENT_FREQUENCY" # The character is not the one deciding how much entertainment they can have.
    ENUM__AUTONOMY__ENTERTAINMENT_CONTENT = "ENUM__AUTONOMY__ENTERTAINMENT_CONTENT" # The character is not the one deciding what they can have for entertainment.
    ENUM__AUTONOMY__VIRGINITY = "ENUM__AUTONOMY__VIRGINITY"
    ENUM__AUTONOMY__SEX_CONSENT = "ENUM__AUTONOMY__SEX_CONSENT"
    ENUM__AUTONOMY__BODY = "ENUM__AUTONOMY__BODY"
    ENUM__AUTONOMY__SEXUAL_PREFERENCES = "ENUM__AUTONOMY__SEXUAL_PREFERENCES"
    ENUM__AUTONOMY__MIND = "ENUM__AUTONOMY__MIND"
    ENUM__AUTONOMY__SEX_ACTS = "ENUM__AUTONOMY__SEX_ACTS"
    ENUM__AUTONOMY__MODESTY = "ENUM__AUTONOMY__MODESTY"
    ENUM__AUTONOMY__SEXUAL_RELEASE = "ENUM__AUTONOMY__SEXUAL_RELEASE"
    ENUM__AUTONOMY__SOCIAL_CONTACTS = "ENUM__AUTONOMY__SOCIAL_CONTACTS"
    ENUM__AUTONOMY__SENSUAL_PARTNERS = "ENUM__AUTONOMY__SENSUAL_PARTNERS"
    ENUM__AUTONOMY__SENSUAL_WARDROBE = "ENUM__AUTONOMY__SENSUAL_WARDROBE"

    ENUM__SKILLS__CLEANING = "ENUM__SKILLS__CLEANING"
    ENUM__SKILLS__COOKING = "ENUM__SKILLS__COOKING"
    ENUM__SKILLS__MASSAGE = "ENUM__SKILLS__MASSAGE"
    ENUM__SKILLS__ACTING = "ENUM__SKILLS__ACTING"
    ENUM__SKILLS__TECH = "ENUM__SKILLS__TECH"
    ENUM__SKILLS__STEALTH = "ENUM__SKILLS__STEALTH"
    ENUM__SKILLS__CHARM = "ENUM__SKILLS__CHARM"
    ENUM__SKILLS__FITNESS = "ENUM__SKILLS__FITNESS"
    ENUM__SKILLS__KNOWLEDGE = "ENUM__SKILLS__KNOWLEDGE"
    ENUM__SKILLS__STUDIOUS = "ENUM__SKILLS__STUDIOUS"
    ENUM__SKILLS__PROFESSIONALISM = "ENUM__SKILLS__PROFESSIONALISM"

    class Character_Status(renpy.store.object):
        def __init__(self):
            self.mood = Character_Mood()
            self.feelings_towards_protagonist = Character_Feelings()
            self.money = 0
            self.assignment = None
            self.max_health = 10
            self.health = 10
            self.traumas = []
            self.traumatized = 0
            self.despair = 0
            self.scarred = 0
            self.scars = 0
            self.bargains = {}
            self.is_broken = False
            return

    class Character_Mood(renpy.store.object):
        def __init__(self):
            self.max_happiness = 10
            self.average_happiness = 5
            self.happiness = 5
            self.fear = 0
            self.needing_food = 0
            self.needing_comfort = 0
            self.needing_entertainment = 0
            self.needing_sexual_release = 0
            return

    class Character_Feelings(renpy.store.object):
        def __init__(self):
            self.satisfaction = 0
            self.hatred = 0
            self.love = 0
            self.entitlement = 0
            self.indebtedness = 0
            self.trust = 0
            self.betrayed = 0
            return

    class Character_Skills(renpy.store.object):
        def __init__(self):
            return
