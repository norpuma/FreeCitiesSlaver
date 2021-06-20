init 0 python:
    #locations.load_locations_from_json("""ErogeFrameworkTester\Modules\Town_Tester\Locations\Town.jsonc""")
    _PowerPlayFramework__locations_initialization_first_pass_labels.append("TOWN_TESTER__Locations_Initialization__First_Pass")

label TOWN_TESTER__Locations_Initialization__First_Pass:
    $ json_object = {
        "TOWN_TESTER__TOWN": {
            "name": "Sometown",
            "visit_callable": "Sometown__Visit",
            "is_public": True
        },
        "TOWN_TESTER__TOWN_HALL": {
            "name": "Town Hall",
            "visit_callable": "Town_Hall__Visit",
            "is_public": False,
            "connections": [
                {
                    "exit_text": "Go to town center",
                    "destination_id": "TOWN_TESTER__TOWN",
                    "coming_in_text": "Go to the town hall"
                }
            ]
        },
        "TOWN_TESTER__GENERAL_STORE": {
            "name": "General Store",
            "visit_callable": "General_Store__Visit",
            "is_public": False,
            "connections": [
                {
                    "exit_text": "Go to town center",
                    "destination_id": "TOWN_TESTER__TOWN",
                    "coming_in_text": "Go to the general store"
                }
            ]
        },
        "TOWN_TESTER__SCHOOL": {
            "name": "School",
            "visit_callable": "School__Visit",
            "is_public": False,
            "connections": [
                {
                    "exit_text": "Go to town center",
                    "destination_id": "TOWN_TESTER__TOWN",
                    "coming_in_text": "Go to the school"
                }
            ]
        },
        "TOWN_TESTER__TAVERN": {
            "name": "Tavern",
            "visit_callable": "Tavern__Visit",
            "is_public": True,
            "connections": [
                {
                    "exit_text": "Go to town center",
                    "destination_id": "TOWN_TESTER__TOWN",
                    "coming_in_text": "Go to the tavern"
                }
            ]
        },
        "TOWN_TESTER__HOTEL": {
            "name": "Hotel",
            "visit_callable": "Hotel__Visit",
            "is_public": True,
            "connections": [
                {
                    "exit_text": "Go to town center",
                    "destination_id": "TOWN_TESTER__TOWN",
                    "coming_in_text": "Go to the hotel"
                }
            ]
        }
    }
    $ locations.load_locations_from_json(json_object)
    return

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
