label Characters__Interactions__Power:
    python:
        entries = []
        entries.append(("Tell {0} what {1} should do...".format(target.pronouns["object"], target.pronouns["subject"]), "COMMAND"))
        entries.append(("Ask {0} what {1} wants you to do...".format(target.pronouns["object"], target.pronouns["subject"]), "OBEY"))
        entries.append(("End power interactions.", "DONE"))
    $ prompt_msg = "What kind of power interaction do you want to take with '{0} {1}'?".format(target.names.standard, target.names.last)
    if use_status_screen_menus:
        call screen sidebar_choice(entries, prompt = prompt_msg)
        $ selection = _return
    else:
        "{color=#ff7f50}[prompt_msg]{/color}"
        $ selection = renpy.display_menu(entries)
    if selection == "COMMAND":
        $ renpy.call("Characters__Interactions__Power__Command")
        call Characters__Interactions__Power
    elif selection == "OBEY":
        $ renpy.call("Characters__Interactions__Power__Obey")
        call Characters__Interactions__Power
    return

label Characters__Interactions__Power__Command:
    python:
        entries = []
        entries.append(("Tell {0} to be more agreeable.".format(target.pronouns["object"]), "AGREEABLE"))
        entries.append(("End power interactions.", "DONE"))
    $ prompt_msg = "What do you command '{0} {1}' to do?".format(target.names.standard, target.names.last)
    if use_status_screen_menus:
        call screen sidebar_choice(entries, prompt = prompt_msg)
        $ selection = _return
    else:
        "{color=#ff7f50}[prompt_msg]{/color}"
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

