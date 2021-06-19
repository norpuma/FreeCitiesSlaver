init 150 python:
    import PowerPlayFramework.Characters.PersonalityPy as personality

label Characters__Interactions__Introductions__Polite:
    if target.status.mood.calm <= -2:
        $ msg = "{0} seems too angry to approach. You should probably try again at another time.".format(target.pronouns["subject"].capitalize())
        "[msg]"
        return

    $ greeting = random.choice(["Hello!", "Hi!", "Hey!"])
    $ polite_introduction = " My name is {0} {1}, {2}. It's nice to meet you!".format(actor.names.first, actor.names.last, actor.names.standard)
    $ name_request = random.choice(["May i know your name?", "What is your name?", ""])
    $ msg = protagonist.format_say(greeting + polite_introduction, "You say, with a smile.", name_request)
    "[msg]"
    $ target_sentiments = target.relationships[actor.id].sentiments
    $ introduction = "My name is {0} {1}, people call me {2}.".format(target.names.first, target.names.last, target.names.standard)
    if target.status.mood.happiness <= -2:
        $ greeting = random.choice(["Hello!", "Hi!", "Hey!"])
        $ msg = target.format_say(greeting, "{0} greets you, morosely. Something seems to be upsetting, {1}.".format(target.pronouns["subject"].capitalize(), target.pronouns["object"]), "It's...", "{0} lets out a heavy sigh.".format(target.pronouns["subject"]), "It's nice to meet you. " + introduction)
    elif target.status.mood.happiness > 2:
        $ greeting = random.choice(["Hello!", "Hi!", "Hey!"])
        $ msg = target.format_say(greeting, "{0} greets you, with a big smile.".format(target.pronouns["subject"].capitalize()), "It's a pleasure to meet you! " + introduction)
    else:
        $ greeting = random.choice(["Hello!", "Hi!", "Hey!"])
        $ msg = target.format_say(greeting + " " + random.choice(["Nice to meet you too!", "I'm glad to meet you too!", "Nice to meet you! I like your name."]) + " " + introduction)
    "[msg]"
    $ current_interaction.greeting_happened = True
    $ target.relationships[actor.id].apply("RECEIVE_POLITE_INTRODUCTION")
    $ actor.relationships[target.id].apply("ACT_POLITE_INTRODUCTION")
    return

label Characters__Interactions__Friendly__Greet:
    $ action_description = "You offer {0} a friendly greeting.".format(target.names.standard)
    # TODO: Build target's reaction from their feelings.
    $ target_sentiments = target.relationships[actor.id].sentiments
    if target_sentiments.satisfaction < 0:
        $ reaction_description = "{0} doesn't greet you back, just giving you the cold shoulder. {1} seems upset with you.".format(target.names.standard, target.pronouns["subject"].capitalize())
    elif target.status.mood.calm < -1 and target_sentiments.love < (-1 * target.status.mood.calm):
        $ reaction_description = "{0} almost snarls at you when she hears your greeting. {1} seems pretty angry, although not with you.".format(target.names.standard, target.pronouns["subject"].capitalize())
    elif target.status.mood.happiness < -1:
        $ reaction_description = "{0} looks at you with a trembling lip and red eyes. {1} looks like {2} is pretty melancholy.".format(target.names.standard, target.pronouns["subject"].capitalize(), target.pronouns["subject"])
    elif target_sentiments.satisfaction > 3 and target.status.mood.happiness > 1:
        $ reaction_description = "{0} greets you with a big smile. {1} is delighted at seeing you!".format(target.names.standard, target.pronouns["subject"].capitalize())
    elif target.status.mood.happiness > 2:
        $ reaction_description = "{0} greets you happily.".format(target.pronouns["subject"].capitalize())
    else:
        $ reaction_description = "{0} greets you back.".format(target.pronouns["subject"].capitalize())
    $ msg = action_description + "\n\n" + reaction_description
    $ current_interaction.greeting_happened = True
    "[msg]"
    return

label Characters__Interactions__Friendly:
    $ msg = "What kind of friendly interaction do you want to take with '{0} {1}'?".format(target.names.standard, target.names.last)
    "{color=#ff7f50}[msg]{/color}"
    python:
        entries = []
        if len(current_interaction.remaining_small_talk_topics) > 0:
            entries.append(("Chat.", "CHAT"))
        entries.append(("Compliment.", "COMPLIMENT"))
        entries.append(("Ask about mood.", "ASK_MOOD"))
        entries.append(("End friendly interactions.", "DONE"))
    $ selection = renpy.display_menu(entries)
    if selection == "CHAT":
        $ renpy.call("Characters__Interactions__Friendly__Chat")
        call Characters__Interactions__Friendly
    elif selection == "COMPLIMENT":
        $ renpy.call("Characters__Interactions__Friendly__Compliment")
        call Characters__Interactions__Friendly
    elif selection == "ASK_MOOD":
        $ renpy.call("Characters__Interactions__Friendly__Ask_Mood")
        call Characters__Interactions__Friendly
    return

label Characters__Interactions__Friendly__Chat:
    $ msg = "What topic do you want to chat about?"
    "{color=#ff7f50}[msg]{/color}"
    python:
        entries = []
        for interest in current_interaction.remaining_small_talk_topics:
            interest_entry = interest.lower().capitalize()
            entries.append((interest_entry, interest_entry))
    $ selection = renpy.display_menu(entries)
    $ topics_key = selection.upper()
    $ current_interaction.remaining_small_talk_topics.remove(selection.upper())

    $ action_description = "You chat with {0} about '{1}' for a little while.".format(target.names.standard, selection.lower())
    if topics_key not in target.personality.interests.interests.keys():
        $ reaction_description = "{0} appreciates your efforts, but is not very interested in the subject.".format(target.pronouns["subject"].capitalize())
    elif target.personality.interests.interests[topics_key] <= -1:
        $ reaction_description = "{0} makes a grimace. The subject doesn't seem to please {1}.".format(target.pronouns["subject"].capitalize(), target.pronouns["object"])
        $ target.status.mood.happiness -= 1
        $ target.status.mood.calm -= 1
    elif target.personality.interests.interests[topics_key] <= 2:
        $ reaction_description = "{0} smiles and actively participates in the conversation. {0} is happy that you have talked about this.".format(target.pronouns["subject"].capitalize())
        $ target.status.mood.happiness += 1
        $ target.status.mood.calm += 1
    else: # target.personality.interests.interests[topics_key] >= 3:
        $ reaction_description = "{0} is very enthusiastic when talking. {0} seems this to love this subject.".format(target.pronouns["subject"].capitalize())
        $ target.status.mood.happiness += 2
        $ target.status.mood.calm += 1

    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Friendly__Compliment:
    $ action_description = "You offer {0} a compliment.".format(target.names.standard)
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} smiles in appreciation of your kind words.".format(target.pronouns["subject"].capitalize())
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return

label Characters__Interactions__Friendly__Ask_Mood:
    $ action_description = "You ask {0} how {1} is feeling.".format(target.names.standard, target.pronouns["subject"])
    # TODO: Build target's reaction from their feelings.
    $ reaction_description = "{0} tells you {1} is feeling okay.".format(target.pronouns["subject"].capitalize(), target.pronouns["subject"])
    $ msg = action_description + "\n\n" + reaction_description
    "[msg]"
    return
