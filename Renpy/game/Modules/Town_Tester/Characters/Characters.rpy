init 0 python:
    _PowerPlayFramework__characters_initialization_first_pass_labels.append("TOWN_TESTER__Character_Initialization__First_Pass")
    _PowerPlayFramework__characters_initialization_second_pass_labels.append("TOWN_TESTER__Character_Initialization__Second_Pass")

label TOWN_TESTER__Character_Initialization__First_Pass:
    $ names_json = _PowerPlayFramework__read_file_to_json("""game\Modules\Town_Tester\Characters\Additional_Character_Names.jsonc""")
    $ names_system.update_names(names_json)
    $ characters_json = _PowerPlayFramework__read_file_to_json("""game\Modules\Town_Tester\Characters\Characters.jsonc""")
    $ characters.load_characters_from_json_object(characters_json)
    return

label TOWN_TESTER__Character_Initialization__Second_Pass:
    python:
        for character in fundamentals.characters_database.values():
            if character.location == None:
                character.location = locations.locations_by_id["TOWN_TESTER__TOWN"]
    return
