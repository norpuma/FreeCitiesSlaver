init 10 python:
    import json


    def load_town_locations():
        jsonc_file_with_path = """ErogeFrameworkTester\GameFiles\Locations\Town.jsonc"""
        with open(jsonc_file_with_path) as json_file:
            json_object = json.load(json_file)
            json_file.close()
        for location_id, location_json in json_object.items():
            locations.Location.build_part1_from_json(location_id, location_json)
        locations.create_connections_on_loaded_locations()
        
    loaded_town_locations = load_town_locations() # Import from file "Town.jsonc"


label Sometown__Visit:
    "You are at Sometown, now."
    return

label Town_Hall__Visit:
    "You are at the Sometown town hall."
    return

label General_Store__Visit:
    "You are at the Renaissance General Store, now."
    return

label School__Visit:
    "You are at the Colony Finishing School, now."
    return

label Tavern__Visit:
    "You are at the Good Times Tavern, now."
    return

label Hotel__Visit:
    "You are at the Dreams Hotel, now."
    return
