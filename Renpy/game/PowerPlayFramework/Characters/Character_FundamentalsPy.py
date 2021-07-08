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

ENUM__AGE_GROUP__CHILD = "ENUM__AGE_GROUP__CHILD"
ENUM__AGE_GROUP__TEEN = "ENUM__AGE_GROUP__TEEN"
ENUM__AGE_GROUP__YOUNG_ADULT = "ENUM__AGE_GROUP__YOUNG_ADULT"
ENUM__AGE_GROUP__ADULT = "ENUM__AGE_GROUP__ADULT"
ENUM__AGE_GROUP__MATURE_ADULT = "ENUM__AGE_GROUP__MATURE_ADULT"
ENUM__AGE_GROUP__ELDER = "ENUM__AGE_GROUP__ELDER"

def get_age_group_from_age(age):
    if age < 18:
        return ENUM__AGE_GROUP__CHILD
    elif age < 21:
        return ENUM__AGE_GROUP__TEEN
    elif age < 26:
        return ENUM__AGE_GROUP__YOUNG_ADULT
    elif age < 35:
        return ENUM__AGE_GROUP__ADULT
    elif age < 50:
        return ENUM__AGE_GROUP__MATURE_ADULT
    else: # age >= 50
        return ENUM__AGE_GROUP__ELDER

characters_database = {}
