init -2 python:
    collection_of_personalities = {}

    class Character_Preferences(renpy.store.object):
        def __init__(self):
            return
    
    class Character_Preference(renpy.store.object):
        def __init__(self, personality_type_prefix, default_prefix = None,
            common_likes = None, common_dislikes = None, common_sexy_likes = None, common_sexy_dislikes = None,
            titles_function = None, possessive_titles_function = None, player_titles_function = None):

            self.liked = 0 # 5 to 0 to -5 ranging from INTENSELY LIKED to INTENSELY DISLIKED.
            self.arousing = 0 # 5 to 0 to -5 ranging from INTENSELY AROUSING to INTENSELY DISGUSTING.
            self.reassuring = 0 # 5 to 0 ranging from INTENSELY REASSURING to NOT REASSURING.
            self.embarrassing = 0 # 0 to -5 ranging from NOT EMBARRASSING to INTENSELY EMBARRASSING.
            self.humiliating = 0 # 0 to -5 ranging from NOT HUMILIATING to INTENSELY HUMILIATING.
            self.moral = 0 # 5 to 0 ranging from INTENSELY MORAL to INTENSELY IMMORAL.
            self.pleasurable = 0 # 5 to 0 ranging from INTENSELY PLEASURABLE to NOT PLEASURABLE.
            self.painful = 0 # 0 to -5 ranging from NOT PAINFUL to INTENSELY PAINFUL.
            self.fun = 0 # 5 to 0 to -5 ranging from INTENSELY FUN to INTENSELY BORING.

            self.is_taboo = False
            self.is_kink = False
            self.is_dehumanizing = False

            self.romantic_feelings = 0 # 0 to 5
            self.arousal = 0 # 0 to 5
            self.intimacy = 0 # 0 to 5
            self.trust = 0 # 0 to 5
            return

    class Character_Personality(renpy.store.object):
        def __init__(self):
            self.integrity = 0 # How easy it is to change that character's opinion.
            self.obedience = 0 # How obedient this character is when pressed.
            self.liberated = 0 # How sexually liberated this character is.
            self.empathy = 0 # How much this character cares about others.
            self.pride = 0
            self.dutifulness = 0
            self.slave_role = 0
            self.libido = 0
            self.modesty = 0
            self.courage = 0


            # TODO: From LabRats2
            # These are the labels we will be trying to get our dialogue. If the labels do not exist we will get their defaults instead. A default should _always_ exist, if it does not our debug check will produce an error.
            # self.response_label_ending = ["greetings",
            # "sex_responses_foreplay", "sex_responses_oral", "sex_responses_vaginal", "sex_responses_anal",
            # "climax_responses_foreplay", "climax_responses_oral", "climax_responses_vaginal", "climax_responses_anal",
            # "clothing_accept", "clothing_reject", "clothing_review",
            # "strip_reject", "strip_obedience_accept", "grope_body_reject", "sex_accept", "sex_obedience_accept", "sex_gentle_reject", "sex_angry_reject",
            # "seduction_response", "seduction_accept_crowded", "seduction_accept_alone", "seduction_refuse",
            # "flirt_response", "flirt_response_low", "flirt_response_mid", "flirt_response_high", "flirt_response_girlfriend", "flirt_response_affair", "flirt_response_text",
            # "condom_demand", "condom_ask", "condom_bareback_ask", "condom_bareback_demand",
            # "cum_face", "cum_mouth", "cum_pullout", "cum_condom", "cum_vagina", "cum_anal", "surprised_exclaim", "talk_busy",
            # "improved_serum_unlock", "sex_strip", "sex_watch", "being_watched", "work_enter_greeting", "date_seduction", "sex_end_early", "sex_take_control", "sex_beg_finish", "sex_review" ,"introduction",
            # "kissing_taboo_break", "touching_body_taboo_break", "touching_penis_taboo_break", "touching_vagina_taboo_break", "sucking_cock_taboo_break", "licking_pussy_taboo_break", "vaginal_sex_taboo_break", "anal_sex_taboo_break",
            # "condomless_sex_taboo_break", "underwear_nudity_taboo_break", "bare_tits_taboo_break", "bare_pussy_taboo_break",
            # "facial_cum_taboo_break", "mouth_cum_taboo_break", "body_cum_taboo_break", "creampie_taboo_break", "anal_creampie_taboo_break"]

            # self.response_dict = {}
            # for ending in self.response_label_ending:
            #     if renpy.has_label(self.personality_type_prefix + "_" + ending):
            #         self.response_dict[ending] = self.personality_type_prefix + "_" + ending
            #     elif default_prefix is not None: #A default is used when one personality is similar to anouther and has only specific responses overwritten (ex. Stephanie is a modified wild personality).
            #         self.response_dict[ending] = self.default_prefix + "_" + ending
            #     else:
            #         self.response_dict[ending] = "relaxed_" + ending #If nothing is given we assume we don't want to crash and we should put in some sort of value.

            #Establish our four classes of favoured likes and dislikes. Intensity (ie. love vs like, dislike vs hate) is decided on a person to person basis.
            if common_likes:
                self.common_likes = common_likes
            else:
                self.common_likes = []

            if common_sexy_likes:
                self.common_sexy_likes = common_sexy_likes
            else:
                self.common_sexy_likes = []

            if common_dislikes:
                self.common_dislikes = common_dislikes
            else:
                self.common_dislikes = []

            if common_sexy_dislikes:
                self.common_sexy_dislikes = common_sexy_dislikes
            else:
                self.common_sexy_dislikes = []
            return

    # Things to have opinions on:
    opinionable_topics = {}

    # TODO: From LabRats2
    # Regular opinions _usually_ add a bit of bonus happiness, but some may influence some options or effects.
    # opinions_list = [] #A master list of things a character might like or dislike. Should always be named so it fits the framework "Likes X" or "Dislikes X". Personalities have a unique list that they always draw from as well
    # opinions_list.append("skirts")
    # opinions_list.append("pants")
    # opinions_list.append("small talk") #Has gameplay effect.
    # opinions_list.append("Mondays") #Has gameplay effect
    # opinions_list.append("Fridays") #Has gameplay effect
    # opinions_list.append("the weekend") #Has gameplay effect
    # opinions_list.append("working") #Has gameplay effect
    # opinions_list.append("the colour blue")
    # opinions_list.append("the colour yellow")
    # opinions_list.append("the colour red")
    # opinions_list.append("the colour pink")
    # opinions_list.append("the colour black")
    # opinions_list.append("heavy metal")
    # opinions_list.append("jazz")
    # opinions_list.append("punk")
    # opinions_list.append("classical")
    # opinions_list.append("pop")
    # opinions_list.append("conservative outfits") #Has gameplay effect
    # opinions_list.append("work uniforms") #Has gameplay effect
    # opinions_list.append("research work") #Has gameplay effect
    # opinions_list.append("marketing work") #Has gameplay effect
    # opinions_list.append("HR work") #Has gameplay effect
    # opinions_list.append("supply work") #Has gameplay effect
    # opinions_list.append("production work") #Has gameplay effect
    # opinions_list.append("makeup")
    # opinions_list.append("flirting") #Has gameplay effect
    # opinions_list.append("sports") #Has gameplay effect
    # opinions_list.append("hiking") #Hsa gameplay effect

    # Sexy opinions _usually_ add a bit of bonus sluttiness, but some may influence some sex scenes, make some approaches more likely, or have other effects.
    # sexy_opinions_list = [] #Another list of opinions, but these ones are sex/kink related and probably shoudn't be brought up in polite conversation.
    # sexy_opinions_list.append("doggy style sex") #Has gameplay effect
    # sexy_opinions_list.append("missionary style sex") #Has gameplay effect
    # sexy_opinions_list.append("sex standing up") #Has gameplay effect
    # sexy_opinions_list.append("giving blowjobs") #Has gameplay effect
    # sexy_opinions_list.append("getting head") #Has gameplay effect
    # sexy_opinions_list.append("anal sex") #Has gameplay effect
    # sexy_opinions_list.append("vaginal sex") #Has gameplay effect
    # sexy_opinions_list.append("public sex") #Has gameplay effect
    # sexy_opinions_list.append("kissing") #Has gameplay effect
    # sexy_opinions_list.append("lingerie") #Has gameplay effect
    # sexy_opinions_list.append("masturbating") #Has gameplay effect
    # sexy_opinions_list.append("giving handjobs") #Has gameplay effect
    # sexy_opinions_list.append("giving tit fucks") #Has gameplay effect
    # sexy_opinions_list.append("being fingered") #Has gameplay effect
    # sexy_opinions_list.append("skimpy uniforms") #Has gameplay effect
    # sexy_opinions_list.append("skimpy outfits") #Has gameplay effect
    # sexy_opinions_list.append("not wearing underwear") #Has gameplay effect
    # sexy_opinions_list.append("not wearing anything") #Has gameplay effect
    # sexy_opinions_list.append("showing her tits") #Has gameplay effect
    # sexy_opinions_list.append("showing her ass") #Has gameplay effect
    # sexy_opinions_list.append("being submissive") #Has gameplay effect
    # sexy_opinions_list.append("taking control") #Has gameplay effect
    # sexy_opinions_list.append("drinking cum") #Has gameplay effect
    # sexy_opinions_list.append("creampies") #Has gameplay effect
    # sexy_opinions_list.append("cum facials") #Has gameplay effect
    # sexy_opinions_list.append("being covered in cum") #Has gameplay effect
    # sexy_opinions_list.append("bareback sex") #Has gameplay effect.
    # sexy_opinions_list.append("big dicks")
    # sexy_opinions_list.append("cheating on men") #Has gameplay effect
    # sexy_opinions_list.append("anal creampies") #Has gameplay effect
    # sexy_opinions_list.append("incest") #Has gameplay effect
