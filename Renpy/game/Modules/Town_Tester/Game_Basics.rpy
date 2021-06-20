label TOWN_TESTER__Initialization:
    $ game.registered_presentation = None
    $ game.registered_game_start = "TOWN_TESTER__Game_Start"
    $ game.character_location_for_undefined_activity = "TOWN_TESTER__TOWN"
    return

label TOWN_TESTER__Introduction:
    "This is a game powered by the PowerPlay Framework, running on top of Ren'Py!"
    $ renpy.jump(game.registered_game_start)
    return

label TOWN_TESTER__Game_Start:
    $ side_bar_config.show_side_bar()
    $ pov = protagonist
    $ current_location = pov.location
    jump TownExplorer_Tester_Loop
    return
