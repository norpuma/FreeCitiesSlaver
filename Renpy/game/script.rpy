# The script of the game goes in this file.

# The game starts here.

label Game__Initialize:
    call System__Initialize
    return

label System__Initialize:
    call _PowerPlayFramework__Initialize_First_Pass
    $ use_status_screen_menus = True
    $ should_load_default_names = True
    call System__Initialize__Calendar
    call System__Colors__Initialize
    call _PowerPlayFramework__Initialize_Second_Pass
    $ renpy.call(game.registered_initialization)
    return

label System__Initialize__Calendar:
    $ time_control.time_control = time_control.Time_Control().build(2020)
    return

label System__Colors__Initialize:
    $ unimportant_text_color = "#555555"
    $ important_text_color = "#FFFFFF"
    $ first_time_text_color = "#009900"
    $ prompt_color = "#AA5555"
    return

label start:
    $ side_bar_config = Side_Bar_Config(renpy.get_physical_size())
    call Game__Initialize
    $ renpy.block_rollback()
    $ game_prefix = "TOWN_TESTER"
    $ renpy.call(game_prefix + "__Initialization")
    if game.registered_presentation != None:
        $ renpy.call(game.registered_presentation) # What is the game about?
    # $ renpy.call(game_prefix + "Game__Setup__Choices") # What decisions the player needs to make before starting the game? This is often using to set traits for the protagonist.
    if game.registered_introdcution is not None and game.registered_introdcution != "":
        menu:
            "Play the Introduction":
                $ renpy.jump(game.registered_introdcution) # Non-playable first scenes to the game
            "Skip the Introduction":
                $ renpy.jump(game.registered_game_start)
    else:
        $ renpy.jump(game.registered_game_start)
    jump Game__Main_Loop__Prompt
    return

label Game__Main_Loop:
    python:
      def update_local_actions(last_updated_location, protagonist):
          if protagonist.current_location == last_updated_location:
              return False
          return
    $ update_local_actions(last_updated_location, protagonist)
    $ protagonist.current_location = last_updated_location
    $ interactable_characters = []
    #$ interactable_characters.append(Character.generate_random(ENUM__GENDER__FEMALE))
    # TODO: add people at location to interactable_characters
    # $ interactable_characters.extend(current_location.people)
    # $ people_list.extend(mc.location.people)
    # $ people_list.sort(key = sort_display_list, reverse = True)
    # Adding the header. The first element of the list is used as a header line.
    # $ people_list.insert(0,"Talk to Someone")

    $ possible_actions = []
    # TODO: add actions possible at location to possible_actions
    # $ possible_actions.extend(current_location.actions)
    # TODO: Add "always possible" actions to possible_actions
    # $ actions_list.append(["Check your phone.", "Phone"])
    # $ actions_list.insert(0,["Go somewhere else.", "Travel"])
    # $ actions_list.extend(mc.location.get_valid_actions())
    # $ actions_list.sort(key = sort_display_list, reverse = True)
    # Adding the header. The first element of the list is used as a header line.
    # $ actions_list.insert(0,"Do Something")

    # Go home to sleep and wait actions
    # if time_of_day == 4:
    #     if sleep_action not in mc.location.actions: #If they're in a location they can sleep we shouldn't show this because they can just sleep here.
    #         $ actions_list.insert(0, ["Go home and sleep.{image=gui/heart/Time_Advance.png}{image=gui/heart/Time_Advance.png} (tooltip)It's late. Go home and sleep.", "Wait"])
    # else:
    #     $ actions_list.insert(0, ["Wait here\n{image=gui/heart/Time_Advance.png}, +10 Extra {image=gui/extra_images/energy_token.png} (tooltip)Kill some time and wait around. Recovers more energy than working.", "Wait"])

    call screen main_choice_display([people_list,actions_list])
    $ picked_option = _return
    # TODO: Handle picked optio. This will be either someone to start an interaction, some action or going to some location.
    return
