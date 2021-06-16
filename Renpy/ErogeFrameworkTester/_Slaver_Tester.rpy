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

