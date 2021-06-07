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

class Sexual_Action():
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

sexual_actions_menu_entries = build_sexual_actions_menu(sexual_actions)
