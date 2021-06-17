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
