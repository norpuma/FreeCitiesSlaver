label Game_Play_Activities__Main_Loop:
# <<run initializeCharacters()>>\
    menu:
        "- Follow schedule.":
            jump Game_Play_Activities__Main_Loop__Follow_Schedule_Options
        "- Review investments (schedule/time and expenses). \[NON-FUNCTIONAL\]":
            jump Game_Play_Activities__Main_Loop
        "- Change investments (schedule/time and expenses). \[NON-FUNCTIONAL\]":
            jump Game_Play_Activities__Main_Loop
        "- Break away from schedule. \[NON-FUNCTIONAL\]":
            jump Game_Play_Activities__Main_Loop
        # "": # Empty option just to create a space between options
        #     jump Game_Play_Activities__Main_Loop

        "- Check own profile. \[NON-FUNCTIONAL\]":
            jump Game_Play_Activities__Main_Loop
        # "- Check own status. \[NON-FUNCTIONAL\]":
        #     jump Game_Play_Activities__Main_Loop
        # "- List identified locations. \[NON-FUNCTIONAL\]":
        #     jump Game_Play_Activities__Main_Loop
        # "-- Check notes for a location. \[NON-FUNCTIONAL\]":
        #     jump Game_Play_Activities__Main_Loop
        # "- List identified characters. \[NON-FUNCTIONAL\]": # SEE: _CharacterInteractionActivities.twee for these
        #     jump Activities__List_Identified_Characters
        # "-- Check notes for an identified character. \[NON-FUNCTIONAL\]": # "_CharacterInteractionActivities.twee for these
        #     jump Game_Play_Activities__Main_Loop

# ::Game Play Activities - Main Loop - Go to Computed Passage
# <<goto $computedPassage>>

# ::Game Play Activities - Main Loop - Follow Schedule Options
# <!-- - Follow schedule for a time. -->
# <<link "- Follow schedule for the remainder of the day." "Game Play Activities - Main Loop - Go to Computed Passage">><<set $computedPassage = protagonistScheduleControl.followScheduleUntilTime(calendar.gameDay+1, protagonist.startDayTime)>><</link>>
# <!-- - Follow schedule for the remainder of the week. -->
# <!-- - Follow schedule until next event. -->

# ::Break Away from Schedule Options
# [[- Solo Activities|Solo Activities]]
# - Location Related Activities
# - Character Finding Related Activities <!-- SEE: _CharacterInteractionActivities.twee for these -->
# - Character Interaction Activities <!-- SEE: _CharacterInteractionActivities.twee for these -->

# ::Solo Activities
# - Self Improvement. (e.g. learning a new skill)
# - New Activity.
# - Gather resources.
# - Make an online purchase.
# - Create Dream Form
# - Create Flesh Form
# - Create a drug
# - Manage a domain

# [[Continue.|Main Loop]]

# ::Location Related Activities
# - Search for a location.
# - Go to location.
# - Examine location.
# - Remote visit a location. (use cameras, xenotech or other method)
# - List characters (TARGETS) at location.
