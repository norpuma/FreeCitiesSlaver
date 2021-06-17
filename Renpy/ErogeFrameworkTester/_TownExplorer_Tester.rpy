init 150 python:
    import PowerPlayFramework.Systems.Time_ControlPy as time_control

label TownExplorer_Tester_Start:
    call Initialize__Protagonist
    $ time_control.time_control = time_control.Time_Control().build(2020)
    $ pov = protagonist
    $ current_location = pov.location
    jump TownExplorer_Tester_Loop

label TownExplorer_Tester_Loop:
    call TownExplorer_Location_Actions_Selector
    jump TownExplorer_Tester_Loop

label TownExplorer_Location_Actions_Selector:
    if current_location.visit_callable != "":
        $ renpy.call(current_location.visit_callable)
    "{color=#ff7f50}What do you want to do?{/color}"
    $ entries = []
    if current_location.destinations != []:
        $ entries.append(("Go somewhere else...", "MOVE"))
    if current_location.characters != []:
        $ entries.append(("Interact with someone...", "INTERACTION"))
    $ entries.append(("Go home.", "HOME"))
    $ selection = renpy.display_menu(entries)
    if selection == "MOVE":
        jump TownExplorer_Location_Selector
    elif selection == "INTERACTION":
        jump TownExplorer_Character_Selector
    else: # selection == "HOME"
        $ current_location = town
        jump TownExplorer_Tester_Loop
    jump TownExplorer_Tester_Loop

label TownExplorer_Location_Selector:
    "{color=#ff7f50}Where do you want to go?{/color}"
    if current_location.destinations != []:
        $ entries = locations__build_menu_entries_from_destinations(current_location.destinations)
        $ selection = renpy.display_menu(entries)
        $ current_location = selection
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
    $ selection = renpy.display_menu(entries)
    $ target = selection
    jump TownExplorer_Character_Interaction_Selector
    return

label TownExplorer_Character_Interaction_Selector:
    $ msg = "How do you want to interact with '{0} {1}'?".format(target.names.standard, target.names.last)
    "{color=#ff7f50}[msg]{/color}"
    $ entries = build_player_interactions_with_characters_list()
    $ selection = renpy.display_menu(entries)
    if selection == "DONE":
        jump TownExplorer_Location_Actions_Selector
    $ start_interaction(protagonist, target)
    $ renpy.call(selection)
    jump TownExplorer_Character_Interaction_Selector
