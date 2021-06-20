init python:
    # from enum import Enum
    # class Visibility(Enum):
    #     INIVISBLE = "INVISIBLE"
    #     VISIBLE = "VISIBLE"
    # INIVISBLE = "INVISIBLE"
    # VISIBLE = "VISIBLE"

    class Protagonist(renpy.store.object):
        def __init__(self):
            self.visibility = INIVISBLE
            return

label God_Mode__Main_Loop:
    menu:
        "- Redefine yourself. \[NON-FUNCTIONAL\]":
            jump God_Mode__Redefine_Yourself
        "- Set your visibility. \[NON-FUNCTIONAL\]":
            jump God_Mode__Main_Loop
        "- Select Location. \[NON-FUNCTIONAL\]":
            jump God_Mode__Main_Loop
        "- Summon NPC. \[NON-FUNCTIONAL\]":
            jump God_Mode__Main_Loop
        "- Reset NPC characteristics. \[NON-FUNCTIONAL\]":
            jump God_Mode__Main_Loop
        "- Start interacting. \[NON-FUNCTIONAL\]":
            jump God_Mode__Main_Loop
    return

label God_Mode__Redefine_Yourself:
    menu:
        "- Set your age. \[NON-FUNCTIONAL\]":
            jump God_Mode__Redefine_Yourself
        "- Set your job. \[NON-FUNCTIONAL\]":
            jump God_Mode__Redefine_Yourself
        "-- Back to God Mode":
            jump God_Mode__Main_Loop
    return
