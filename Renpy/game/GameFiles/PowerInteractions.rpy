label PowerInteractions(actor, target, participants, witnesses):
    $possessive = target.pronouns.POSSESSIVE
    $objectPronoun = target.pronouns.OBJECT
    menu:
        "Make conversation to change one of [possessive] beliefs.":
            pass
        "Give [objectPronoun] a task.":
            pass
        "Change [possessive] rules.":
            pass
        "Evaluate [possessive] recent performance.":
            pass
        "Give [objectPronoun] a command.":
            pass
    return

label PowerInteractions__ChangeBelief(actor, target, participants, witnesses):
    $currentInsightTotal = protagonist.relationships[target].insightReserve
    # TODO: Add code to ensure that you can only argue 3 beliefs at once, otherwise you have to discard beliefs.
    # TODO: Add rule to determine if you convince the target and change their belief.
    $currentlyArguableBeliefs = getArguableBeliefs(actor, target)
    $arguableBelief_1 = currentlyArguableBeliefs[0]
    if (len(currentlyArguableBeliefs) >= 2):
        $arguableBelief_2 = currentlyArguableBeliefs[1]
    if (len(currentlyArguableBeliefs) >= 3):
        $arguableBelief_3 = currentlyArguableBeliefs[2]
    menu:
        "Argue [arguableBelief_1.menuEntry].":
            call PowerInteractions__ChangeBelief__ResolutionDescriptor(actor, target, participants, witnesses, arguableBelief_1.beliefKey, arguableBelief_1.inFavorOrAgainst)
        "Argue [arguableBelief_2.menuEntry]." if len(currentlyArguableBeliefs) >= 2:
            call PowerInteractions__ChangeBelief__ResolutionDescriptor(actor, target, participants, witnesses, arguableBelief_2.beliefKey, arguableBelief_2.inFavorOrAgainst)
        "Argue [arguableBelief_3.menuEntry]." if len(currentlyArguableBeliefs) >= 3:
            call PowerInteractions__ChangeBelief__ResolutionDescriptor(actor, target, participants, witnesses, arguableBelief_3.beliefKey, arguableBelief_3.inFavorOrAgainst)
        "Chose a different belief to argue...":
            call PowerInteractions__ChangeBelief__SelectBeliefToArgue(actor, target, participants, witnesses)
    
    return

label PowerInteractions__ChangeBelief__ResolutionDescriptor(actor, target, participants, witnesses, beliefKey, inFavorOrAgainst):
    $targetName = actor.relationships[target].targetModel.names.standard
    $argumentDescriptor = getArgumentDescriptorForBeliefKey(actor, target, beliefKey, inFavorOrAgainst)
    # argumentDescriptor == "You argue in favor of slavery by debt."
    # argumentDescriptor == "You argue against her right to go out on a Friday night."
    "You have a nice conversation with [targetName]. You argue [argumentDescriptor]."
    return

label PowerInteractions__ChangeBelief__SelectBeliefToArgue(actor, target, participants, witnesses):
    return
