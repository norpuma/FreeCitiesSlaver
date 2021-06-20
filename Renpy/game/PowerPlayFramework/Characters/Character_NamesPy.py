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
        for key in source_dict.keys():
            if key not in self.used_keys:
                self.available_keys.append(key)

female_names = Names_Resources()
male_names = Names_Resources()
family_names = Names_Resources()

def initialize_names(names_json):
    global female_names
    global male_names
    global family_names
    female_names = Names_Resources()
    male_names = Names_Resources()
    family_names = Names_Resources()

    for names_database_name, names_database in names_json.items():
        if names_database_name == "lastNames":
            family_names.reset_resources(names_database)
        elif names_database_name == "femaleNameDatabase":
            female_names.reset_resources(names_database)
        elif names_database_name == "maleNameDatabase":
            male_names.reset_resources(names_database)

def update_names(names_json):
    global female_names
    global male_names
    global family_names
    for names_database_name, names_database in names_json.items():
        if names_database_name == "lastNames":
            family_names.extend(names_database)
        elif names_database_name == "femaleNameDatabase":
            female_names.extend(names_database)
        elif names_database_name == "maleNameDatabase":
            male_names.extend(names_database)

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
        possessive = names_resource.source[name]["possessive"]
    else:
        if should_fail_if_not_in_database:
            raise "ERROR: possessive_from_name(): Name '{name}' not found in names_resource."
        else:
            if not name.endswith("s"):
                possessive = name + "'s"
            else:
                possessive = name + "'"

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

    def build(self, gender, standard_name, standard_possessive = None, first = None, first_possessive = None, last = None, last_possessive = None, should_consume_names = True, should_fail_if_in_used_database = True, should_fail_if_not_in_database = False):
        self.standard = standard_name
        if (standard_possessive != None):
            self.standard_possessive = standard_possessive
        else:
            self.standard_possessive = self.standard + "'s"

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
                self.last_possessive = possessive_from_name(female_names, self.last)
        
        if should_consume_names:
            if gender == Gender.FEMALE:
                resource = female_names
            else:
                resource = male_names
            if not consume_name(resource, self.standard, should_fail_if_in_used_database = should_fail_if_in_used_database, should_fail_if_not_in_database = should_fail_if_not_in_database):
                renpy.error("ERROR: Character_Names.build(): Can't build name '" + self.standard + "'. Name already in used names list.")
            if not consume_name(family_names, self.last, should_fail_if_in_used_database = should_fail_if_in_used_database, should_fail_if_not_in_database = should_fail_if_not_in_database):
                renpy.error("ERROR: Character_Names.build(): Can't build name '" + self.standard + "'. Name already in used names list.")

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
    def generate_random(cls, gender, standard = None, standard_possessive = None, first = None, first_possessive = None, family = None, family_possessive = None):
        if (gender == Gender.FEMALE):
            names_resource = female_names
        else:
            names_resource = male_names

        if first != None and standard == None:
            standard = first
            if first_possessive != None:
                standard_possessive = first_possessive
            else:
                standard_possessive = possessive_from_name(names_resource, standard, should_fail_if_not_in_database = False)

        if (standard == None):
            standard = pick_random_and_consume(names_resource)
            standard_possessive = possessive_from_name(names_resource, standard, should_fail_if_not_in_database = False)

        if first == None:
            if standard in names_resource.source.keys() and names_resource.source[standard]["canBeNickname"] == True:
                names_entry = names_resource.source[standard]
                if names_entry["linkedFirstNames"] > 1:
                    randomIndex = random.randint(0, len(names_entry["linkedFirstNames"])-1)
                    first = names_entry["linkedFirstNames"][randomIndex]
                else:
                    first = names_entry["linkedFirstNames"][0]
                first_possessive = possessive_from_name(names_resource, standard, should_fail_if_not_in_database = False)
            else:
                first = standard
                first_possessive = standard_possessive

        if (family == None):
            family = pick_random_and_consume(family_names)

        names = Character_Names().build(gender, standard, standard_possessive, first, first_possessive, family, family_possessive, should_consume_names = True, should_fail_if_in_used_database = False, should_fail_if_not_in_database = False)
        return names

    def build_from_json(self, gender, json):
        if gender == None or gender == "" or (gender != Gender.FEMALE and gender != Gender.MALE):
            renpy.error("ERROR: Character_Names.build_from_json(): Character does not have a 'standard' field.")
        standard = None
        standard_possessive = None
        first = None
        first_possessive = None
        last = None
        last_possessive = None
        if gender == Gender.FEMALE:
            resource = female_names
        else:
            resource = male_names
        if "standard" in json.keys():
            standard = json["standard"]
            consume_name(resource, standard, should_fail_if_in_used_database = True, should_fail_if_not_in_database = False)
        if "standard_possessive" in json.keys():
            standard_possessive = json["standard_possessive"]
        if "first" in json.keys():
            first = json["first"]
            consume_name(resource, first, should_fail_if_in_used_database = True, should_fail_if_not_in_database = False)
        if "first_possessive" in json.keys():
            first_possessive = json["first_possessive"]
        if "last" in json.keys():
            last = json["last"]
            consume_name(family_names, last, should_fail_if_in_used_database = False, should_fail_if_not_in_database = False)
        if "last_possessive" in json.keys():
            last_possessive = json["last_possessive"]

        if first != None and standard == None:
            standard = first
        random_parts = Character_Names.generate_random(gender, standard, standard_possessive, first, first_possessive, last, last_possessive)
        if standard == None:
            standard = random_parts.standard
        if standard_possessive == None:
            standard_possessive = random_parts.standard_possessive
        if first == None:
            first = random_parts.first
        if first_possessive == None:
            first_possessive = random_parts.first_possessive
        if last == None:
            last = random_parts.last
        if last_possessive == None:
            last_possessive = random_parts.last_possessive

        self.build(gender, standard, standard_possessive, first, first_possessive, last, last_possessive, should_consume_names=False)
        
        return self
