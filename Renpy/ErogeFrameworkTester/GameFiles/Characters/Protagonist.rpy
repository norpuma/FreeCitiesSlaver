label Initialize__Protagonist:
    $ protagonist = person.Developed_Character().build("PROTAGONIST", names_system.Character_Names().build(standard_name = "Jim", standard_possessive = "Jim's", first = "James", first_possessive = "James'", last = "Clearing", last_possessive = "Clearing's"), fundamentals.Gender.MALE, 25)
    $ protagonist.talk_color = "#0000FF"
    $ protagonist.location = town
    return
