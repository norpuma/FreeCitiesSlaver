class VisualPreferences {
    static PENIS = "PENIS"
    static VULVA = "VULVA"
    static BREASTS = "BREASTS"
    static BUTTOCKS = "BUTTOCKS"
    static FACE = "FACE"
    static BLACK_ETHNICITY = "BLACK_ETHNICITY"
    static WHITE_ETHNICITY = "WHITE_ETHNICITY"
    static LATINX_ETHNICITY = "LATINX_ETHNICITY"
    static BLONDE_HAIR = "BLONDE_HAIR"
    static RED_HAIR = "RED_HAIR"
    static BALD_HEAD = "BALD_HEAD"
    static BUSHY_PUBES = "BUSHY_PUBES"
    static TRIMMED_PUBES = "TRIMMED_PUBES"
    static SHAVEN_PUBES = "SHAVEN_PUBES"
    static FAT = "FAT"
    static SKINNY = "SKINNY"
    static TALL = "TALL"
    static SHORT = "SHORT"
    static TEENAGER = "TEENAGER"
    static YOUNG_ADULT = "YOUNG_ADULT"
    static ADULT = "ADULT"
    static MATURE_ADULT = "MATURE_ADULT"
    static ELDER = "ELDER"
    static OLDER = "OLDER"
    static YOUNGER = "YOUNGER"
}

class MainPleasureCategories {
    static MATERIALISTIC = "MATERIALISTIC" // lasting material ownership: bags, dresses, earrings, necklaces, rings, bracelets, shoes, watches, suites, cars, houses
    static HEDONISTIC = "HEDONISTIC" // fleeting pleasure: flowers, chocolates, wines, perfumes, spa days, concert tickets, expensive dates, trips
    static VANITY = "VANITY" // spirit boosting: flattery, victories, devotion, worship, sacrifices of time, sacrifices of wealth, fame, status
}

class TastePresets {
    static ZEROES = "ZEROES"
    static DEFAULT = "DEFAULT"
    static VULGAR = "VULGAR"
    static SIMPLE = "SIMPLE"
    static NERDY = "NERDY"
    static EXPENSIVE = "EXPENSIVE"
    static SOPHISTICATED = "SOPHISTICATED"
}

class SmallTalkTopics {
    // Filler Topics - Safe and Unpersonal
    static THE_NEWS = "THE_NEWS"
    static THE_WEATHER = "THE_WEATHER"
    // Opinion Topics
    // Exploratory Personal Topics
    // Dissertation Subjects
}

class UnpersonalUncategorizedConversationTopics {
    // Safe Topics
    static THE_NEWS = "THE_NEWS"
    static THE_WEATHER = "THE_WEATHER"
    // Strictly Taste Topics
    static CARS  = "CARS"
    static PETS = "PETS"
    static TRAVELING = "TRAVELING"
    static GASTRONOMY = "GASTRONOMY" // Fine Wines, Cheeses
    static ELECTRONICS = "ELECTRONICS" // phones, computers, etc
    // Dissertation Topics
    static CELEBRITY_GOSSIP = "CELEBRITY_GOSSIP"
    static FINE_ARTS = "FINE_ARTS" // Paintings, Theater, Literature, Movies
    static POLITICS = "POLITICS"
    static MONEY = "MONEY"
    static PEOPLE = "PEOPLE" // People in general. Commonly a measure of Sociability.
    static LOCAL_RUMORS = "LOCAL_RUMORS"
    static LOCAL_GOSSIP = "LOCAL_GOSSIP"
}

class ConversationTopicsCategories {
    static SPORTS = "SPORTS"
    static MUSIC = "MUSIC"
    static FASHION = "FASHION"
    static HOBBIES = "HOBBIES"
    static SOCIAL_ACTIVITIES = "SOCIAL_ACTIVITIES"
    static LOCATIONS = "LOCATIONS"
}

// Fashion: Pants, Skirts, Dresses, Shoes, Bags, Jewelry, Makeup
// Outfits: Sexy, conservative, professional, revealing, sensual, provocative, skimpy
// Hobbies: Videogames, playing music, writing, hiking, reading, swimming, singing, painting, shopping, dancing
// Art: Playing music, dancing, writing, singing, painting
// Sports: Gymnastics, hiking, swimming, running, volleyball, gym
// Colors: white, black, yellow, red, green, blue, purple, orange, pink
// Food: Chocolates, fish, fruits, steak, salad, burgers
// Drinks: Juice, wine, sake, beer, whisky
// Entertainment: TV, movies, music, concerts, plays, books/literature
// Music: heavy metal, classical music, jazz, punk, pop
// Interactions: Working, small talk, flirting
// Days: Weekends, Mondays, Fridays
// Social Activities: Concerts, Movies, Staying Home, Parties, Hiking, Running, Beach, Dinner
// Locations: Mall, Beach, Café, Restaurant, Home
// Overall Topics: Food, Fashion, Art, Sports, Music + Hobbies, Drinks, Colors, Social Activities, Days, Locations
// Treats: Chocolates, flowers, fashion, massages, spa day, date, dinner


// Stranger
// Distant Acquaintance
// Close Acquaintance
// Friendly Acquaintance
// Friend
// Confidante

class GiftsPreferences {}

class TopicsPreferences {}

class CharacterPreferences extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.confidenceElements = new ApprovalEvaluation() // Pride and shame elements
        this.respectElements = new ApprovalEvaluationHierarchy()
        this.smallTalkPreferences = new ApprovalEvaluation()
        this.friendshipPreferences = new ApprovalEvaluation()
        this.giftsPreferences = new ApprovalEvaluation()
        this.flirtingPreferences = new ApprovalEvaluation()
        this.dominancePreferences = new ApprovalEvaluation()
        this.makingOutPreferences = new ApprovalEvaluation()
        this.sexualPreferences = new ApprovalEvaluation()
    }
}

function generateDefaultFlirtingPreferences(gender, preferencesPreset){
    let preferences = new ApprovalEvaluation()
    if (gender == Gender.FEMALE){
        preferences.addApprovalTrait(ApprovalEvaluation.ADDING_TO_APPROVAL, TraitCategory.BODY, CharacterBodyTraits.FITNESS, new ThresholdEvaluation(TraitIntensity.MODERATELY_LEVEL, TraitIntensity.MODERATELY_LEVEL, true, 10, 1))
        preferences.addApprovalTrait(ApprovalEvaluation.ADDING_TO_APPROVAL, TraitCategory.BODY, CharacterBodyTraits.FACE_ATTRACTIVENESS, new ThresholdEvaluation(FaceProperties.CUTE_LEVEL, FaceProperties.CUTE_LEVEL, true, 10, 1))
        preferences.addApprovalTrait(ApprovalEvaluation.ADDING_TO_APPROVAL, TraitCategory.BODY, CharacterBodyTraits.FACE_ATTRACTIVENESS, new ThresholdEvaluation(FaceProperties.CUTE_LEVEL, FaceProperties.CUTE_LEVEL, true, 10, 1))
    }
    return preferences
}

function generateDefaultSmallTalkProfile(gender, preferencesPreset){
    let preferences = new Map()
    if (gender == Gender.FEMALE){
        switch (preferencesPreset){
            case TastePresets.VULGAR:
                preferences.set(UnpersonalUncategorizedConversationTopics.LOCAL_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(ConversationTopicsCategories.MUSIC, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.CELEBRITY_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.MONEY, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(ConversationTopicsCategories.FASHION, new TraitQualifierAndLevel(PreferenceLevel.TOLERATE, PreferenceLevel.TOLERATE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.FINE_ARTS, new TraitQualifierAndLevel(PreferenceLevel.DESPISE, PreferenceLevel.DESPISE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.GASTRONOMY, new TraitQualifierAndLevel(PreferenceLevel.DISLIKE, PreferenceLevel.DISLIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.POLITICS, new TraitQualifierAndLevel(PreferenceLevel.SCORN, PreferenceLevel.SCORN_LEVEL))
                break
            case TastePresets.SIMPLE:
                preferences.set(UnpersonalUncategorizedConversationTopics.PETS, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.LOCAL_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(ConversationTopicsCategories.MUSIC, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.THE_NEWS, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.THE_WEATHER, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.PEOPLE, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.CELEBRITY_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.TOLERATE, PreferenceLevel.TOLERATE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.POLITICS, new TraitQualifierAndLevel(PreferenceLevel.DESPISE, PreferenceLevel.DESPISE_LEVEL))
                break
            case TastePresets.NERDY:
                preferences.set(UnpersonalUncategorizedConversationTopics.ELECTRONICS, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(ConversationTopicsCategories.MUSIC, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.CARS, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.POLITICS, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.MONEY, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.LOCAL_RUMORS, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.THE_NEWS, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.CELEBRITY_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.TOLERATE, PreferenceLevel.TOLERATE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.TRAVELING, new TraitQualifierAndLevel(PreferenceLevel.TOLERATE, PreferenceLevel.TOLERATE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.PEOPLE, new TraitQualifierAndLevel(PreferenceLevel.DESPISE, PreferenceLevel.DESPISE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.LOCAL_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.DESPISE, PreferenceLevel.DESPISE_LEVEL))
                break
            case TastePresets.EXPENSIVE:
                preferences.set(UnpersonalUncategorizedConversationTopics.CARS, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.PETS, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.MONEY, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.ELECTRONICS, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.TRAVELING, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.GASTRONOMY, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(ConversationTopicsCategories.MUSIC, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.LOCAL_RUMORS, new TraitQualifierAndLevel(PreferenceLevel.TOLERATE, PreferenceLevel.TOLERATE_LEVEL))
                break
            case TastePresets.SOPHISTICATED:
                preferences.set(UnpersonalUncategorizedConversationTopics.GASTRONOMY, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.FINE_ARTS, new TraitQualifierAndLevel(PreferenceLevel.CHERISH, PreferenceLevel.CHERISH_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.TRAVELING, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.POLITICS, new TraitQualifierAndLevel(PreferenceLevel.LIKE, PreferenceLevel.LIKE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.MONEY, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.PEOPLE, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(ConversationTopicsCategories.MUSIC, new TraitQualifierAndLevel(PreferenceLevel.ENJOY, PreferenceLevel.ENJOY_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.LOCAL_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.DESPISE, PreferenceLevel.DESPISE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.LOCAL_RUMORS, new TraitQualifierAndLevel(PreferenceLevel.DESPISE, PreferenceLevel.DESPISE_LEVEL))
                preferences.set(UnpersonalUncategorizedConversationTopics.CELEBRITY_GOSSIP, new TraitQualifierAndLevel(PreferenceLevel.SCORN, PreferenceLevel.SCORN_LEVEL))
                break
        }
    }
    return preferences
}

function getTopicAppreciation(smallTalkProfile, conversationTopic){
    let appreciation = smallTalkProfile.get(conversationTopic)
    if (appreciation !== undefined){
        return appreciation
    } else {
        return new TraitQualifierAndLevel(PreferenceLevel.IGNORE, PreferenceLevel.IGNORE_LEVEL)
    }
}

function checkPreferenceAlignment(preferences, preferenceTopic, opinion){
    let appreciation = preferences.get(preferenceTopic)
    let difference = Math.abs(appreciation.levelNumber - opinion.levelNumber)
    if (difference == 0){
        return TraitIntensity.SIGNIFICANTLY_LEVEL
    } else if (difference >= 3){
        return TraitIntensity.NOT_LEVEL
    } else {
        return TraitIntensity.MODERATELY_LEVEL
    }
}

// Timid Nerd:
// - Pride: Knowledge
// - Shame: Fitness
// - Shame: Charm
// - Shame: Appearance
// - Respects: Knowledge, Fitness, Status, Influence, Confidence
// - Disrespects: Appearance, Flattery, Violence
// - Small Talk Likes: Knowledge, Charm, Appearance, Generosity, Good Listener, Flattery
// - Small Talk Dislikes: Boasting, Appearance
// - Flirting:
//    -- likedTraits: Fit (Mildly+), Attractive Face (Mildly+), Charming (Mildly+), Entertaining (Mildly+), Good Listener (Mildly+), Dangerous (Mildly+).
//    -- dislikedTraits: Offensive (Mildly+), Boasting (Mildly+), Fit (Insignificantly-), Charming (Insignificantly-).
//    -- likedActions: Flattery, Demonstration of Confidence, Demonstration of Strength, Dancing, Entertaining Conversation.
// - Making out:
//    -- likedTraits: Courting Satisfaction, Fit (Mildly+), Attractive Face (Mildly+), Charming (Mildly+), Dangerous (Mildly+).
//    -- dislikedTraits: Bald, Fat, Short.
//    -- likedActions: Kissing Mouth (actor or target), Kissing Throat (target), Caressing Breasts (target), Caressing Butt (actor or target), Caressing Back (target), Body Plastering (target), Sexual Boasting (target).
//    -- satsifactionRequirementsActions: Kissing Mouth.
//    -- unacceptableActions: Any Instrument + Any Verb + Crotch, Any Instrument + Kissing Breasts, Disrobing.
// - Courting:
//    -- likedTraits: Fit (Mildly+), Attractive Face (Mildly+), Charming (Mildly+), Entertaining (Mildly+), Good Listener (Mildly+), Rich, Famous, Generous, Romantic, Dating Satisfaction.
//    -- dislikedTraits: Offensive (Mildly+), Boasting (Mildly+), Fit (Insignificantly-), Charming (Insignificantly-), Dangerous.
//    -- likedActions: Flattery, Demonstration of Confidence, Demonstration of Strength, Dancing, Entertaining Conversation, Demonstration of Generousness, Gifts, Servant Satisfaction, Service Provider Satisfaction, Demonstrations of Romanticism, Intimacy, Safety/Protection, Exclusivity, Schedule Date, Massage (non-sexual) (target).
//    -- satsifactionRequirementsActions: Intimacy, Trust, Exclusivity.
//    -- unacceptableActions: Violence.
// - Sex:
//    -- likedTraits: Fit (Mildly+), Attractive Face (Mildly+), Flattering (Moderately+), Big Breasts, Teenager or Young Adult.
//    -- dislikedTraits: Breasts(Insignificantly-), Pubes (Bush).
//    -- likedActions: Display Naked Breasts (target), Display Naked Vulva (target), Display Naked Butt (target), Flattery (sexual compliment) (target), Fellatio (target), Handjob (target), Finger Vagina (actor), Massage Breasts (actor).
//    -- satsifactionRequirementsActions: None.
//    -- unacceptableActions: Any Instrument + Thrust + Anus.
// - Persecution:
//    -- likedTraits: Fit (Mildly-), Attractive Face (Mildly-), Flattering (Moderately+), Fame (Insignificantly-), Status (Insignificantly-), Confidence(Mildly-).
//    -- dislikedTraits: Fit(Significantly+), Dangerous(Mildly+), Confidence(Significantly+).
//    -- unacceptableActions: Violence.

// Vain Bitch:
// - Pride: 
