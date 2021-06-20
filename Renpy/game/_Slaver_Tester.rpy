init python:
    import _Slaver_TesterPy as sla

label Slaver_Tester_Start:
    python:
        girl = sla.Girl_Simple_Simulation()
        girl.name = "Emma"
        boy = sla.Boy_Simple_Simulation()
        boy.name = "Chad"
    jump Slaver_Tester_Loop

label Slaver_Tester_Loop:
    $ entries = sla.sexual_actions_menu_entries
    $ selection = renpy.display_menu(entries)
    $ girl.stimulated += selection.target_stimulus
    $ boy.stimulated += selection.actor_stimulus
    jump Slaver_Tester_Loop

label _Slaver_Tester__Game__Setup__Choices:
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

label _Slaver_Tester__Game__Main_Loop__Prompt:
    if protagonist.occupation == "MANAGER":
        call _Slaver_Tester__Game__Main_Loop__Protagonist_Day_Activities_Description__Manager
    elif protagonist.occupation == "UNEMPLOYED":
        call _Slaver_Tester__Game__Main_Loop__Protagonist_Day_Activities_Description__Unemployed
    elif protagonist.occupation == "SLAVE":
        call _Slaver_Tester__Game__Main_Loop__Protagonist_Day_Activities_Description__Slave
    "{color=[prompt_color]}What will you do today?{/color}"
    return

label _Slaver_Tester__Game__Main_Loop__Protagonist_Day_Activities_Description__Manager:
    "You spent the whole day at work and finally come home."
    return

label _Slaver_Tester__Game__Main_Loop__Protagonist_Day_Activities_Description__Unemployed:
    "You have nothing much to do for the whole day. What is the ONE interesting thing you will do?"
    return

label _Slaver_Tester__Game__Main_Loop__Protagonist_Day_Activities_Description__Slave:
    "You spent the whole confined home. What is the ONE interesting thing you will do?"
    return


label _Slaver_Tester__Game__Co_Star__Current_Activity_Description:
    python:
        def Game__Co_Star__Current_Activity_Description__Builder():
            "She is lying about, relaxing."
            return
    $ renpy.say(Game__Co_Star__Current_Activity_Description__Builder())
    return

