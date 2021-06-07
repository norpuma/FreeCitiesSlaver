init python:
    import _Climax_TesterPy as cli

label Climax_Tester_Start:
    "As you slide into her, you try to think how best bring her to a climax."
    python:
        girl = cli.Girl_Simple_Simulation()
        boy = cli.Boy_Simple_Simulation()
    jump Climax_Tester_Loop

label Climax_Tester_Loop:
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
