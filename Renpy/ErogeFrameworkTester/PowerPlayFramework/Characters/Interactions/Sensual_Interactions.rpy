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

