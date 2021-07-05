import Character_FundamentalsPy as fundamentals
from .Character_NamesPy import Character_Names
from .Status.Character_StatusPy import Character_Status
from .PersonalityPy import Character_Personality
import renpy.exports as renpy

def register_character(character):
    fundamentals.characters_database[character.id] = character

def load_characters_from_json_object(json_object):
    for key, value in json_object.items():
        new_character = Developed_Character(key).build_from_json(key, value)


class Minimal_Character(fundamentals.Buildable_From_Json):
    default_character_talk_color = "#ffffff"
    def __init__(self, id):
        self._reset(id)
    
    def _reset(self, id):
        if hasattr(self, "id") and self.id in fundamentals.characters_database.keys():
            fundamentals.characters_database.pop(self.id)
        self.names = None
        self.id = id
        self.gender = None
        self.age = None
        self.talk_color = Minimal_Character.default_character_talk_color
        self._location = None
        self._pronouns = None
        return self

    @classmethod
    def set_default_character_talk_color(cls, color):
        cls.default_character_talk_color = color

    def set_names(self, names):
        self.names = names
        if self.id == None:
            self.id = names.standard
    
    def set_gender(self, gender):
        self.gender = gender
        if self.gender == fundamentals.Gender.FEMALE:
            self._pronouns = fundamentals.female_pronouns
        else:
            self._pronouns = fundamentals.male_pronouns

    def set_age(self, age):
        self.age = age
    
    @property
    def location(self):
        return self._location
    
    @location.setter
    def location(self, val):
        if self._location != None and self in self._location.characters:
            self._location.characters.remove(self)
        self._location = val
        if val != None:
            val.characters.append(self)
    
    @property
    def pronouns(self):
        return self._pronouns

    def build(self, id, names, gender, age):
        self._reset(id)
        if id is None or id == "":
            renpy.error("ERROR: Cannot create Minimal_Character without an 'id'.")
        self._reset(id)
        self.set_names(names)
        self.set_gender(gender)
        self.set_age(age)
        register_character(self)
        return self

    def build_from_json(self, id, json):
        names = None
        gender = None
        age = None
        control = "EMPTY"
        if "gender" in json.keys():
            gender = json["gender"]
        else:
            gender = fundamentals.Gender.generate_random()
        if "names" in json.keys():
            control = "PARTIAL"
            names = Character_Names(id).build_from_json(id, gender, json["names"])
        else:
            control = "FULL"
            names = Character_Names.generate_random(gender)
        if "age" in json.keys():
            age = int(json["age"])
        else:
            # TODO: Generate random value instead of rasing and error.
            renpy.error("ERROR: Minimal_Character.build_from_json(): Character does not have a 'age' field.")
    
        result = self.build(id, names, gender, age)
        # NORPUMA: REMOVE after debugging
        #result._location = ""
        
        return result
    
    def format_say(self, *message_parts):
        is_quoted_part = True
        is_subsequent_part = False
        result = ""
        for part in message_parts:
            if part != "":
                if is_subsequent_part:
                    result += " "
                else:
                    is_subsequent_part = True
                if is_quoted_part:
                    result += "{color=" + self.talk_color + "}\"" + part + "\"{/color}"
                else:
                    result += part
            is_quoted_part = not is_quoted_part
        return result

    def move_to_location(self, target_location):
        if self.location is not None and self.location.is_character_here(self):
            self.location.remove_character(self)
        self.location = target_location
        if target_location is not None:
            target_location.add_character(self)
    
    def get_trait(self, trait):
        return None
    
    def compare_trait(self, trait, comparing_expression):
        return False
    
    def execute_with_trait(self, trait, function):
        return False

class Developed_Character(Minimal_Character):
    def __init__(self, id):
        super(Developed_Character, self).__init__(id)
        self._reset(id)
    
    def _reset(self, id):
        super(Developed_Character, self)._reset(id)
        self.id = id
        self.personality = Character_Personality(self.id)

        self.status = Character_Status()
        self.relationships = {}

    def add_relationship(self, relationship):
        self.relationships[relationship.target] = relationship

    def build(self, id, names, gender, age):
        self._reset(id)
        super(Developed_Character, self).build(id, names, gender, age)
        return self

    def build_from_json(self, id, json):
        super(Developed_Character, self).build_from_json(id, json)
        return self

# class Person(Minimal_Character): #Everything that needs to be known about a person.
#     def __init__(self):
#         self.reset()
    
#     def reset(self):
#         super(Person, self).reset()
#         self.body = None
#         self.personality = None
#         self.sexuality = None
#         self.social_roles = []
#         self.activities = None
#         self.relationships = {}
# #         self.home = home # The room the character goes to at night. If None, the character becomes inaccessible at that time.
# #         self.work_place = work_place # The room the character goes to for work.

# #         self.occupation = occupation
# #         self.schedule = {}
# #         self._initialize_schedule(schedule, occupation)

# #         self.personality = personality
# #         self.sexuality = sexuality
# #         self.roles = roles

# #         self.relationships = Character_Relationships()
# #         if relationship_to_protagonist != None:
# #             self.relationships.add(relationship_to_protagonist)
# #         if relationship_from_protagonist != None:
# #             self.relationships.add(relationship_from_protagonist)

# #         # Romantic, Sexual and Familial Relationships
# #         # TODO: Allow creation of random relationships.
# #         # TODO: LabRats2 references
# #         # if relationship:
# #         #     self.relationship = relationship
# #         # else:
# #         #     self.relationship = "Single" #Should be Single, Girlfriend, Fiancée, or Married.
# #         # if SO_name:
# #         #     self.SO_name = SO_name
# #         # else:
# #         #     self.SO_name = None #If not single, name of their SO (for guilt purposes or future events).
# #         # if kids:
# #         #     self.kids = kids
# #         # else:
# #         #     self.kids = 0
#         return self

# #     def _initialize_schedule(self, schedule, occupation):
# #         if (occupation == None):
# #             occupation = common_activities.get(ENUM__ACTIVITY__RELAX)
# #         sleep = common_activities.get(ENUM__ACTIVITY__SLEEP)
# #         for day_of_the_week_index in range(0, 7):
# #             if day_of_the_week_index == TIME_CONTROL__WEEK_DAY__FRIDAY__INDEX:
# #                 schedule[day_of_the_week_index] = {
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_MORNING: occupation,
# #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: occupation,
# #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: occupation,
# #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
# #                 }
# #             elif day_of_the_week_index == TIME_CONTROL__WEEK_DAY__SATURDAY__INDEX:
# #                 schedule[day_of_the_week_index] = {
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_MORNING: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
# #                 }
# #             elif day_of_the_week_index == TIME_CONTROL__WEEK_DAY__MONDAY__INDEX:
# #                 schedule[day_of_the_week_index] = {
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_MORNING: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
# #                 }
# #             else:
# #                 schedule[day_of_the_week_index] = {
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
# #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_MORNING: occupation,
# #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: occupation,
# #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: occupation,
# #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
# #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
# #                 }

#     def set_body(self, body):
#         self.body = body
    
#     def set_personality(self, personality):
#         self.personality = personality
    
#     def set_sexuality(self, sexuality):
#         self.sexuality = sexuality
    
#     def set_social_roles(self, social_roles):
#         self.social_roles = social_roles
    
#     def set_activities(self, activities):
#         self.activities = activities
    
#     def set_relationships(self, relationships):
#         self.relationships = relationships

#     # def build_from_json(cls, json):
#     #     result = cls()
#     #     json_keys = json.keys()
#     #     for attr in result.__dict__.keys():
#     #         # TODO: Remove these checks if no longer necessary.
#     #         # if attr == "actor_used_body_part_id":
#     #         #     actor_used_body_part_id = json[attr]
#     #         # elif attr == "target_used_body_part_id":
#     #         #     target_used_body_part_id = json[attr]
#     #         # elif attr == "verb_id":
#     #         #     verb_id = json[attr]
#     #         # elif attr == "actor_verb":
#     #         #     actor_verb = json[attr]
#     #         # elif attr == "is_continuous":
#     #         #     is_continuous = json[attr]
#     #         # elif attr == "actor_verb_present_continuous":
#     #         #     actor_verb_present_continuous = json[attr]
#     #         # elif attr == "target_verb_passive_present_continuous":
#     #         #     target_verb_passive_present_continuous = json[attr]
#     #         # elif attr in json_keys:
#     #         #     result.__dict__[attr] = json[attr]
#     #         if attr in json_keys:
#     #             result.__dict__[attr] = json[attr]
#     #     # if actor_used_body_part_id == None or target_used_body_part_id == None or verb_id == None or actor_verb == None:
#     #     #     raise "ERROR: Sexual_Action_Advanced.build_from_json(): Required attributes not found: actor_used_body_part_id == '{actor_used_body_part_id}', target_used_body_part_id == '{target_used_body_part_id}', verb_id = '{verb_id}', action_verb == '{actor_verb}'."
        
#     #     # result._build(actor_used_body_part_id, target_used_body_part_id, verb_id, actor_verb, is_continuous, actor_verb_present_continuous, target_verb_passive_present_continuous)

#     #     return result

#     def build(self, standard_name, gender, age,
#             first_name, last_name,
#             body,
#             personality, sexuality,
#             roles,
#             stat_list, skill_list,
#             home, occupation, work_place,
#             name_color = "#ffffff", dialogue_color = "#ffffff",
#             relationship_to_protagonist = None, relationship_from_protagonist = None,
#             SO_name = None, kids = None, should_fail_on_missing_required_attributes = False
#         ):

#         self.names = Character_Names(standard_name, first_name, last_name)
#         register_character(self)

#         missing_required_attributes = self.check_for_missing_required_attributes()
#         if should_fail_on_missing_required_attributes and len(missing_required_attributes) > 0:
#             raise "ERROR: Person.build(): Missing required attributes [{missing_required_attributes}]."
#         self.add_required_attributes(missing_required_attributes)
    
#     def check_for_missing_required_attributes(self):
#         missing_required_attributes = []
#         if self.gender == None:
#             missing_required_attributes.append("GENDER")
#         if self.age == None:
#             missing_required_attributes.append("AGE")
#         if self.names == None:
#             missing_required_attributes.append("NAMES")
#         if self.body == None:
#             missing_required_attributes.append("BODY")
#         if self.personality == None:
#             missing_required_attributes.append("PERSONALITY")
#         if self.sexuality == None:
#             missing_required_attributes.append("SEXUALITY")
#         if self.stat_list == None:
#             missing_required_attributes.append("STAT_LIST")
#         if self.skill_list == None:
#             missing_required_attributes.append("SKILL_LIST")
        
#         return missing_required_attributes

#     def add_required_attributes(self, missing_required_attributes, random_generation_strategy):
#         # For each attribute in the list of missing_required_attributes, generate a corresponding random value.

#         # random_generation_strategy is one of FULLY_RANDOM, SOCIAL_AVERAGE, FILL_GAPS

#         # TODO: Implement validation and generation for each class-specific required attributes.
#         # GENDER
#         # AGE
#         # Character_Names.generate_random(gender)
#         # Character_Body.generate_random(gender, age)
#         # Character_Personality.generate_random(gender, age)
#         # Character_Sexuality.generate_random(gender, age)
#         # STAT_LIST Attributes.generate_random(gender, age)
#         # SKILL_LIST Skills.generate_random(gender, age)
#         pass

#     def generate_random(gender, random_generation_strategy):
#         # random_generation_strategy is one of FULLY_RANDOM, SOCIAL_AVERAGE, FILL_GAPS

#         # TODO: Implement random value generation.
# #         name = Character_Names.generate_random(gender)
# #         age = 22
# #         new_person = Person(standard_name = name, age = age,
# #         first_name = None, last_name = None,
# #         body = Character_Body.generate_random(),
# #         personality = Character_Personality.generate_random(), sexuality = Character_Sexuality.generate_random(),
# #         roles = [],
# #         stat_list = Attributes.generate_random(), skill_list = Skills.generate_random(),
# #         home = None, occupation = None, work_place = None,
# #         name_color = "#ffffff", dialogue_color = "#ffffff",
# #         relationship_to_protagonist = None, relationship_from_protagonist = None,
# #         SO_name = None, kids = None)
#         pass

# # body_type,tits,height,body_images,expression_images,hair_colour,hair_style,pubes_colour,pubes_style,skin,eyes
# # wardrobe, base_outfit = None,
# # sluttiness=0,obedience=0,suggest=0
# # sex_list=[0,0,0,0]
# # love = 0, happiness = 100, 

# # title = None, possessive_title = None, mc_title = None,
#         # self.title = title #Note: We format these down below!
#         # self.possessive_title = possessive_title #The way the girl is refered to in relation to you. For example "your sister", "your head researcher", or just their title again.
#         # if mc_title:
#         #     self.mc_title = mc_title #What they call the main character. Ie. "first name", "mr.last name", "master", "sir".
#         # else:
#         #     self.mc_title = "Stranger"
