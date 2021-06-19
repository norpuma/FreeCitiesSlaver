init 10 python:
    locations.load_locations_from_json("""ErogeFrameworkTester\GameFiles\Locations\Town.jsonc""")

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
