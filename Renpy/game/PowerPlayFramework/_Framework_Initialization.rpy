init -10000 python:
    import json
    game = object()
    modules_names = []
    _PowerPlayFramework__locations_initialization_first_pass_labels = []
    _PowerPlayFramework__locations_initialization_second_pass_labels = []
    _PowerPlayFramework__characters_initialization_first_pass_labels = []
    _PowerPlayFramework__characters_initialization_second_pass_labels = []
    _PowerPlayFramework__events_initialization_first_pass_labels = []
    _PowerPlayFramework__events_initialization_second_pass_labels = []

    _PowerPlayFramework__default_names_file_with_path = """game\PowerPlayFramework\Characters\Names.jsonc"""

    def _PowerPlayFramework__read_file_to_json(json_file_path_and_name):
        with open(json_file_path_and_name) as json_file:
            json_object = json.load(json_file)
            json_file.close()
            return json_object

init -1 python:
    import PowerPlayFramework.Systems.Time_ControlPy as time_control
    import PowerPlayFramework.Characters.Character_NamesPy as names_system
    import PowerPlayFramework.Characters.CharactersPy as characters

label _PowerPlayFramework__Initialize_First_Pass:
    ########### THESE ARE variables a user of the framework can freely redefine in the start label for their game #####################
    $ use_status_screen_menus = True
    $ should_load_default_names = True
    ########### ************************************************************************************************* #####################
    $ time_control.time_control = time_control.Time_Control().build(2020)
    $ game.registered_presentation = None
    $ game.registered_introdcution = "_Core_Introduction"
    $ game.registered_game_start = "_Core_Game_Start"
    $ game.registered_initialization = "_Core_Initialization"
    return

label _PowerPlayFramework__Call_List_of_Callables(list_of_callable_labels):
    $ loop_index = 0
    while loop_index < len (list_of_callable_labels):
        $ item = list_of_callable_labels[loop_index]
        $ loop_index += 1
        $ renpy.call(item)
    return

label _PowerPlayFramework__Initialize_Second_Pass:
    $ renpy.call(game.registered_initialization)
    if should_load_default_names:
        $ json_object = _PowerPlayFramework__read_file_to_json(_PowerPlayFramework__default_names_file_with_path)
        $ names_system.initialize_names(json_object)
    call _PowerPlayFramework__Call_List_of_Callables(_PowerPlayFramework__locations_initialization_first_pass_labels)
    call _PowerPlayFramework__Call_List_of_Callables(_PowerPlayFramework__characters_initialization_first_pass_labels)
    call _PowerPlayFramework__Call_List_of_Callables(_PowerPlayFramework__events_initialization_first_pass_labels)
    call _PowerPlayFramework__Call_List_of_Callables(_PowerPlayFramework__locations_initialization_second_pass_labels)
    call _PowerPlayFramework__Call_List_of_Callables(_PowerPlayFramework__characters_initialization_second_pass_labels)
    call _PowerPlayFramework__Call_List_of_Callables(_PowerPlayFramework__events_initialization_second_pass_labels)
    return
