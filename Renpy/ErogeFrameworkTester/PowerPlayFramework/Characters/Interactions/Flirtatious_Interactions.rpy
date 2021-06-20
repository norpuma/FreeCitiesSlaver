label Characters__Interactions__Flirtatious:
    python:
        entries = []
        entries.append(("Compliment.", "COMPLIMENT"))
        entries.append(("End flirtatious interactions.", "DONE"))
    $ prompt_msg = "What kind of flirtatious interaction do you want to take with '{0} {1}'?".format(target.names.standard, target.names.last)
    if use_status_screen_menus:
        call screen sidebar_choice(entries, prompt = prompt_msg)
        $ selection = _return
    else:
        "{color=#ff7f50}[prompt_msg]{/color}"
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

