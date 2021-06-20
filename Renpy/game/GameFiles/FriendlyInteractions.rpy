label FriendlyInteractions(actor, target, participants, witnesses):
    $possessive = target.pronouns.POSSESSIVE
    menu:
        "Make conversation to improve [possessive] mood.":
            pass
        "Make conversation to gain insights.":
            pass
        "Make conversation to gain some more intimacy.":
            pass
    return

label FriendlyInteractions__ImproveMood(actor, target, participants, witnesses):
    $currentInsightTotal = protagonist.relationships[target].insightReserve
    menu:
        "Use flattery.":
            pass
        "Use insight \[[INSIGHT_COST_TO_IMPROVE_MOOD] of [currentInsightTotal]\].":
            pass
        "Use charm \[[CHARM_COST_TO_IMPROVE_MOOD] of [currentCharmReserve]\].":
            pass
    return

label FriendlyInteractions__GainInsight(actor, target, participants, witnesses):
    $targetName = actor.relationships[target].targetModel.names.standard
    "You have a nice conversation with [targetName] and manage to learn some more about [objectPronoun]."
    $currentInsightTotal = protagonist.relationships[target].insightReserve
    "You gained +[INSIGHT_GAIN_FROM_CONVERSATION] insight and now have [currentInsightTotal]."
    # TODO: Add rule to determine if you get a key knowledge. Will it be a random key knowledge? Or can you chose if you have the proper skills or qualities?
    # TODO: Add a rule to determine if the target gains some more knowledge about you. Can you chose what is revealed with the right skills? Can you decide to give a false value of a statistic - e.g. Empathy - with the right skills? Can you chose not to reveal anything by spending a resource - e.g. Charm?
    return

label FriendlyInteractions__GainIntimacy(actor, target, participants, witnesses):
    $targetName = actor.relationships[target].targetModel.names.standard
    "You have a nice conversation with [targetName] and manage to get closerto [objectPronoun]."
    $currentIntimacyTotal = protagonist.relationships[target].intimacy
    "You gained +[INTIMACY_GAIN_FROM_CONVERSATION] intimacy and now have [currentIntimacyTotal]."
    # TODO: Add rule to determine if you get a key knowledge. Will it be a random key knowledge? Or can you chose if you have the proper skills or qualities?
    # TODO: Add a rule to determine if the target gains some more knowledge about you. Can you chose what is revealed with the right skills? Can you decide to give a false value of a statistic - e.g. Empathy - with the right skills? Can you chose not to reveal anything by spending a resource - e.g. Charm?
    return
