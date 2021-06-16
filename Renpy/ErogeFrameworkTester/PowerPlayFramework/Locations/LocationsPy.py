locations_by_name = {}

another_test_variable = "b"

class Fixture(object):
    """Fixtures are elements of the location. All locations should have a floor on which characters can stand, kneel and lay on. Many locations have walls as well. Some will have bench, bed, table and other similar elements."""
    TYPE_PLANE = "TYPE_PLANE" # A plane (like a floor) allows standing, kneeling and laying.
    TYPE_WALL = "TYPE_WALL" # A wall allows leaning on.
    TYPE_RAISED_PLANE = "TYPE_RAISED_PLANE" # A sitting fixture (bench, bed, chair, couch) allows sitting and kneeling, but also laying.
    TYPE_SMALL_RAISED_PLANE = "TYPE_RAISED_PLANE" # A small sitting fixture (chair) allows sitting and kneeling, but does not allow laying.
    def __init__(self, name, type):
        self.name = name
        self.type = type

class Location(object) :
    def __init__(self, name, visit_callable, local_menu_callable, is_public = False) :
        self.name = name
        self.short_name = name
        self.visit_callable = visit_callable # This is a renpy label that can be called (with renpy.call) when the character moves to this location. Usually will present a short text describing the location.
        self.local_menu_callable = local_menu_callable # This is a renpy label that can be called (with renpy.call) when the character starts an interaction at this location, presenting a list of possible actions.
        self.parent_location = None
        self.destinations = []
        self.sub_locations = []
        self.location_to_redirect_landings_to = None
        self.locked = False # ATTENTION: locked locations should have an anteroom, so that characters may stand at the entrance if they don't have access to the location.
        self.anteroom = None # An anteroom is where a character should go when a location is inaccessible (for instance, in front of a bathroom door when the bathroom is closed or a house's porch when the character does not have access to it).
        self.address = None
        self.characters = []
        self.items = []
        self.fixtures = [] # Fixtures are elements of the location. All locations should have a floor on which characters can stand, kneel and lay on.
        self.fixtures.append(Fixture("floor", Fixture.TYPE_PLANE)) #Add a standing position that you can always use.
        self.local_interactions = []
        self.scheduled_events = []
        self.is_public = is_public #If True, random people can wander here.
    
    def set_location_to_redirect_landings_to(self, location) :
        # Some locations are umbrellas and actual traveling to the location should redirect a character to a given "landing" location.
        self.location_to_redirect_landings_to = location
        self.visit_callable = location.visit_callable
        self.local_menu_callable = location.local_menu_callable
    
    def add_destination(self, destination) :
        self.destinations.append(destination)
        
    def add_sub_location(self, sub_location, parent_to_sub_location_text, sub_location_to_parent_text, must_copy_address = False):
        if sub_location is None:
            return
        location = self
        if self.location_to_redirect_landings_to is not None:
            location = self.location_to_redirect_landings_to
        sub_location.parent_location = location
        location.destinations.append( Destination( exit_text = parent_to_sub_location_text , location = sub_location ) )
        sub_location.destinations.append( Destination( exit_text = sub_location_to_parent_text , location = location ) )
        if must_copy_address and ( self.address is not None ) and ( len( self.address ) ) :
            sub_location.address = self.address

    def add_parent_location(self, parent_location, sub_location_to_parent_text, parent_to_sub_location_text, must_copy_address = False):
        if parent_location is None:
            return
        location = parent_location
        if parent_location.location_to_redirect_landings_to is not None:
            location = self.location_to_redirect_landings_to
        self.parent_location = parent_location
        self.destinations.append( Destination( exit_text = sub_location_to_parent_text , location = location ) )
        if location is not None :
            location.destinations.append( Destination( exit_text = parent_to_sub_location_text , location = self ) )
            
        if must_copy_address and ( self.address is not None ) and ( len( self.address ) ) :
            parent_location.address = self.address
        
        # # E.g. Living Room of House on Street. Living Room tries to add House as parent location.
        # #   What we want is Living Room exit leading to Street and Street leading to House.
        # if parent_location.location_to_redirect_landings_to == self :
            # self.parent_location = parent_location
            # parent_destination_to_parents_parent = None
            # for 
            # self.destinations.append( Destination( exit_text = sub_location_to_parent_text , location = parent_location.parent_location ) )
            # ;
    
    @classmethod
    def build_part1_from_json(cls, json):
        result = cls()
        json_keys = json.keys()
        parent_location = None
        destinations = []
        sub_locations = []
        location_to_redirect_landings_to = None
        # ATTENTION: locked locations should have an anteroom, so that characters may stand at the entrance if they don't have access to the location.
        anteroom = None # An anteroom is where a character should go when a location is inaccessible (for instance, in front of a bathroom door when the bathroom is closed or a house's porch when the character does not have access to it).
        for attr in result.__dict__.keys():
            if attr == "parent_location":
                parent_location = json[attr]
            elif attr == "destinations":
                destinations = json[attr]
            elif attr == "sub_locations":
                sub_locations = json[attr]
            elif attr == "location_to_redirect_landings_to":
                location_to_redirect_landings_to = json[attr]
            elif attr == "anteroom":
                anteroom = json[attr]
            elif attr in json_keys:
                result.__dict__[attr] = json[attr]
        # if actor_used_body_part_id == None or target_used_body_part_id == None or verb_id == None or actor_verb == None:
        #     raise "ERROR: Sexual_Action_Advanced.build_from_json(): Required attributes not found: actor_used_body_part_id == '{actor_used_body_part_id}', target_used_body_part_id == '{target_used_body_part_id}', verb_id = '{verb_id}', action_verb == '{actor_verb}'."
        
        # result._build(actor_used_body_part_id, target_used_body_part_id, verb_id, actor_verb, is_continuous, actor_verb_present_continuous, target_verb_passive_present_continuous)

        return result
    
    def build_part2_from_json(self, json):
        # TODO: Write code to create connections between locations here, from stored connection strings.
        pass

class Destination(object) :
    def __init__( self , location , exit_text ) :
        self.exit_text = exit_text
        self.target_location = location
