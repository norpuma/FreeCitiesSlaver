init -2 python:
    class Character_Relationships(renpy.store.object):
        def __init__(self):
            self.collection = {}
        
        def add(self, relationship):
            self.collection.set(relationship.target, relationship)

    class Character_Relationship(renpy.store.object):
        def __init__(self, target):
            self.target = target
            return
