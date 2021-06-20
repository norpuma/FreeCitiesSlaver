label _Core_Initialization:
    return

label _Core_Introduction:
    "This is a game powered by the PowerPlay Framework, running on top of Ren'Py!"
    $ renpy.jump(game.registered_game_start)
    return

label _Core_Game_Start:
    $ side_bar_config.show_side_bar()
    $ pov = protagonist
    $ current_location = pov.location
    jump TownExplorer_Tester_Loop
    return
