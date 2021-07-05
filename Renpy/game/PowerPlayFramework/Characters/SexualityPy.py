ENUM__SENSUAL_SKILLS__KISSING = "ENUM__SENSUAL_SKILLS__KISSING"
ENUM__SENSUAL_SKILLS__FELLATIO = "ENUM__SENSUAL_SKILLS__FELLATIO"
ENUM__SENSUAL_SKILLS__CUNNILINGUS = "ENUM__SENSUAL_SKILLS__CUNNILINGUS"
ENUM__SENSUAL_SKILLS__ANALINGUS = "ENUM__SENSUAL_SKILLS__ANALINGUS"
ENUM__SENSUAL_SKILLS__MASTURBATION = "ENUM__SENSUAL_SKILLS__MASTURBATION"
ENUM__SENSUAL_SKILLS__HANDJOB = "ENUM__SENSUAL_SKILLS__HANDJOB"
ENUM__SENSUAL_SKILLS__FINGERING = "ENUM__SENSUAL_SKILLS__FINGERING"
ENUM__SENSUAL_SKILLS__BREASTPLAY = "ENUM__SENSUAL_SKILLS__BREASTPLAY"
ENUM__SENSUAL_SKILLS__RECEIVEVAGINALPENETRATION = "ENUM__SENSUAL_SKILLS__RECEIVEVAGINALPENETRATION"
ENUM__SENSUAL_SKILLS__RECEIVEANALPENETRATION = "ENUM__SENSUAL_SKILLS__RECEIVEANALPENETRATION"
ENUM__SENSUAL_SKILLS__PERFORMVAGINALPENETRATION = "ENUM__SENSUAL_SKILLS__PERFORMVAGINALPENETRATION"
ENUM__SENSUAL_SKILLS__PERFORMORALPENETRATION = "ENUM__SENSUAL_SKILLS__PERFORMORALPENETRATION"
ENUM__SENSUAL_SKILLS__PERFORMANALPENETRATION = "ENUM__SENSUAL_SKILLS__PERFORMANALPENETRATION"
ENUM__SENSUAL_SKILLS__SENSUALBODYLANGUAGE = "ENUM__SENSUAL_SKILLS__SENSUALBODYLANGUAGE"
ENUM__SENSUAL_SKILLS__RECEIVEBONDAGE = "ENUM__SENSUAL_SKILLS__RECEIVEBONDAGE"
ENUM__SENSUAL_SKILLS__PERFORMBONDAGE = "ENUM__SENSUAL_SKILLS__PERFORMBONDAGE"

ENUM__EROGENOUS_ZONE_SENSITIVITY__INSENSITIVE = "ENUM__EROGENOUS_ZONE_SENSITIVITY__INSENSITIVE"
ENUM__EROGENOUS_ZONE_SENSITIVITY__DULLED = "ENUM__EROGENOUS_ZONE_SENSITIVITY__DULLED"
ENUM__EROGENOUS_ZONE_SENSITIVITY__SOOTHING = "ENUM__EROGENOUS_ZONE_SENSITIVITY__SOOTHING"
ENUM__EROGENOUS_ZONE_SENSITIVITY__SENSITIVE = "ENUM__EROGENOUS_ZONE_SENSITIVITY__SENSITIVE"
ENUM__EROGENOUS_ZONE_SENSITIVITY__OVERSENSITIVE = "ENUM__EROGENOUS_ZONE_SENSITIVITY__OVERSENSITIVE"

ENUM__EROGENOUS_ZONES__GLANS = "ENUM__EROGENOUS_ZONES__GLANS" # Penis-Head
ENUM__EROGENOUS_ZONES__PENIS_SHAFT = "ENUM__EROGENOUS_ZONES__PENIS_SHAFT"
ENUM__EROGENOUS_ZONES__SCROTUM = "ENUM__EROGENOUS_ZONES__SCROTUM" # Ballsack
ENUM__EROGENOUS_ZONES__PENIS_BASE = "ENUM__EROGENOUS_ZONES__PENIS_BASE"

ENUM__EROGENOUS_ZONES__CLITORIS = "ENUM__EROGENOUS_ZONES__CLITORIS"
ENUM__EROGENOUS_ZONES__LABIA = "ENUM__EROGENOUS_ZONES__LABIA"
ENUM__EROGENOUS_ZONES__VAGINA = "ENUM__EROGENOUS_ZONES__VAGINA" # Channel
ENUM__EROGENOUS_ZONES__BREASTS = "ENUM__EROGENOUS_ZONES__BREASTS"

ENUM__EROGENOUS_ZONES__MOUTH = "ENUM__EROGENOUS_ZONES__MOUTH" # or Tongue
ENUM__EROGENOUS_ZONES__THROAT = "ENUM__EROGENOUS_ZONES__THROAT"
ENUM__EROGENOUS_ZONES__STOMACH = "ENUM__EROGENOUS_ZONES__STOMACH" # Belly
ENUM__EROGENOUS_ZONES__NIPPLES = "ENUM__EROGENOUS_ZONES__NIPPLES"
ENUM__EROGENOUS_ZONES__THIGHS = "ENUM__EROGENOUS_ZONES__THIGHS"
ENUM__EROGENOUS_ZONES__BUTTOCKS = "ENUM__EROGENOUS_ZONES__BUTTOCKS"
ENUM__EROGENOUS_ZONES__ANUS = "ENUM__EROGENOUS_ZONES__ANUS"
ENUM__EROGENOUS_ZONES__RECTUM = "ENUM__EROGENOUS_ZONES__RECTUM"

class Character_Sexuality(object):
    def __init__(self, character_id):
        self.character_id = character_id
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
        if (gender == "GENDER__FEMALE"):
            return Character_Sexuality._generate_random_female_sexuality()
        else:
            return Character_Sexuality._generate_random_male_sexuality()
    
    def _generate_random_female_sexuality():
        result = Character_Sexuality()
        return result

    def _generate_random_male_sexuality():
        result = Character_Sexuality()
        return result

