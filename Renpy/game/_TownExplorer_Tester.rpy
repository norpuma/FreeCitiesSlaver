init 150 python:
    import random

label TownExplorer_Tester_Loop:
    call TownExplorer_Location_Actions_Selector
    jump TownExplorer_Tester_Loop

label TownExplorer_Location_Actions_Selector:
    if current_location.visit_callable != "":
        $ renpy.call(current_location.visit_callable)
    $ entries = []
    if current_location.destinations != []:
        $ entries.append(("Go somewhere else...", "MOVE"))
    if current_location.characters != []:
        $ entries.append(("Interact with someone...", "INTERACTION"))
    $ entries.append(("Go home.", "HOME"))
    call screen sidebar_choice(entries, prompt = "What do you want to do?")
    $ selection = _return
    if selection == "MOVE":
        jump TownExplorer_Location_Selector
    elif selection == "INTERACTION":
        jump TownExplorer_Character_Selector
    else: # selection == "HOME"
        $ current_location = locations.locations_by_id["TOWN"]
        jump TownExplorer_Tester_Loop
    jump TownExplorer_Tester_Loop

label TownExplorer_Location_Selector:
    if current_location.destinations != []:
        $ entries = locations__build_menu_entries_from_destinations(current_location.destinations)
        $ entries.append(("Nevermind.", "CANCEL"))
        call screen sidebar_choice(entries, prompt = "Where do you want to go?")
        $ selection = _return
        if selection != "CANCEL":
            $ current_location = selection
        else:
            jump TownExplorer_Location_Actions_Selector
    return

label TownExplorer_Character_Selector:
    if current_location.characters == []:
        return
    "{color=#ff7f50}With whom do you want to interact?{/color}"
    python:
        entries = []
        for char in current_location.characters:
            if char.id != protagonist.id:
                entries.append(("{0} {1}".format(char.names.standard, char.names.last), char))
    call screen sidebar_choice(entries, prompt = "With whom do you want to interact?")
    $ selection = _return
    call TownExplorer_Character_Interaction_Selector(selection)
    return

label TownExplorer_Character_Interaction_Selector(selected_character = None):
    $ target = selected_character
    $ start_interaction(protagonist, target)
    if selected_character is not None:
        $ target = selected_character
    $ actor = protagonist
    $ entries = build_player_interactions_with_characters_list(protagonist, target)
    call screen sidebar_choice(entries, prompt = "How do you want to interact with '{0} {1}'?".format(target.names.standard, target.names.last))
    $ selection = _return
    if selection == "DONE":
        $ end_interaction()
        jump TownExplorer_Location_Actions_Selector
    $ renpy.call(selection)
    call TownExplorer_Character_Interaction_Selector(selected_character)
