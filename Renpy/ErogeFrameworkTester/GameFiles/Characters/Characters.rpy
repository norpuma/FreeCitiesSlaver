init 150:
    python:
        import PowerPlayFramework.Characters.Character_NamesPy as names_system

        names_system.initialize_names("""ErogeFrameworkTester\PowerPlayFramework\Characters\Names.jsonc""")

        import json

        def load_game_characters_locations():
            jsonc_file_with_path = """ErogeFrameworkTester\GameFiles\Characters\Characters.jsonc"""
            with open(jsonc_file_with_path) as json_file:
                json_object = json.load(json_file)
                json_file.close()
                for key, value in json_object.items():
                    new_character = person.Developed_Character().build_from_json(key, value)
            
        load_game_characters_locations() # Import from file "Town.jsonc"

        someone = person.Developed_Character().build(None, names_system.Character_Names.generate_random(fundamentals.Gender.FEMALE), fundamentals.Gender.FEMALE, 19)
        someone.talk_color = "#ffff00"
        someone.location = locations.locations_by_id["TOWN"]
        someone_else = person.Developed_Character().build(None, names_system.Character_Names.generate_random(fundamentals.Gender.MALE), fundamentals.Gender.MALE, 22)
        someone_else.talk_color = "#00ff00"
        someone_else.location = locations.locations_by_id["TOWN"]
        fundamentals.characters_database["THE_MAYOR"].location = locations.locations_by_id["TOWN"]

