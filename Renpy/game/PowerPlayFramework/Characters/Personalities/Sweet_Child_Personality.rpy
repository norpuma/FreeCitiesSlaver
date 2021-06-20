# init 1300 python:
#     def wild_titles(the_person):
#         return the_person.name
#     def wild_possessive_titles(the_person):
#         return wild_titles(the_person)
#     def wild_player_titles(the_person):
#         return protagonist.name

#     wild_personality = Personality("wild", #Stephanie style personality
#     common_likes = ["skirts", "small talk", "Fridays", "the weekend", "the colour red", "makeup", "flirting", "marketing work","heavy metal","punk"],
#     common_sexy_likes = ["anal creampies", "doggy style sex", "giving blowjobs", "getting head", "anal sex", "public sex", "skimpy outfits", "showing her tits", "showing her ass", "taking control", "not wearing underwear", "creampies", "bareback sex"],
#     common_dislikes = ["Mondays", "the colour pink", "supply work", "conservative outfits", "work uniforms"],
#     common_sexy_dislikes = ["being submissive", "being fingered", "missionary style sex", "giving handjobs"],
#     titles_function = wild_titles, possessive_titles_function = wild_possessive_titles, player_titles_function = wild_player_titles,
#     insta_chance = 40, dikdok_chance = 30)

#     collection_of_personalities.set("wild_personality", wild_personality)

#     def sweet_child_titles(the_person):
#         return the_person.name
#     def sweet_child_possessive_titles(the_person):
#         return sweet_child_titles(the_person)
#     def sweet_child_player_titles(the_person):
#         return protagonist.name

#     sweet_child_personality = Personality("sweet_child_personality",
#     common_likes = ["pets", "local gossip", "music", "people", "celebrity gossip"],
#     common_sexy_likes = ["anal creampies", "doggy style sex", "giving blowjobs", "getting head", "anal sex", "public sex", "skimpy outfits", "showing her tits", "showing her ass", "taking control", "not wearing underwear", "creampies", "bareback sex"],
#     common_dislikes = ["the news", "the weather", "politics"],
#     common_sexy_dislikes = ["being submissive", "being fingered", "missionary style sex", "giving handjobs"],
#     titles_function = sweet_child_titles, possessive_titles_function = sweet_child_possessive_titles, player_titles_function = sweet_child_player_titles
#     )
#     sweet_child_personality.integrity = 2 # How easy it is to change that character's opinion.
#     sweet_child_personality.obedience = 3 # How obedient this character is when pressed.
#     sweet_child_personality.liberated = -1 # SLIGHTLY_REPRESSED # How sexually liberated this character is.
#     sweet_child_personality.empathy = 2 # CARING # How much this character cares about others.
#     sweet_child_personality.pride = 0 # MODEST
#     sweet_child_personality.dutifulness = -1 # SLIGHTLY_INDOLENT_LEVEL
#     sweet_child_personality.slave_role = 0
#     sweet_child_personality.libido = 2
#     sweet_child_personality.modesty = 2
#     sweet_child_personality.courage = 0 # CAUTIOUS

#     sweet_child_personality.submission = 2
#     sweet_child_personality.sociability = 2 # EXPANSIVE
#     sweet_child_personality.morality = 2 # FAIRLY_UPRIGHT

#     sweet_child_personality.smugness = 0 # PrideLevels.MODEST
#     sweet_child_personality.niceness = 2 # NicenessLevels.SWEET
#     sweet_child_personality.sociability = 2 # EXPANSIVE
#     sweet_child_personality.irascibleThreshold = 3 # IrascibleThresholdLevels.IRASCIBLE
#     sweet_child_personality.melancholyThreshold = 3 # MelancholyThresholdLevels.MELANCHOLY
#     sweet_child_personality.flirtiness = 0 # FlirtinessLevels.DISCREET
#     sweet_child_personality.decorum = 2 # DecorumLevels.UNCONCERNED
#     sweet_child_personality.diligence = -1 # SLIGHTLY_INDOLENT_LEVEL
#     sweet_child_personality.bravery = 0 # CourageLevels.CAUTIOUS

#     sweet_child_personality.preferences.main_pleasure_category = "HEDONISTIC" # MainPleasureCategories.HEDONISTIC # fleeting pleasure: flowers, chocolates, wines, perfumes, spa days, concert tickets, expensive dates, trips
#     sweet_child_personality.preferences.taste_profile = "SIMPLE" # TastePresets.SIMPLE

#     sweet_child_personality.sexual_experience = -2 # MOSTLY_INNOCENT
#     sweet_child_personality.sexual_interest = -1 # DISINTERESTED
#     # TODO: sweet_child_personality.sexuality = Character_Sexuality.generate_random(gender)

#     collection_of_personalities.set("sweet_child_personality", sweet_child_personality)

#     class Sweet_Child_Template(renpy.store.object):
#         def __init__(self):
#             return
