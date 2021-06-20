import json
import renpy.exports as renpy

locations_by_id = {}

def register_location(location):
    locations_by_id[location.id] = location

def load_locations_from_json(json_object):
    for location_id, location_json in json_object.items():
        Location.build_part1_from_json(location_id, location_json)
    create_connections_on_loaded_locations()

class _Temporary_Connection(object):
    def __init__(self, starting_point_id, destination_id, from_starting_point_to_destination_text, from_destination_to_starting_point_text):
        self.starting_point_id = starting_point_id
        self.destination_id = destination_id
        self.from_starting_point_to_destination_text = from_starting_point_to_destination_text
        self.from_destination_to_starting_point_text = from_destination_to_starting_point_text

_temporary_connections = {}

def register_temporary_connection(temporary_connection):
    _temporary_connections[temporary_connection.starting_point_id] = temporary_connection

def create_connections_on_loaded_locations():
    for temporary_connection in _temporary_connections.values():
        starting_point_location = locations_by_id[temporary_connection.starting_point_id]
        destination_location = locations_by_id[temporary_connection.destination_id]
        starting_point_location.destinations.append(Destination(destination_location, temporary_connection.from_starting_point_to_destination_text))
        destination_location.destinations.append(Destination(starting_point_location, temporary_connection.from_destination_to_starting_point_text))
        global _temporary_connections
        _temporary_connections = {}

class Location(object):
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.id = None
        self.name = None
        self.visit_callable = None
        self.parent_location = None
        self.destinations = []
        self._characters = []

        return self
    
    def build(self, id, name, visit_callable):
        self._reset()
        self.id = id
        self.name = name
        self.visit_callable = visit_callable # This is a renpy label that can be called (with renpy.call) when the character moves to this location. Usually will present a short text describing the location.
        self.parent_location = None
        self.destinations = []
        self._characters = []
        register_location(self)

        return self

    @classmethod
    def build_part1_from_json(cls, id, json):
        result = cls()
        json_keys = json.keys()
        parent_location = None
        destinations = []
        local_menu_callable = ""
        is_public = False

        if "name" in json_keys:
            name = json["name"]
        else:
            renpy.error("ERROR: Location.build_part1_from_json(): Name field not found in json for id '{id}'.")
        if "visit_callable" in json_keys:
            visit_callable = json["visit_callable"]
        else:
            renpy.error("ERROR: Location.build_part1_from_json(): visit_callable field not found in json for id '{id}'.")
        if "local_menu_callable" in json_keys:
            local_menu_callable = json["local_menu_callable"]
        if "is_public" in json_keys:
            is_public = json["is_public"]
        
        result.build(id, name, visit_callable)
        if "connections" in json_keys:
            connections = json["connections"]
            for connection in connections:
                register_temporary_connection(_Temporary_Connection(starting_point_id = id, destination_id = connection["destination_id"], from_starting_point_to_destination_text = connection["exit_text"], from_destination_to_starting_point_text = connection["coming_in_text"]))
    
        return result
        
    @property
    def characters(self):
        return self._characters
    
    def add_character(self, character):
        self._characters.append(character.id)
    
    def is_character_here(self, character):
        return character.id in self._characters
    
    def remove_character(self, character):
        if character.id in self._characters:
            self._characters.remove(character.id)

class Destination(object) :
    def __init__(self, location, exit_text):
        self.exit_text = exit_text
        self.target_location = location

# class Fixture(object):
#     """Fixtures are elements of the location. All locations should have a floor on which characters can stand, kneel and lay on. Many locations have walls as well. Some will have bench, bed, table and other similar elements."""
#     TYPE_PLANE = "TYPE_PLANE" # A plane (like a floor) allows standing, kneeling and laying.
#     TYPE_WALL = "TYPE_WALL" # A wall allows leaning on.
#     TYPE_RAISED_PLANE = "TYPE_RAISED_PLANE" # A sitting fixture (bench, bed, chair, couch) allows sitting and kneeling, but also laying.
#     TYPE_SMALL_RAISED_PLANE = "TYPE_RAISED_PLANE" # A small sitting fixture (chair) allows sitting and kneeling, but does not allow laying.
#     def __init__(self, name, type):
#         self.name = name
#         self.type = type

# class Location(object):
#     def __init__(self):
#         self._reset()
    
#     def _reset(self):
#         self.id = None
#         self.name = None
#         self.short_name = None
#         self.visit_callable = None
#         self.local_menu_callable = None
#         self.parent_location = None
#         self.destinations = []
#         self.sub_locations = []
#         self.location_to_redirect_landings_to = None
#         self.locked = False
#         self.anteroom = None
#         self.address = None
#         self._characters = []
#         self.items = []
#         self.fixtures = []
#         self.local_interactions = []
#         self.scheduled_events = []
#         self.is_public = False

#         return self
    
#     def build(self, id, name, visit_callable, local_menu_callable, is_public = False):
#         self._reset()
#         self.id = id
#         self.name = name
#         self.short_name = name
#         self.visit_callable = visit_callable # This is a renpy label that can be called (with renpy.call) when the character moves to this location. Usually will present a short text describing the location.
#         self.local_menu_callable = local_menu_callable # This is a renpy label that can be called (with renpy.call) when the character starts an interaction at this location, presenting a list of possible actions.
#         self.parent_location = None
#         self.destinations = []
#         self.sub_locations = []
#         self.location_to_redirect_landings_to = None
#         self.locked = False # ATTENTION: locked locations should have an anteroom, so that characters may stand at the entrance if they don't have access to the location.
#         self.anteroom = None # An anteroom is where a character should go when a location is inaccessible (for instance, in front of a bathroom door when the bathroom is closed or a house's porch when the character does not have access to it).
#         self.address = None
#         self._characters = []
#         self.items = []
#         self.fixtures = [] # Fixtures are elements of the location. All locations should have a floor on which characters can stand, kneel and lay on.
#         self.fixtures.append(Fixture("floor", Fixture.TYPE_PLANE)) #Add a standing position that you can always use.
#         self.local_interactions = []
#         self.scheduled_events = []
#         self.is_public = is_public #If True, random people can wander here.
#         register_location(self)

#         return self
    
#     @property
#     def characters(self):
#         return self._characters
    
#     def add_character(self, character):
#         self._characters.append(character.id)
    
#     def is_character_here(self, character):
#         return character.id in self._characters
    
#     def remove_character(self, character):
#         if character.id in self._characters:
#             self._characters.remove(character.id)
    
#     def set_location_to_redirect_landings_to(self, location):
#         # Some locations are umbrellas and actual traveling to the location should redirect a character to a given "landing" location.
#         self.location_to_redirect_landings_to = location.id
#         self.visit_callable = location.visit_callable
#         self.local_menu_callable = location.local_menu_callable
    
#     def add_destination(self, destination) :
#         self.destinations.append(destination)
        
#     def add_sub_location(self, sub_location, parent_to_sub_location_text, sub_location_to_parent_text, must_copy_address = False):
#         if sub_location is None:
#             return
#         location = self
#         if self.location_to_redirect_landings_to is not None:
#             location = self.location_to_redirect_landings_to
#         sub_location.parent_location = location
#         location.destinations.append( Destination( exit_text = parent_to_sub_location_text , location = sub_location ) )
#         sub_location.destinations.append( Destination( exit_text = sub_location_to_parent_text , location = location ) )
#         if must_copy_address and ( self.address is not None ) and ( len( self.address ) ) :
#             sub_location.address = self.address

#     def add_parent_location(self, parent_location, sub_location_to_parent_text, parent_to_sub_location_text, must_copy_address = False):
#         if parent_location is None:
#             return
#         location = parent_location
#         if parent_location.location_to_redirect_landings_to is not None:
#             location = self.location_to_redirect_landings_to
#         self.parent_location = parent_location
#         self.destinations.append( Destination( exit_text = sub_location_to_parent_text , location = location ) )
#         if location is not None :
#             location.destinations.append( Destination( exit_text = parent_to_sub_location_text , location = self ) )
            
#         if must_copy_address and ( self.address is not None ) and ( len( self.address ) ) :
#             parent_location.address = self.address
        
#         # # E.g. Living Room of House on Street. Living Room tries to add House as parent location.
#         # #   What we want is Living Room exit leading to Street and Street leading to House.
#         # if parent_location.location_to_redirect_landings_to == self :
#             # self.parent_location = parent_location
#             # parent_destination_to_parents_parent = None
#             # for 
#             # self.destinations.append( Destination( exit_text = sub_location_to_parent_text , location = parent_location.parent_location ) )
#             # ;
    
#     @classmethod
#     def build_part1_from_json(cls, id, json):
#         result = cls()
#         json_keys = json.keys()
#         parent_location = None
#         destinations = []
#         sub_locations = []
#         location_to_redirect_landings_to = None
#         # ATTENTION: locked locations should have an anteroom, so that characters may stand at the entrance if they don't have access to the location.
#         anteroom = None # An anteroom is where a character should go when a location is inaccessible (for instance, in front of a bathroom door when the bathroom is closed or a house's porch when the character does not have access to it).
#         # for attr in result.__dict__.keys():
#         #     if attr == "parent_location":
#         #         parent_location = json[attr]
#         #     elif attr == "destinations":
#         #         destinations = json[attr]
#         #     elif attr == "sub_locations":
#         #         sub_locations = json[attr]
#         #     elif attr == "location_to_redirect_landings_to":
#         #         location_to_redirect_landings_to = json[attr]
#         #     elif attr == "anteroom":
#         #         anteroom = json[attr]
#         #     elif attr in json_keys:
#         #         result.__dict__[attr] = json[attr]
#         # if actor_used_body_part_id == None or target_used_body_part_id == None or verb_id == None or actor_verb == None:
#         #     raise "ERROR: Sexual_Action_Advanced.build_from_json(): Required attributes not found: actor_used_body_part_id == '{actor_used_body_part_id}', target_used_body_part_id == '{target_used_body_part_id}', verb_id = '{verb_id}', action_verb == '{actor_verb}'."
#         local_menu_callable = ""
#         is_public = False

#         if "name" in json_keys:
#             name = json["name"]
#         else:
#             renpy.error("ERROR: Location.build_part1_from_json(): Name field not found in json for id '{id}'.")
#         if "visit_callable" in json_keys:
#             visit_callable = json["visit_callable"]
#         else:
#             renpy.error("ERROR: Location.build_part1_from_json(): visit_callable field not found in json for id '{id}'.")
#         if "local_menu_callable" in json_keys:
#             local_menu_callable = json["local_menu_callable"]
#         if "is_public" in json_keys:
#             is_public = json["is_public"]

#         result.build(id, name, visit_callable, local_menu_callable, is_public)

#         return result
    
#     def build_part2_from_json(self, json):
#         # TODO: Write code to create connections between locations here, from stored connection strings.
#         pass
