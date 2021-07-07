import Character_FundamentalsPy as fundamentals
import renpy.exports as renpy

ENUM__TRAITS__GENDER = "GENDER"
ENUM__TRAITS__IS_FEMALE = "IS_FEMALE"
ENUM__TRAITS__IS_MALE = "IS_MALE"
ENUM__TRAITS__AGE = "AGE"
ENUM__TRAITS__AGE_GROUP = "AGE_GROUP"
ENUM__TRAITS__IS_FIT = "IS_FIT"
ENUM__TRAITS__FITNESS = "FITNESS"

trait_getters_by_trait_key = {}
trait_checkers_by_trait_key = {}

def register_trait_getter(trait_key, trait_getter):
    trait_getters_by_trait_key[trait_key] = trait_getter

def register_trait_checker(trait_key, trait_checker):
    trait_checkers_by_trait_key[trait_key] = trait_checker

def get_trait(character_id, trait_key):
    if character_id not in fundamentals.characters_database.keys():
        renpy.error("ERROR: get_trait(): Can't find character '" + character_id + "' in character_database.")
        return 0
    if trait_key not in trait_getters_by_trait_key.keys():
        renpy.error("ERROR: get_trait(): Can't find trait controller for trait '" + trait_key + "' in trait_controllers_by_trait_key.")
        return 0

    character = fundamentals.characters_database[character_id]
    trait_getter = trait_getters_by_trait_key[trait_key]
    return trait_getter(character, trait_key)

def check_trait(character_id, trait_key):
    if character_id not in fundamentals.characters_database.keys():
        renpy.error("ERROR: get_trait(): Can't find character '" + character_id + "' in character_database.")
        return 0
    if trait_key not in trait_checkers_by_trait_key.keys():
        renpy.error("ERROR: get_trait(): Can't find trait controller for trait '" + trait_key + "' in trait_controllers_by_trait_key.")
        return 0

    character = fundamentals.characters_database[character_id]
    trait_checker = trait_checkers_by_trait_key[trait_key]
    return trait_checker(character, trait_key)
