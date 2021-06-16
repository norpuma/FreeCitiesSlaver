from .Character_FundamentalsPy import Gender
import json
import random
import copy
import renpy.exports as renpy

class Person_Name(object):
    def __init__(self):
        self.possessive = None
        self.canBeFirstName = False
        self.canBeNickname = False
        self.linkedNicknames = []
        self.linkedFirstNames = []
    
    @classmethod
    def build_from_json(cls, json):
        result = cls()
        json_keys = json.keys()
        for attr in result.__dict__.keys():
            if attr in json_keys:
                result.__dict__[attr] = json[attr]
        return result

class Names_Resources(object):
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.source = {}
        self.available_keys = []
        self.used_keys = []
    
    def reset_resources(self, source_dict):
        self._reset()
        self.source.update(source_dict)
        self.available_keys.extend(self.source.keys())

    def extend(self, source_dict):
        self.source.update(source_dict)
        for key, value in source_dict.items():
            if key not in self.used_keys:
                self.available_keys.append(key)

female_names = Names_Resources()
male_names = Names_Resources()
family_names = Names_Resources()

def load_names_from_json_file(json_file_path_and_name = "Names.jsonc"):
    with open(json_file_path_and_name) as json_file:
        json_object = json.load(json_file)
        json_file.close()
        return json_object

def initialize_names(path_to_names_json_file):
    global female_names
    global male_names
    global family_names
    female_names = Names_Resources()
    male_names = Names_Resources()
    family_names = Names_Resources()

    names_json = load_names_from_json_file(path_to_names_json_file)
    for names_database_name, names_database in names_json.items():
        if names_database_name == "lastNames":
            family_names.reset_resources(names_database)
        elif names_database_name == "femaleNameDatabase":
            female_names.reset_resources(names_database)
        elif names_database_name == "maleNameDatabase":
            male_names.reset_resources(names_database)

def pick_random_and_consume(resource, should_fail_if_in_used_database = False, should_fail_if_not_in_database = False):
    name = pick_random_name(resource)
    if not consume_name(resource, name, should_fail_if_in_used_database, should_fail_if_not_in_database):
        return None
    return name

def pick_random_name(resource):
    randomIndex = random.randint(0, len(resource.available_keys)-1)
    name = resource.available_keys[randomIndex]
    return name

def consume_name(resource, name, should_fail_if_in_used_database = True, should_fail_if_not_in_database = False):
    if should_fail_if_in_used_database and name in resource.used_keys:
        return False
    if name in resource.available_keys:
        resource.available_keys.remove(name)
    else:
        if should_fail_if_not_in_database:
            return False
    resource.used_keys.append(name)
    return True

def possessive_from_name(names_resource, name, should_fail_if_not_in_database = False):
    possessive = None
    if name in names_resource.source.keys():
        possessive = names_resource.source[name]
    else:
        if should_fail_if_not_in_database:
            raise "ERROR: possessive_from_name(): Name '{name}' not found in names_resource."
        else:
            possessive = name + "'s"

    return possessive

class Character_Names(object):
    def __init__(self):
        self.reset()
    
    def reset(self):
        self.standard = None
        self.standard_possessive = None
        self.first = None
        self.first_possessive = None
        self.last = None
        self.last_possessive = None

        # TODO: Remove if no longer necessary.
        # # honey, hun, sweetie, sugar, darling, dear, baby, sweetheart, lover, doll, babe, lover-boy, my love, cutie, beautiful, kid, kiddo, girlie, sweetness, princess.
        # self.affectionateNames = []
        # self.privateNames = []
        # # dirtbag, asswipe, motherfucker, scum, degenerate, pig, pervert
        # # bitch, cunt, 
        # self.offensiveNames = []
        # self.teasingNames = []
        # # sir, master, madam
        # self.respectfulNames = []
        # # master, boss, goddess, my queen, princess
        # self.superiorNames = []

    def build(self, standard_name, standard_possessive = None, first = None, first_possessive = None, last = None, last_possessive = None, should_consume_names = True):
        self.standard = standard_name
        if (standard_possessive != None):
            self.standard_possessive = standard_possessive
        else:
            self.standard_possessive = standard_name + "'s"

        self.first = self.standard
        self.first_possessive = self.standard_possessive
        if last != None:
            self.last = last
        else:
            self.last = ""
        if last_possessive != None:
            self.last_possessive = last_possessive
        else:
            if self.last != "":
                self.last_possessive = self.last + "'s"
        
        if should_consume_names:
            if not consume_name(female_names, self.standard, should_fail_if_in_used_database = True, should_fail_if_not_in_database = False):
                renpy.error("ERROR: Character_Names.build(): Can't build name '" + self.standard + "'. Name already in database.")
        
        return self

    def copy(src):
        return copy.copy(src)

    def set_name(self, kind, newName, newNamesPossessive = None):
        setattr(self, kind, newName)
        if (newNamesPossessive != None):
            setattr(self, kind + "Possessive", newNamesPossessive)
        else:
            setattr(self, kind + "Possessive", newName + "'s")

    @classmethod
    def generate_random(cls, gender, standard = None, standardPossessive = None, family = None):
        if (standard == None):
            if (gender == Gender.FEMALE):
                names_resource = female_names
            else:
                names_resource = male_names

            standard = pick_random_and_consume(names_resource)
            standardPossessive = possessive_from_name(names_resource, standard, should_fail_if_not_in_database = False)

        names = Character_Names().build(standard, standardPossessive, should_consume_names = False)

        if standard in names_resource.source.keys() and names_resource.source[standard]["canBeNickname"] == True:
            names_entry = names_resource.source[standard]
            if names_entry["linkedFirstNames"] > 1:
                randomIndex = random.randint(0, len(names_entry["linkedFirstNames"])-1)
                names.first = names_entry["linkedFirstNames"][randomIndex]
            else:
                names.first = names_entry["linkedFirstNames"][0]

        if (family == None):
            family = pick_random_and_consume(family_names)

        names.last = family
        return names

    def build_from_json(self, json):
        standard = None
        standard_possessive = None
        first = None
        first_possessive = None
        last = None
        last_possessive = None
        if "standard" in json.keys():
            standard = json["standard"]
        else:
            # TODO: Generate random value instead of rasing and error.
            renpy.error("ERROR: Character_Names.build_from_json(): Character does not have a 'standard' field.")
        if "standard_possessive" in json.keys():
            standard_possessive = json["standard_possessive"]
        if "first" in json.keys():
            first = json["first"]
        if "first_possessive" in json.keys():
            first_possessive = json["first_possessive"]
        if "last" in json.keys():
            last = json["last"]
        if "last_possessive" in json.keys():
            last_possessive = json["last_possessive"]
    
        self.build(standard, standard_possessive, first, first_possessive, last, last_possessive)
        
        return self
