label PersonInteractions_Tester_Start:
    $ pov = pi.POV_Character()
    jump PersonInteractions_Tester_Loop

label PersonInteractions_Tester_Loop:
    call PersonInteractions_Location_Selector
    if pov.location != None:
        $ current_location = pov.location
    else:
        $ current_location = town
    if current_location.visit_callable != "":
        $ renpy.call(current_location.visit_callable)
    jump PersonInteractions_Tester_Loop

label PersonInteractions_Location_Selector:
    "{color=#ff7f50}Where do you want to go?{/color}"
    if pov.location != None:
        $ current_location = pov.location
    else:
        $ current_location = town
    if current_location.destinations != []:
        $ entries = locations__build_menu_entries_from_destinations(current_location.destinations)
        $ selection = renpy.display_menu(entries)
        $ pov.location = selection
    return

