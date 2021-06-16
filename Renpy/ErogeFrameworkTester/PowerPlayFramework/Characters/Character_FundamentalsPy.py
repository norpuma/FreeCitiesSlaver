from ..Framework_BasePy import Buildable_From_Json

class Gender(object):
    FEMALE = "FEMALE"
    MALE = "MALE"
    def __init__(self):
        pass

female_pronouns = {
    "subject": "she",
    "object": "her",
    "possessive": "her",
    "possessivePronouns": "hers",
    "reflexive": "herself"
}

male_pronouns = {
    "subject": "he",
    "object": "him",
    "possessive": "his",
    "possessivePronouns": "his",
    "reflexive": "himself"
}

characters_database = {}
