# This class knows character's subsystems (Bodies, Personalities, Relationships, etc.) and knows how to retrieve traits from them.
# Subsystems know this class as an interface with get, check and execute.
# Character_Relationship should know nothing about Character_Personality, but should be able to ask Character_Traits for JEALOUSY and get a value.

class Character_Traits(object):
    def __init__(self, character_id):
        self.character_id = character_id
    
    @classmethod
    def get(cls, character_id, trait):
        return None
    
    @classmethod
    def check(cls, character_id, trait, expression):
        return False
    
    @classmethod
    def execute(cls, character_id, trait, function):
        return False
