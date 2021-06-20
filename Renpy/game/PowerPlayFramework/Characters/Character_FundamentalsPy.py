from ..Framework_BasePy import Buildable_From_Json
import random

class Gender(object):
    FEMALE = "FEMALE"
    MALE = "MALE"
    def __init__(self):
        pass

    @classmethod
    def generate_random(cls):
        return random.choice([Gender.FEMALE, Gender.MALE])

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
