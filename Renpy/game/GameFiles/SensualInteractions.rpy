label SensualInteractions(actor, target, participants, witnesses):
    $objectPronoun = target.pronouns.OBJECT
    menu:
        "Flirt with [objectPronoun].":
            pass
        "Invite [objectPronoun] to a date.":
            pass
        "Makeout.":
            pass
        "Initiate sex.":
            pass
    return
