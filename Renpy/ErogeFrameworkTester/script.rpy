# The script of the game goes in this file.

# The game starts here.

label Game__Initialize:
    call System__Initialize
    call Characters__Initialize
    return

label System__Initialize:
    call System__Colors__Initialize
    return

label System__Colors__Initialize:
    $unimportant_text_color = "#555555"
    $important_text_color = "#FFFFFF"
    $first_time_text_color = "#009900"
    $prompt_color = "#AA5555"
    return

label Characters__Initialize:
    $protagonist = renpy.store.object()
    $protagonist.occupation = "MANAGER"
    $co_star = renpy.store.object()
    $co_star.occupation = "MANAGER"
    $erika = renpy.store.object()
    $erika.occupation = "MANAGER"
    return

python:
    TIME_06__EARLY_MORNING = "TIME_06__EARLY_MORNING"
    TIME_09__LATE_MORNING = "TIME_09__LATE_MORNING"
    TIME_12__EARLY_AFTERNOON = "TIME_12__EARLY_AFTERNOON"
    TIME_15__LATE_ARTERNOON = "TIME_15__LATE_ARTERNOON"
    TIME_18__EARLY_EVENING = "TIME_18__EARLY_EVENING"
    TIME_21__LATE_EVENING = "TIME_21__LATE_EVENING"
    TIME_24__EARLY_NIGHT = "TIME_24__EARLY_NIGHT"
    TIME_27__LATE_NIGHT = "TIME_27__LATE_NIGHT"

label start:
    call Game__Initialize
    # "{color=[unimportant_text_color]}unimportant_text_color{/color}\n\
    # {color=[important_text_color]}important_text_color{/color}\n\
    # {color=[first_time_text_color]}first_time_text_color{/color}\n\
    # {color=[prompt_color]}prompt_color{/color}\n\
    # undefined text color"
    $ game_prefix = "Pre_Aliens_Town_Corruption____"
    $ renpy.call(game_prefix + "Game__Presentation") # What is the game about?
    $ renpy.call(game_prefix + "Game__Setup__Choices") # What decisions the player needs to make before starting the game? This is often using to set traits for the protagonist.
    $ renpy.call(game_prefix + "Game__Introduction") # Non-playable first scenes to the game
    jump Climax_Tester_Start
    jump Game__Main_Loop__Prompt
    return

label Game__Setup__Choices:
    menu:
        "{color=[prompt_color]}What is your status?{/color}"
        "Free":
            "OK"
            $protagonist.status = "FREE"
        "Slave":
            "OK"
            $protagonist.status = "SLAVE"
            $servant = protagonist
            $protagonist.occupation = "SLAVE"
        "-- Start as a master with a slave --":
            #jump ??? ;;;
            pass
    if protagonist.status == "FREE":
        menu:
            "{color=[prompt_color]}What is her status?{/color}"
            "Free":
                "OK"
                $co_star.status = "FREE"
            "Slave":
                "OK"
                $co_star.status = "SLAVE"
                $master = protagonist
                $servant = co_star
                $co_star.occupation = "SLAVE"
    else:
        $co_star.status = "FREE"
        $master = co_star
        $servant = protagonist
    
    "Protagonist is [protagonist.status] and his co-star is [co_star.status]."
    if protagonist.status == "FREE" and co_star.status == "FREE":
        menu:
            "{color=[prompt_color]}Which of you lost their job?{/color}"
            "I did.":
                "OK"
                $master = co_star
                $servant = protagonist
                $protagonist.occupation = "UNEMPLOYED"
            "She did.":
                "OK"
                $master = protagonist
                $servant = co_star
                $co_star.occupation = "UNEMPLOYED"
            "Both of us did.":
                "OK"
                $master = erika
                $servant = protagonist
                $erikas_servant = co_star
                $protagonist.occupation = "SLAVE"
                $co_star.occupation = "SLAVE"
    elif protagonist.status == "SLAVE" and co_star.status == "SLAVE":
        $master = erika
        $servant = protagonist
        $erikas_servant = co_star
    if master == protagonist:
        "You are in control and she will have to serve you."
    elif master == co_star:
        "She is in control and you will have to serve her."
    else:
        "Erika is in control! Both you and Kelly will have to serve."
    return

label Game__Main_Loop__Prompt:
    if protagonist.occupation == "MANAGER":
        call Game__Main_Loop__Protagonist_Day_Activities_Description__Manager
    elif protagonist.occupation == "UNEMPLOYED":
        call Game__Main_Loop__Protagonist_Day_Activities_Description__Unemployed
    elif protagonist.occupation == "SLAVE":
        call Game__Main_Loop__Protagonist_Day_Activities_Description__Slave
    "{color=[prompt_color]}What will you do today?{/color}"
    return

label Game__Main_Loop__Protagonist_Day_Activities_Description__Manager:
    "You spent the whole day at work and finally come home."
    return

label Game__Main_Loop__Protagonist_Day_Activities_Description__Unemployed:
    "You have nothing much to do for the whole day. What is the ONE interesting thing you will do?"
    return

label Game__Main_Loop__Protagonist_Day_Activities_Description__Slave:
    "You spent the whole confined home. What is the ONE interesting thing you will do?"
    return


label Game__Co_Star__Current_Activity_Description:
    python:
        def Game__Co_Star__Current_Activity_Description__Builder():
            "She is lying about, relaxing."
            return
    $ renpy.say(Game__Co_Star__Current_Activity_Description__Builder())
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
