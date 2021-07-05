class Character_Relationships(object):
    def __init__(self):
        self.collection = {}
    
    def add(self, relationship):
        self.collection.set(relationship.target, relationship)

class Character_Relationship(object):
    def __init__(self, character_id, target):
        self.character_id = character_id
        self.target = target
        return
