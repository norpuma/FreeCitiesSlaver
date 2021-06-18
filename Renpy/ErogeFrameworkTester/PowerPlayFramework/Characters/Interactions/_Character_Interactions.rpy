init python:
    import PowerPlayFramework.Characters.Character_FundamentalsPy as fundamentals
    import PowerPlayFramework.Characters.PersonPy as person
    from PowerPlayFramework.Characters.Status.MoodPy import Character_Mood_Modifier
    import PowerPlayFramework.Characters.Relationships._RelationshipsPy as relationships

    current_interaction = None

    class Character_Interaction_Situation(object):
        def __init__(self, initiator, target):
            self.initiator = initiator
            self.target = target
            self.greeting_happened = False

    def start_interaction(initiator, target):
        global current_interaction
        current_interaction = Character_Interaction_Situation(initiator, target)
        if initiator.id not in target.relationships.keys():
            target.relationships[initiator.id] = relationships.Characters_Relationship().build(initiator)
            initiator.relationships[target.id] = relationships.Characters_Relationship().build(target)
        last_interaction_date = target.relationships[initiator.id].history.last_overall_interaction_with_target_timestamp
        target.relationships[initiator.id].history.last_overall_interaction_with_target_timestamp = time_control.time_control.get_timestamp()
        mood_modifiers = Character_Mood_Modifier(0, 0)
        if last_interaction_date == None:
            mood_modifiers = Character_Mood_Modifier.generate_random()
        else:
            days_since_last_interaction = time_control.time_control.days_since(last_interaction_date)
            if days_since_last_interaction >= 2:
                mood_modifiers = Character_Mood_Modifier.generate_random()
            elif days_since_last_interaction > 0:
                mood_modifiers = Character_Mood_Modifier.generate_random(limited_to_small_range = True)

        target.status.mood.apply_modifiers(mood_modifiers)

    def end_interaction():
        current_interaction

    def build_player_interactions_with_characters_list(initiator, target):
        result = []
        result.append(("Inspect.", "Characters__Interactions__Inspect__Default"))
        if not current_interaction.greeting_happened:
            if target.relationships[initiator.id].familiarity <= relationships.ENUM__FAMILIARITY__STRANGER or initiator.relationships[target.id].familiarity <= relationships.ENUM__FAMILIARITY__STRANGER:
                result.append(("Polite introduction.", "Characters__Interactions__Introductions__Polite"))
                # TODO: Create a "Boastful introduction."
                # TODO: Create a "Smooth introduction."
            else:
                result.append(("Greet.", "Characters__Interactions__Friendly__Greet"))
        else:
            # TODO: Decide from target attributes if they can have this kind of interactions.
            result.append(("Friendly interactions...", "Characters__Interactions__Friendly"))
            result.append(("Flirtatious interactions...", "Characters__Interactions__Flirtatious"))
            result.append(("Power interactions...", "Characters__Interactions__Power"))
            result.append(("Sensual interactions...", "Characters__Interactions__Sensual"))

        result.append(("End interaction.", "DONE"))
        return result

label Characters__Interactions__Inspect__Default:
    # TODO: Obtain a description from target.body
    # TODO: Obtain a description from the target's clothes.
    $ gender_text = "woman"
    if target.gender == fundamentals.Gender.FEMALE:
        $ gender_text = "woman"
    else:
        $ gender_text = "man"
    $ msg = "You are looking at '{0} {1}', a {2} years old {3}.".format(target.names.standard, target.names.last, target.age, gender_text)
    "[msg]"
    "Mood: Happy [target.status.mood.happiness]; Calm [target.status.mood.calm]."
    return

