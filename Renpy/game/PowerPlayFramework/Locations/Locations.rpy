init python:
    import PowerPlayFramework.Locations.LocationsPy as locations

    def locations__build_menu_entries_from_destinations(location_destinations):
        result = []
        for destination in location_destinations:
            result.append((destination.exit_text, destination.target_location))
        return result

