import random

collection_of_personalities = {}

ENUM__INTERESTS__SCIENCE = "SCIENCE"
ENUM__INTERESTS__SPORTS = "SPORTS"
ENUM__INTERESTS__GAMES = "GAMES"
ENUM__INTERESTS__COOKING = "COOKING"
ENUM__INTERESTS__NEWS = "NEWS"
ENUM__INTERESTS__MOVIES = "MOVIES"
ENUM__INTERESTS__FASHION = "FASHION"
ENUM__INTERESTS__COMPUTERS = "COMPUTERS"
ENUM__INTERESTS__SEX = "SEX"
ENUM__INTERESTS__ROMANCE = "ROMANCE"
ENUM__INTERESTS__MUSIC = "MUSIC"
ENUM__INTERESTS__BOOKS = "BOOKS"
ENUM__INTERESTS__POLITICS = "POLITICS"

potential_interests = [
    ENUM__INTERESTS__SCIENCE,
    ENUM__INTERESTS__SPORTS,
    ENUM__INTERESTS__GAMES,
    ENUM__INTERESTS__COOKING,
    ENUM__INTERESTS__NEWS,
    ENUM__INTERESTS__MOVIES,
    ENUM__INTERESTS__FASHION,
    ENUM__INTERESTS__COMPUTERS,
    ENUM__INTERESTS__SEX,
    ENUM__INTERESTS__ROMANCE,
    ENUM__INTERESTS__MUSIC,
    ENUM__INTERESTS__BOOKS,
    ENUM__INTERESTS__POLITICS
]

ENUM__CONTEXTS__FRIENDLY_CONVERSATION = "ENUM__CONTEXTS__FRIENDLY_CONVERSATION"
ENUM__CONTEXTS__POWER = "ENUM__CONTEXTS__POWER"
ENUM__CONTEXTS__SENSUAL_FLIRTING = "ENUM__CONTEXTS__SENSUAL_FLIRTING"
ENUM__CONTEXTS__SEXUAL_MAKEOUT = "ENUM__CONTEXTS__SEXUAL_MAKEOUT"
ENUM__CONTEXTS__SEXUAL_EXPOSED_GENITALIA = "ENUM__CONTEXTS__SEXUAL_EXPOSED_GENITALIA"
ENUM__CONTEXTS__SEXUAL_INTERCOURSE = "ENUM__CONTEXTS__SEXUAL_INTERCOURSE"

class Character_Interests(object):
    def __init__(self):
        self.interests = {}
    
    @classmethod
    def generate_random(cls):
        result = cls()
        used_indexes = []
        for i in range(3):
            new_topic_found = False
            while not new_topic_found:
                topic_index = random.randrange(0, len(potential_interests))
                if topic_index not in used_indexes:
                    used_indexes.append(topic_index)
                    new_topic_found = True
                    topic = potential_interests[topic_index]
                    result.interests[topic] = random.randint(1, 3)
        
        for i in range(2):
            new_topic_found = False
            while not new_topic_found:
                topic_index = random.randrange(0, len(potential_interests))
                if topic_index not in used_indexes:
                    used_indexes.append(topic_index)
                    new_topic_found = True
                    topic = potential_interests[topic_index]
                    result.interests[topic] = -1

        return result

class Character_Personality(object):
    def __init__(self, character_id):
        self.character_id = character_id
        self.interests = Character_Interests.generate_random()


        # self.integrity = 0 # How easy it is to change that character's opinion.
        # self.obedience = 0 # How obedient this character is when pressed.
        # self.liberated = 0 # How sexually liberated this character is.
        # self.empathy = 0 # How much this character cares about others.
        # self.pride = 0
        # self.dutifulness = 0
        # self.slave_role = 0
        # self.libido = 0
        # self.modesty = 0
        # self.courage = 0


        # TODO: From LabRats2
        # These are the labels we will be trying to get our dialogue. If the labels do not exist we will get their defaults instead. A default should _always_ exist, if it does not our debug check will produce an error.
        # self.response_label_ending = ["greetings",
        # "sex_responses_foreplay", "sex_responses_oral", "sex_responses_vaginal", "sex_responses_anal",
        # "climax_responses_foreplay", "climax_responses_oral", "climax_responses_vaginal", "climax_responses_anal",
        # "clothing_accept", "clothing_reject", "clothing_review",
        # "strip_reject", "strip_obedience_accept", "grope_body_reject", "sex_accept", "sex_obedience_accept", "sex_gentle_reject", "sex_angry_reject",
        # "seduction_response", "seduction_accept_crowded", "seduction_accept_alone", "seduction_refuse",
        # "flirt_response", "flirt_response_low", "flirt_response_mid", "flirt_response_high", "flirt_response_girlfriend", "flirt_response_affair", "flirt_response_text",
        # "condom_demand", "condom_ask", "condom_bareback_ask", "condom_bareback_demand",
        # "cum_face", "cum_mouth", "cum_pullout", "cum_condom", "cum_vagina", "cum_anal", "surprised_exclaim", "talk_busy",
        # "improved_serum_unlock", "sex_strip", "sex_watch", "being_watched", "work_enter_greeting", "date_seduction", "sex_end_early", "sex_take_control", "sex_beg_finish", "sex_review" ,"introduction",
        # "kissing_taboo_break", "touching_body_taboo_break", "touching_penis_taboo_break", "touching_vagina_taboo_break", "sucking_cock_taboo_break", "licking_pussy_taboo_break", "vaginal_sex_taboo_break", "anal_sex_taboo_break",
        # "condomless_sex_taboo_break", "underwear_nudity_taboo_break", "bare_tits_taboo_break", "bare_pussy_taboo_break",
        # "facial_cum_taboo_break", "mouth_cum_taboo_break", "body_cum_taboo_break", "creampie_taboo_break", "anal_creampie_taboo_break"]

        # self.response_dict = {}
        # for ending in self.response_label_ending:
        #     if renpy.has_label(self.personality_type_prefix + "_" + ending):
        #         self.response_dict[ending] = self.personality_type_prefix + "_" + ending
        #     elif default_prefix is not None: #A default is used when one personality is similar to anouther and has only specific responses overwritten (ex. Stephanie is a modified wild personality).
        #         self.response_dict[ending] = self.default_prefix + "_" + ending
        #     else:
        #         self.response_dict[ending] = "relaxed_" + ending #If nothing is given we assume we don't want to crash and we should put in some sort of value.

        #Establish our four classes of favoured likes and dislikes. Intensity (ie. love vs like, dislike vs hate) is decided on a person to person basis.
        self.common_likes = []

        self.common_sexy_likes = []

        self.common_dislikes = []

        self.common_sexy_dislikes = []
        return

    @classmethod
    def build_from_json(cls, json):
        result = cls()
        json_keys = json.keys()
        for attr in result.__dict__.keys():
            # TODO: Remove these checks if no longer necessary.
            # if attr == "actor_used_body_part_id":
            #     actor_used_body_part_id = json[attr]
            # elif attr == "target_used_body_part_id":
            #     target_used_body_part_id = json[attr]
            # elif attr == "verb_id":
            #     verb_id = json[attr]
            # elif attr == "actor_verb":
            #     actor_verb = json[attr]
            # elif attr == "is_continuous":
            #     is_continuous = json[attr]
            # elif attr == "actor_verb_present_continuous":
            #     actor_verb_present_continuous = json[attr]
            # elif attr == "target_verb_passive_present_continuous":
            #     target_verb_passive_present_continuous = json[attr]
            # elif attr in json_keys:
            #     result.__dict__[attr] = json[attr]
            if attr in json_keys:
                result.__dict__[attr] = json[attr]
        # if actor_used_body_part_id == None or target_used_body_part_id == None or verb_id == None or actor_verb == None:
        #     raise "ERROR: Sexual_Action_Advanced.build_from_json(): Required attributes not found: actor_used_body_part_id == '{actor_used_body_part_id}', target_used_body_part_id == '{target_used_body_part_id}', verb_id = '{verb_id}', action_verb == '{actor_verb}'."
        
        # result._build(actor_used_body_part_id, target_used_body_part_id, verb_id, actor_verb, is_continuous, actor_verb_present_continuous, target_verb_passive_present_continuous)

        return result

    def build(self,
        should_fail_on_missing_required_attributes = False
    ):
        # TODO: Implement the actual object building part.

        missing_required_attributes = self.check_for_missing_required_attributes()
        if should_fail_on_missing_required_attributes and len(missing_required_attributes) > 0:
            raise "ERROR: Person.build(): Missing required attributes [{missing_required_attributes}]."
        self.add_required_attributes(missing_required_attributes)
    

    def check_for_missing_required_attributes(self):
        missing_required_attributes = []
        if self.gender == None:
            missing_required_attributes.append("GENDER")
        if self.age == None:
            missing_required_attributes.append("AGE")

        # TODO: Implement checks for other class-specific required attributes.

        return missing_required_attributes

    def add_required_attributes(self, missing_required_attributes, random_generation_strategy):
        # For each attribute in the list of missing_required_attributes, generate a corresponding random value.

        # random_generation_strategy is one of FULLY_RANDOM, SOCIAL_AVERAGE, FILL_GAPS

        # TODO: Implement validation and generation for each class-specific required attributes.
        pass

    def generate_random(gender, random_generation_strategy):
        # random_generation_strategy is one of FULLY_RANDOM, SOCIAL_AVERAGE, FILL_GAPS

        # TODO: Implement random value generation.
        pass


# Things to have opinions on:
opinionable_topics = {}

# TODO: From LabRats2
# Regular opinions _usually_ add a bit of bonus happiness, but some may influence some options or effects.
# opinions_list = [] #A master list of things a character might like or dislike. Should always be named so it fits the framework "Likes X" or "Dislikes X". Personalities have a unique list that they always draw from as well
# opinions_list.append("skirts")
# opinions_list.append("pants")
# opinions_list.append("small talk") #Has gameplay effect.
# opinions_list.append("Mondays") #Has gameplay effect
# opinions_list.append("Fridays") #Has gameplay effect
# opinions_list.append("the weekend") #Has gameplay effect
# opinions_list.append("working") #Has gameplay effect
# opinions_list.append("the colour blue")
# opinions_list.append("the colour yellow")
# opinions_list.append("the colour red")
# opinions_list.append("the colour pink")
# opinions_list.append("the colour black")
# opinions_list.append("heavy metal")
# opinions_list.append("jazz")
# opinions_list.append("punk")
# opinions_list.append("classical")
# opinions_list.append("pop")
# opinions_list.append("conservative outfits") #Has gameplay effect
# opinions_list.append("work uniforms") #Has gameplay effect
# opinions_list.append("research work") #Has gameplay effect
# opinions_list.append("marketing work") #Has gameplay effect
# opinions_list.append("HR work") #Has gameplay effect
# opinions_list.append("supply work") #Has gameplay effect
# opinions_list.append("production work") #Has gameplay effect
# opinions_list.append("makeup")
# opinions_list.append("flirting") #Has gameplay effect
# opinions_list.append("sports") #Has gameplay effect
# opinions_list.append("hiking") #Hsa gameplay effect

# Sexy opinions _usually_ add a bit of bonus sluttiness, but some may influence some sex scenes, make some approaches more likely, or have other effects.
# sexy_opinions_list = [] #Another list of opinions, but these ones are sex/kink related and probably shoudn't be brought up in polite conversation.
# sexy_opinions_list.append("doggy style sex") #Has gameplay effect
# sexy_opinions_list.append("missionary style sex") #Has gameplay effect
# sexy_opinions_list.append("sex standing up") #Has gameplay effect
# sexy_opinions_list.append("giving blowjobs") #Has gameplay effect
# sexy_opinions_list.append("getting head") #Has gameplay effect
# sexy_opinions_list.append("anal sex") #Has gameplay effect
# sexy_opinions_list.append("vaginal sex") #Has gameplay effect
# sexy_opinions_list.append("public sex") #Has gameplay effect
# sexy_opinions_list.append("kissing") #Has gameplay effect
# sexy_opinions_list.append("lingerie") #Has gameplay effect
# sexy_opinions_list.append("masturbating") #Has gameplay effect
# sexy_opinions_list.append("giving handjobs") #Has gameplay effect
# sexy_opinions_list.append("giving tit fucks") #Has gameplay effect
# sexy_opinions_list.append("being fingered") #Has gameplay effect
# sexy_opinions_list.append("skimpy uniforms") #Has gameplay effect
# sexy_opinions_list.append("skimpy outfits") #Has gameplay effect
# sexy_opinions_list.append("not wearing underwear") #Has gameplay effect
# sexy_opinions_list.append("not wearing anything") #Has gameplay effect
# sexy_opinions_list.append("showing her tits") #Has gameplay effect
# sexy_opinions_list.append("showing her ass") #Has gameplay effect
# sexy_opinions_list.append("being submissive") #Has gameplay effect
# sexy_opinions_list.append("taking control") #Has gameplay effect
# sexy_opinions_list.append("drinking cum") #Has gameplay effect
# sexy_opinions_list.append("creampies") #Has gameplay effect
# sexy_opinions_list.append("cum facials") #Has gameplay effect
# sexy_opinions_list.append("being covered in cum") #Has gameplay effect
# sexy_opinions_list.append("bareback sex") #Has gameplay effect.
# sexy_opinions_list.append("big dicks")
# sexy_opinions_list.append("cheating on men") #Has gameplay effect
# sexy_opinions_list.append("anal creampies") #Has gameplay effect
# sexy_opinions_list.append("incest") #Has gameplay effect
