init 0:
    $ _PowerPlayFramework__characters_initialization_first_pass_labels.append("Initialize__Protagonist")

label Initialize__Protagonist:
    $ protagonist_id = "PROTAGONIST"
    $ p_names = names_system.Character_Names(protagonist_id).build(character_id = protagonist_id, gender = fundamentals.Gender.MALE, standard_name = "Jim", standard_possessive = "Jim's", first = "James", first_possessive = "James'", last = "Clearing", last_possessive = "Clearing's")
    $ protagonist = characters.Developed_Character(protagonist_id).build("PROTAGONIST", p_names, fundamentals.Gender.MALE, 25)
    $ protagonist.talk_color = "#0000FF"
    $ protagonist.location = locations.locations_by_id["TOWN_TESTER__TOWN"]
    return
