init python:
    import _Climax_TesterPy as cli

label Climax_Tester_Start:
    python:
        girl = cli.Girl_Simple_Simulation()
        girl.name = "Emma"
        boy = cli.Boy_Simple_Simulation()
        boy.name = "Chad"
    # "As you slide into her, you try to think how best bring her to a climax."
    "[boy.name] and [girl.name] already have a sexual relationship."
    # TODO: Add code for taking off clothes.
    "They are naked in bed."
    "What should they do?"
    jump Climax_Tester_Loop

label Climax_Tester_Loop:
    call Climax_Tester_Activity_Selector
    $ tmp = girl.get_reaction_to_sexual_stimulus()
    $ renpy.say("", tmp)
    $ tmp = boy.get_reaction_to_sexual_stimulus()
    if tmp != None:
        $ renpy.say("", tmp)
    $ entries = cli.sexual_actions_menu_entries
    $ selection = renpy.display_menu(entries)
    $ girl.stimulated += selection.target_stimulus
    $ boy.stimulated += selection.actor_stimulus
    jump Climax_Tester_Loop

label Climax_Tester_Activity_Selector:
    "{color=#ff7f50}Starting with an activity...{/color}"
    $ tmp = len(cli.sensual_activities.keys())
    $ entries = cli.get_or_build_sexual_actions_menu_entries()
    $ selection = renpy.display_menu(entries)
    $ activity = selection
    return

label Climax_Tester_Action_Selector:
    return

label Climax_Tester_Aroused_Descriptor:
    return

label Climax_Tester_Stimulated_Descriptor:
    return

    #     # choice=None
    #     # my_choices=["A choice", "The same choice"]
    #     # menu_items=[]
    #     # for item in my_choices:
    #     #     menu_items.append((item, fff))
    #     # menu_items.append(("Nevermind", Pass))
    #     # choice = menu(menu_items)
    #     # i = [
    #     #         Choice_Item("A choice", fff),
    #     #         Choice_Item("The same choice", fff),
    #     #         # Choice_Item("A choice", renpy.say("", "wah")),
    #     #         # Choice_Item("The same choice", renpy.say("", "wah2")),
    #     # ]
    #     # choice = menu(i)
    #     actions = [("A choice", "fff"), ("The same choice", "test_action_x"), ("Different choice", "opt3")]
    #     sel = renpy.display_menu(actions)
    #     exec("fff()")
    # "Val: [girl.stimulated]!"
    # $ renpy.call(sel)
