class Character_Relationships(object):
    def __init__(self):
        self.collection = {}
    
    def add(self, relationship):
        self.collection.set(relationship.target, relationship)

class Character_Relationship(object):
    def __init__(self, target):
        self.target = target
        return
