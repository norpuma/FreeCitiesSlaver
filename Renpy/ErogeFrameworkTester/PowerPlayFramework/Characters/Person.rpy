init -2 python:
    characters = {}
    def register_character(character):
        characters[character] = character
    
    ENUM__GENDER__FEMALE = "ENUM__GENDER__FEMALE"
    ENUM__GENDER__MALE = "ENUM__GENDER__MALE"

    # class Person(renpy.store.object): #Everything that needs to be known about a person.
    #     def __init__(self, standard_name, age,
    #         first_name = None, last_name = None,
    #         body = Character_Body.generate_random(),
    #         personality = Character_Personality.generate_random(), sexuality = Character_Sexuality.generate_random(),
    #         roles = [],
    #         stat_list = Attributes.generate_random(), skill_list = Skills.generate_random(),
    #         home = None, occupation = None, work_place = None,
    #         name_color = "#ffffff", dialogue_color = "#ffffff",
    #         relationship_to_protagonist = None, relationship_from_protagonist = None,
    #         SO_name = None, kids = None):

    #         self.names = Character_Names(standard_name, first_name, last_name)
    #         register_character(self)

    #         self.home = home # The room the character goes to at night. If None, the character becomes inaccessible at that time.
    #         self.work_place = work_place # The room the character goes to for work.

    #         self.occupation = occupation
    #         self.schedule = {}
    #         self._initialize_schedule(schedule, occupation)

    #         self.personality = personality
    #         self.sexuality = sexuality
    #         self.roles = roles

    #         self.relationships = Character_Relationships()
    #         if relationship_to_protagonist != None:
    #             self.relationships.add(relationship_to_protagonist)
    #         if relationship_from_protagonist != None:
    #             self.relationships.add(relationship_from_protagonist)

    #         # Romantic, Sexual and Familial Relationships
    #         # TODO: Allow creation of random relationships.
    #         # TODO: LabRats2 references
    #         # if relationship:
    #         #     self.relationship = relationship
    #         # else:
    #         #     self.relationship = "Single" #Should be Single, Girlfriend, Fiancée, or Married.
    #         # if SO_name:
    #         #     self.SO_name = SO_name
    #         # else:
    #         #     self.SO_name = None #If not single, name of their SO (for guilt purposes or future events).
    #         # if kids:
    #         #     self.kids = kids
    #         # else:
    #         #     self.kids = 0


    #         return

    #     def _initialize_schedule(self, schedule, occupation):
    #         if (occupation == None):
    #             occupation = common_activities.get(ENUM__ACTIVITY__RELAX)
    #         sleep = common_activities.get(ENUM__ACTIVITY__SLEEP)
    #         for day_of_the_week_index in range(0, 7):
    #             if day_of_the_week_index == TIME_CONTROL__WEEK_DAY__FRIDAY__INDEX:
    #                 schedule[day_of_the_week_index] = {
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_MORNING: occupation,
    #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: occupation,
    #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: occupation,
    #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
    #                 }
    #             elif day_of_the_week_index == TIME_CONTROL__WEEK_DAY__SATURDAY__INDEX:
    #                 schedule[day_of_the_week_index] = {
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_MORNING: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
    #                 }
    #             elif day_of_the_week_index == TIME_CONTROL__WEEK_DAY__MONDAY__INDEX:
    #                 schedule[day_of_the_week_index] = {
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_MORNING: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
    #                 }
    #             else:
    #                 schedule[day_of_the_week_index] = {
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT:sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_NIGHT: sleep,
    #                     TIME_CONTROL__DAY_PART__EARLY_MORNING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_MORNING: occupation,
    #                     TIME_CONTROL__DAY_PART__EARLY_AFTERNOON: occupation,
    #                     TIME_CONTROL__DAY_PART__LATE_AFTERNOON: occupation,
    #                     TIME_CONTROL__DAY_PART__EARLY_EVENING: sleep,
    #                     TIME_CONTROL__DAY_PART__LATE_EVENING: sleep,
    #                 }
    #     def generate_random(gender):
    #         name = Character_Names.generate_random(gender)
    #         age = 22
    #         new_person = Person(standard_name = name, age = age,
    #         first_name = None, last_name = None,
    #         body = Character_Body.generate_random(),
    #         personality = Character_Personality.generate_random(), sexuality = Character_Sexuality.generate_random(),
    #         roles = [],
    #         stat_list = Attributes.generate_random(), skill_list = Skills.generate_random(),
    #         home = None, occupation = None, work_place = None,
    #         name_color = "#ffffff", dialogue_color = "#ffffff",
    #         relationship_to_protagonist = None, relationship_from_protagonist = None,
    #         SO_name = None, kids = None)

    class Character_Names(renpy.store.object):
        def __init__(self, standard_name, first_name, last_name):
            self.standard = standard_name
            return
        
        def generate_random(gender):
            new_name = None
            if gender == ENUM__GENDER__FEMALE:
                new_name = Character_Names("Trish")
            else: # gender == ENUM__GENDER__MALE
                new_name = Character_Names("Patrick")
            return new_name

# body_type,tits,height,body_images,expression_images,hair_colour,hair_style,pubes_colour,pubes_style,skin,eyes
# wardrobe, base_outfit = None,
# sluttiness=0,obedience=0,suggest=0
# sex_list=[0,0,0,0]
# love = 0, happiness = 100, 

# title = None, possessive_title = None, mc_title = None,
            # self.title = title #Note: We format these down below!
            # self.possessive_title = possessive_title #The way the girl is refered to in relation to you. For example "your sister", "your head researcher", or just their title again.
            # if mc_title:
            #     self.mc_title = mc_title #What they call the main character. Ie. "first name", "mr.last name", "master", "sir".
            # else:
            #     self.mc_title = "Stranger"
