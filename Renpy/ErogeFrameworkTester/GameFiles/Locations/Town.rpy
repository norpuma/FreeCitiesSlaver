init 10 python:
    import json

    def load_town_locations():
        jsonc_file_with_path = """ErogeFrameworkTester\GameFiles\Locations\Town.jsonc"""
        with open(jsonc_file_with_path) as json_file:
            json_object = json.load(json_file)
            json_file.close()
        
    loaded_town_locations = load_town_locations() # Import from file "Town.jsonc"


init 10 python:
    town = locations.Location("Sometown", "Sometown__Visit", "", is_public = True)

label Sometown__Visit:
    "You are at Sometown, now."
    return

init 10 python:
    town_hall = locations.Location("Town Hall", "Town_Hall__Visit", "", is_public = False)
    town_hall.add_parent_location(town, "Go to town center", "Go to the town hall")

label Town_Hall__Visit:
    "You are at the Sometown town hall."
    return

init 10 python:
    general_store = locations.Location("General Store", "General_Store__Visit", "", is_public = True)
    general_store.add_parent_location(town, "Go to town center", "Go to the general store")

label General_Store__Visit:
    "You are at the Renaissance General Store, now."
    return

init 10 python:
    school = locations.Location("School", "School__Visit", "", is_public = False)
    school.add_parent_location(town, "Go to town center", "Go to the school")

label School__Visit:
    "You are at the Colony Finishing School, now."
    return

init 10 python:
    tavern = locations.Location("Tavern", "Tavern__Visit", "", is_public = True)
    tavern.add_parent_location(town, "Go to town center", "Go to the tavern")

label Tavern__Visit:
    "You are at the Good Times Tavern, now."
    return

init 10 python:
    hotel = locations.Location("Hotel", "Hotel__Visit", "", is_public = False)
    hotel.add_parent_location(town, "Go to town center", "Go to the hotel")

label Hotel__Visit:
    "You are at the Dreams Hotel, now."
    return
