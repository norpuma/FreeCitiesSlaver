class Character_Body(object):
    def __init__(self, gender):
        self._initialize_body_parts(gender)
        self.reset(gender)

    def _initialize_body_parts(self, gender):
        self.body_parts = {}
        body_part = Character_Body_Part("RIGHT_HAND", "right hand")
        self._add_body_part(body_part.id, body_part)
        body_part = Character_Body_Part("LEFT_HAND", "left hand")
        self._add_body_part(body_part.id, body_part)
        body_part = Character_Body_Part("FACE")
        self._add_body_part(body_part.id, body_part)
        if gender == "FEMALE":
            body_part = Character_Body_Part("BREASTS", "breasts")
            self._add_body_part(body_part.id, body_part)
            body_part = Character_Body_Part("LABIA", "labia")
            self._add_body_part(body_part.id, body_part)
            body_part = Character_Body_Part("CLIT", "clit")
            self._add_body_part(body_part.id, body_part)
            body_part = Character_Body_Part("VAGINA", "vagina")
            self._add_body_part(body_part.id, body_part)
        else: # gender == "MALE"
            body_part = Character_Body_Part("PENIS_HEAD", "penis head")
            self._add_body_part(body_part.id, body_part)
            body_part = Character_Body_Part("PENIS_SHAFT", "penis shaft")
            self._add_body_part(body_part.id, body_part)
            body_part = Character_Body_Part("PENIS_BASE", "penis base")
            self._add_body_part(body_part.id, body_part)
            body_part = Character_Body_Part("SCROTUM", "scrotum")
            self._add_body_part(body_part.id, body_part)

    def _add_body_part(self, id, body_part):
        self.body_parts[id] = body_part

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

    def get_part(self, body_part_id):
        if body_part_id == "ANY_FREE_HAND":
            right = self.get("RIGHT_HAND")
            left = self.get("LEFT_HAND")
            if right != None and right.is_active == False:
                return right
            elif left != None and left.is_active == False:
                return left
            else:
                return None
        if body_part_id not in self.body_parts.keys():
            return None
        else:
            return self.body_parts[body_part_id]

    def is_body_part_active(self, body_part_id):
        if body_part_id not in self.body_parts.keys():
            return "ERROR"
        
        body_part = self.body_parts[body_part_id]
        return body_part.is_active
    
    def make_part_available(self, body_part_id):
        if body_part_id not in self.body_parts.keys():
            return "ERROR"
        
        body_part = self.body_parts[body_part_id]
        return body_part.make_available()

class Character_Body_Part(object):
    def __init__(self, id, game_term):
        self.id = id
        self.game_term = game_term
        self.is_active = False
        self.is_restrained = False
        self.is_clothed = False
        self.descriptor_verb = None
        self.connected_body_part = None
        self.connected_body_part_owner = None
    
    def make_available(self):
        self.is_active = False
        self.connected_body_part.is_active = False
        self.connected_body_part.descriptor_verb = None
        self.connected_body_part.connected_body_part = None
        self.connected_body_part.connected_body_part_owner = None
        self.descriptor_verb = None
        self.connected_body_part = None
        self.connected_body_part_owner = None
    
    def set_active(self, actor, target, target_body_part, actor_verb_present_continuous, target_verb_passive_present_continuous):
        self.is_active = True
        self.decriptor_verb = actor_verb_present_continuous
        self.connected_body_part_owner = target
        self.connected_body_part = target_body_part
        target.is_active = True
        target.connected_body_part = self
        target.connected_body_part_owner = actor
        target.decriptor_verb = target_verb_passive_present_continuous

