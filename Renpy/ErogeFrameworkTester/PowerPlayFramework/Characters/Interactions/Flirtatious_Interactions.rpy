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

