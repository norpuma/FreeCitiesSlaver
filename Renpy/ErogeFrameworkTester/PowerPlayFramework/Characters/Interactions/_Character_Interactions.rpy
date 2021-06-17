init python:
    import PowerPlayFramework.Characters.Character_FundamentalsPy as fundamentals
    import PowerPlayFramework.Characters.PersonPy as person

    def start_interaction(initiator, target):
        target.relationships[initiator.id].history.last_overall_interaction_with_target_timestamp = time_control.time_control.get_timestamp()

    def build_player_interactions_with_characters_list():
        result = []
        result.append(("Inspect.", "Characters__Interactions__Inspect__Default"))
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
    return

