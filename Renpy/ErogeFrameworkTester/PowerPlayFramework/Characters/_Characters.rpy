init python:
    import PowerPlayFramework.Characters.Character_FundamentalsPy as fundamentals
    import PowerPlayFramework.Characters.PersonPy as person

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

label Characters__Interactions__Friendly:
    $ msg = "What kind of friendly interaction do you want to take with '{0} {1}'?".format(target.names.standard, target.names.last)
    "{color=#ff7f50}[msg]{/color}"
    python:
        entries = []
        entries.append(("Greet.", "GREET"))
        entries.append(("Chat.", "CHAT"))
        entries.append(("Compliment.", "COMPLIMENT"))
        entries.append(("Ask about mood.", "ASK_MOOD"))
        entries.append(("End friendly interactions.", "DONE"))
    $ selection = renpy.display_menu(entries)
    if selection == "GREET":
        $ renpy.call("Characters__Interactions__Friendly__Greet")
        call Characters__Interactions__Friendly
    elif selection == "CHAT":
        $ renpy.call("Characters__Interactions__Friendly__Chat")
        call Characters__Interactions__Friendly
    elif selection == "COMPLIMENT":
        $ renpy.call("Characters__Interactions__Friendly__Compliment")
        call Characters__Interactions__Friendly
    elif selection == "ASK_MOOD":
        $ renpy.call("Characters__Interactions__Friendly__Ask_Mood")
        call Characters__Interactions__Friendly
    return

label Characters__Interactions__Friendly__Greet:
    $ action_description = "You offer {0} a friendly greeting.".format(target.names.standard)
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} greets you back.".format(target.pronouns["subject"].capitalize())
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Friendly__Chat:
    $ action_description = "You chat with {0} for a little while.".format(target.names.standard)
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} enjoys the conversation.".format(target.pronouns["subject"].capitalize())
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Friendly__Compliment:
    $ action_description = "You offer {0} a compliment.".format(target.names.standard)
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} smiles in appreciation of your kind words.".format(target.pronouns["subject"].capitalize())
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Friendly__Ask_Mood:
    $ action_description = "You ask {0} how {1} is feeling.".format(target.names.standard, target.pronouns["subject"])
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} tells you {1} is feeling okay.".format(target.pronouns["subject"].capitalize(), target.pronouns["subject"])
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Flirtatious:
    $ msg = "What kind of flirtatious interaction do you want to take with '{0} {1}'?".format(target.names.standard, target.names.last)
    "{color=#ff7f50}[msg]{/color}"
    python:
        entries = []
        entries.append(("Compliment.", "COMPLIMENT"))
        entries.append(("End flirtatious interactions.", "DONE"))
    $ selection = renpy.display_menu(entries)
    if selection == "COMPLIMENT":
        $ renpy.call("Characters__Interactions__Flirtatious__Compliment")
        call Characters__Interactions__Flirtatious
    return

label Characters__Interactions__Flirtatious__Compliment:
    $ action_description = "You tell {0} how hot {1} is.".format(target.names.standard, target.pronouns["subject"])
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} blushes a little at your compliment.".format(target.pronouns["subject"].capitalize())
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Power:
    $ msg = "What kind of power interaction do you want to take with '{0} {1}'?".format(target.names.standard, target.names.last)
    "{color=#ff7f50}[msg]{/color}"
    python:
        entries = []
        entries.append(("Tell {0} what {1} should do...".format(target.pronouns["object"], target.pronouns["subject"]), "COMMAND"))
        entries.append(("Ask {0} what {1} wants you to do...".format(target.pronouns["object"], target.pronouns["subject"]), "OBEY"))
        entries.append(("End power interactions.", "DONE"))
    $ selection = renpy.display_menu(entries)
    if selection == "COMMAND":
        $ renpy.call("Characters__Interactions__Power__Command")
        call Characters__Interactions__Power
    elif selection == "OBEY":
        $ renpy.call("Characters__Interactions__Power__Obey")
        call Characters__Interactions__Power
    return

label Characters__Interactions__Power__Command:
    $ msg = "What do you command '{0} {1}' to do?".format(target.names.standard, target.names.last)
    "{color=#ff7f50}[msg]{/color}"
    python:
        entries = []
        entries.append(("Tell {0} to be more agreeable.".format(target.pronouns["object"]), "AGREEABLE"))
        entries.append(("End power interactions.", "DONE"))
    $ selection = renpy.display_menu(entries)
    if selection == "AGREEABLE":
        $ renpy.call("Characters__Interactions__Power__Command__Agreeable")
        call Characters__Interactions__Power
    return

label Characters__Interactions__Power__Command__Agreeable:
    $ action_description = "You tell {0} to be more agreeable from now on.".format(target.pronouns["subject"])
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} tells you {1} will do no such thing.".format(target.pronouns["subject"].capitalize(), target.pronouns["subject"])
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Power__Obey:
    $ action_description = "You ask {0} what you can do for {1}.".format(target.names.standard, target.pronouns["object"])
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} tells you {1} doesn't need anything at this time.".format(target.pronouns["subject"].capitalize(), target.pronouns["subject"])
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Sensual:
    $ msg = "What kind of sensual interaction do you want to take with '{0} {1}'?".format(target.names.standard, target.names.last)
    "{color=#ff7f50}[msg]{/color}"
    python:
        entries = []
        entries.append(("Kiss.", "KISS"))
        entries.append(("End sensual interactions.", "DONE"))
    $ selection = renpy.display_menu(entries)
    if selection == "KISS":
        $ renpy.call("Characters__Interactions__Sensual__Kiss")
        call Characters__Interactions__Sensual
    return

label Characters__Interactions__Sensual__Kiss:
    $ action_description = "You lean in to kiss {}.".format(target.names.standard)
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} pulls back to avoid your kiss. {0} doesn't seem to see you that way.".format(target.pronouns["subject"].capitalize())
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

