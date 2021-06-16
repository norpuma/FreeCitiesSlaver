import random

class Sex_Participant(object):
    def __init__(self, climax_reactions_dict, sexual_stimulus_reactions_dict):
        self.aroused = 0
        self.stimulated = 0
        self.stimulated_threshold = 5
        self.upset = 0
        self.upset_threshold = 5
        self.sexual_energy = 5
        self.climax_reactions_dict = climax_reactions_dict
        self.sexual_stimulus_reactions_dict = sexual_stimulus_reactions_dict

    def adjust_stats_for_action(self, action, is_actor = True):
        if is_actor:
            self.stimulated += action.actor_stimulus
            self.sexual_energy -= action.actor_energy_cost
            self.upset += action.actor_upset_modifier
        else:
            self.stimulated += action.target_stimulus
            self.sexual_energy -= action.target_energy_cost
            self.upset += action.target_upset_modifier

    def get_reaction_to_sexual_stimulus(self):
        if self.climax_reactions_dict == None:
            raise "ERROR: Sex_Participant.get_reaction_to_sexual_stimulus: self.climax_reactions_dict is undefined."

        if self.stimulated > self.stimulated_threshold:
            options = self.climax_reactions_dict
            self.stimulated = self.stimulated_threshold -3
        else:
            options = self.get_non_climax_reaction_to_sexual_stimulus()

        return random.choice(options)

    def get_non_climax_reaction_to_sexual_stimulus(self):
        if self.sexual_stimulus_reactions_dict == None:
            raise "ERROR: Sex_Participant.get_reaction_to_sexual_stimulus: self.sexual_stimulus_reactions_dict is undefined."

        max_level_reached = 0
        for key in self.sexual_stimulus_reactions_dict.keys():
            if self.stimulated > key:
                max_level_reached = key
            else:
                break
        return self.sexual_stimulus_reactions_dict[max_level_reached]

class Boy_Simple_Simulation(Sex_Participant):
    def __init__(self):
        super(Boy_Simple_Simulation, self).__init__(male_climax_reactions, male_sexual_stimulus_reactions_by_stimulated)

class Girl_Simple_Simulation(Sex_Participant):
    def __init__(self):
        super(Girl_Simple_Simulation, self).__init__(female_climax_reactions, female_sexual_stimulus_reactions_by_stimulated)

female_sexual_stimulus_reactions_by_stimulated = {
    0: [
        "She sighs.",
        "She lets out a long breath.",
        "She looks into your eyes, expectantly.",
        "She encourages you to start."
    ],
    1: [
        "She moans, softly.",
        "She lets out a small gasp.",
        "Her breath quickens, slightly.",
        "'Hmm... you can go faster, you know?'"
    ],
    2: [
        "She lets out a long moan.",
        "She gasps in pleasure.",
        "She bites her lip in excitement."
    ],
    3: [
        "Her breath quickens.",
        "She lets out a small cry of pleasure.",
        "She lets out a soft expletive: 'Ah, fuck!'."
    ],
    4: [
        "She moans at a quick pace.",
        "She gasps and then she swears.",
        "She lets out a joyful expletive: 'Fuck! Yeah!'.",
        "She tells you not to stop."
    ],
}

female_climax_reactions = ["She cries in pleasure as she reaches a climax!"]

male_sexual_stimulus_reactions_by_stimulated = {
    0: ["You are anxious for more."],
    1: [
        "You enjoy the nice sensation.",
        "You feel a smile creeping on as you enjoy the stimulus.",
        "You sigh in contentment at the stimulus."
    ],
    3: [
        "You feel a tightness in your balls.",
        "You feel the pressure building up.",
        "You gasp in pleasure as you feel the stimulus growing.",
        "You grunt as you feel the tension becoming hard to hold back."
    ]
}

male_climax_reactions = ["You let out a loud cry of pleasure as you empty yourself."]

sexual_actions = {
    "Makeout": {
        "actor_stimulus": 2,
        "target_stimulus": 0.5,
        "actor_energy_cost": 0.5,
        "target_energy_cost": 1
    },
    "Handjob": {
        "actor_stimulus": 2,
        "target_stimulus": 0.5,
        "actor_energy_cost": 0.5,
        "target_energy_cost": 1
    },
    "Titjob": {
        "actor_stimulus": 2,
        "target_stimulus": 0.5,
        "actor_energy_cost": 0.5,
        "target_energy_cost": 1
    },
    "Fellatio, Relaxed": {
        "actor_stimulus": 2,
        "target_stimulus": 0.5,
        "actor_energy_cost": 0.5,
        "target_energy_cost": 1
    },
    "Fellatio, Deepthroat": {
        "actor_stimulus": 2,
        "target_stimulus": 0.5,
        "actor_energy_cost": 0.5,
        "target_energy_cost": 1
    },
    "Fellatio, Skullfuck": {
        "actor_stimulus": 2,
        "target_stimulus": 0.5,
        "actor_energy_cost": 0.5,
        "target_energy_cost": 1
    },
    "Cunnilingus": {
        "actor_stimulus": 0.5,
        "target_stimulus": 2,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Missionary, Slow Thrust": {
        "actor_stimulus": 1,
        "target_stimulus": 1,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Missionary, Fast Thrust": {
        "actor_stimulus": 2,
        "target_stimulus": 2,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Standing, Slow Thrust": {
        "actor_stimulus": 1,
        "target_stimulus": 1,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Standing, Fast Thrust": {
        "actor_stimulus": 2,
        "target_stimulus": 2,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Doggy, Slow Thrust": {
        "actor_stimulus": 1,
        "target_stimulus": 1,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Doggy, Fast Thrust": {
        "actor_stimulus": 2,
        "target_stimulus": 2,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Cowgirl, Slow Thrust": {
        "actor_stimulus": 1,
        "target_stimulus": 1,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    },
    "Cowgirl, Fast Thrust": {
        "actor_stimulus": 2,
        "target_stimulus": 2,
        "actor_energy_cost": 1,
        "target_energy_cost": 0.5
    }
}

def build_sexual_actions_menu(sexual_actions_dict):
    result = []
    for key in sexual_actions_dict.keys():
        result.append((key, Sexual_Action.build_from_json(sexual_actions_dict[key])))
    return result

# class Sexual_Preferences(object):
#     def __init__(self):
#         self.

class Sexual_Action_Impact(object):
    def __init__(self):
        self.arousal = 0
        self.physical_stimulus = 0
        self.psychological_stimulus = 0
        self.energy_cost = 0
        self.upset_modifier = 0

class Sexual_Action(object):
    def __init__(self):
        self.actor_stimulus = 0
        self.target_stimulus = 0
        self.actor_energy_cost = 0
        self.target_energy_cost = 0
        self.actor_upset_modifier = 0
        self.target_upset_modifier = 0

    @classmethod
    def build_from_json(cls, json):
        result = cls()
        json_keys = json.keys()
        for attr in result.__dict__.keys():
            if attr in json_keys:
                result.__dict__[attr] = json[attr]
        return result

class Sexual_Action_Advanced(object):
    def __init__(self):
        self.verb_id = ""
        self.actor_verb = ""
        self.is_continuous = False
        self.actor_verb_present_continuous = ""
        self.target_verb_passive_present_continuous = ""
        self.actor_used_body_part_id = ""
        self.target_used_body_part_id = ""
        self.action_modifier = ""
        self.actor_stimulus = 0
        self.target_stimulus = 0
        self.actor_energy_cost = 0
        self.target_energy_cost = 0
        self.actor_upset_modifier = 0
        self.target_upset_modifier = 0
        self.requirements = []
        self.effects = []

    def _build(self, actor_used_body_part_id, target_used_body_part_id, verb_id, actor_verb, is_continuous, actor_verb_present_continuous, target_verb_passive_present_continuous):
        self.verb_id = verb_id
        self.actor_verb = actor_verb
        self.is_continuous = is_continuous
        if is_continuous:
            if actor_verb_present_continuous != "":
                self.actor_verb_present_continuous = actor_verb_present_continuous
            else:
                self.actor_verb_present_continuous = actor_verb + "ing"
            if target_verb_passive_present_continuous != "":
                self.target_verb_passive_present_continuous = target_verb_passive_present_continuous
            else:
                self.target_verb_passive_present_continuous = "is being " + actor_verb + "ed"
        self.actor_used_body_part_id = actor_used_body_part_id
        self.target_used_body_part_id = target_used_body_part_id
        if self.actor_used_body_part_id != None and self.actor_used_body_part_id != "":
            self.requirements.append("actor.body_parts.get('{self.actor_used_body_part_id}').is_active == False")
        if self.target_used_body_part_id != None and self.acttarget_used_body_part_idor_used_body_part_id != "":
            self.requirements.append("target.body_parts.get('{self.target_used_body_part_id}').is_active == False")

    @classmethod
    def build_from_json(cls, json):
        result = cls()
        json_keys = json.keys()
        actor_used_body_part_id = None
        target_used_body_part_id = None
        verb_id = None
        actor_verb = None
        is_continuous = False
        actor_verb_present_continuous = ""
        target_verb_passive_present_continuous = ""
        for attr in result.__dict__.keys():
            if attr == "actor_used_body_part_id":
                actor_used_body_part_id = json[attr]
            elif attr == "target_used_body_part_id":
                target_used_body_part_id = json[attr]
            elif attr == "verb_id":
                verb_id = json[attr]
            elif attr == "actor_verb":
                actor_verb = json[attr]
            elif attr == "is_continuous":
                is_continuous = json[attr]
            elif attr == "actor_verb_present_continuous":
                actor_verb_present_continuous = json[attr]
            elif attr == "target_verb_passive_present_continuous":
                target_verb_passive_present_continuous = json[attr]
            elif attr in json_keys:
                result.__dict__[attr] = json[attr]
        if actor_used_body_part_id == None or target_used_body_part_id == None or verb_id == None or actor_verb == None:
            raise "ERROR: Sexual_Action_Advanced.build_from_json(): Required attributes not found: actor_used_body_part_id == '{actor_used_body_part_id}', target_used_body_part_id == '{target_used_body_part_id}', verb_id = '{verb_id}', action_verb == '{actor_verb}'."
        
        result._build(actor_used_body_part_id, target_used_body_part_id, verb_id, actor_verb, is_continuous, actor_verb_present_continuous, target_verb_passive_present_continuous)

        return result

    def is_possible(self):
        for requirement in self.requirements:
            if not eval(requirement):
                return False
        
        return True

    def execute(self, actor, target):
        if self.is_continuous:
            actor.body_parts.get(self.actor_used_body_part_id).set_active(actor, target, target_body_part = self.target_used_body_part_id, actor_verb_present_continuous = self.actor_verb_present_continuous, target_verb_passive_present_continuous = self.target_verb_passive_present_continuous)
        actor.adjust_stats_for_action(self, is_actor = True)
        target.adjust_stats_for_action(self, is_actor = False)
        for effect in self.effects:
            exec(effect)

sexual_actions_menu_entries = build_sexual_actions_menu(sexual_actions)

sensual_activities = {
    "Makeout": {
        "preferred_female_arousal_before_starting": 0,
        "preferred_male_arousal_before_starting": 0,
        "actions": {
            "Make out softly": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0,
                "target_stimulus": 0,
                "actor_energy_cost": 0.5,
                "target_energy_cost": 0.5
            },
            "Make out intensely": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0.5,
                "target_stimulus": 0.5,
                "actor_energy_cost": 1,
                "target_energy_cost": 0.5
            }
        }
    },
    "Rubbing": {
        "preferred_female_arousal_before_starting": 0,
        "preferred_male_arousal_before_starting": 0,
        "actions": {
            "Hand on cock": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0,
                "target_stimulus": 0,
                "actor_energy_cost": 0.5,
                "target_energy_cost": 0.5
            },
            "Finger in pussy": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0.5,
                "target_stimulus": 0.5,
                "actor_energy_cost": 1,
                "target_energy_cost": 0.5
            }
        }
    },
    "Oral": {
        "preferred_female_arousal_before_starting": 0,
        "preferred_male_arousal_before_starting": 0,
        "actions": {
            "Blowjob": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0,
                "target_stimulus": 0,
                "actor_energy_cost": 0.5,
                "target_energy_cost": 0.5
            },
            "Pussy eating": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0.5,
                "target_stimulus": 0.5,
                "actor_energy_cost": 1,
                "target_energy_cost": 0.5
            }
        }
    },
    "Penetration": {
        "preferred_female_arousal_before_starting": 0,
        "preferred_male_arousal_before_starting": 0,
        "actions": {
            "Slow thrusts": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0,
                "target_stimulus": 0,
                "actor_energy_cost": 0.5,
                "target_energy_cost": 0.5
            },
            "Hard thrusts": {
                "actor_arousal": 0.5,
                "target_arousal": 0.5,
                "actor_stimulus": 0.5,
                "target_stimulus": 0.5,
                "actor_energy_cost": 1,
                "target_energy_cost": 0.5
            }
        }
    }
}

sex_positions = {
    "male positions": [
        "standing",
        "kneeling",
        "all-fours",
        "lying on back",
        "lying on front"
    ],
    "female positions": [
        "standing",
        "kneeling",
        "all-fours",
        "lying on back",
        "lying on front"
    ]
}

sex_actions_by_target_body_part = {} # Import from file "Sex_Actions_by_Body_Part.jsonc"

def get_or_build_sexual_actions_menu_entries():
    result = []
    for key in sensual_activities.keys():
        result.append((key, key))
    return result
