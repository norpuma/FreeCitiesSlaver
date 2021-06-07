importScripts("lodash/lodash.js");

class Gender {
    static FEMALE = "FEMALE"
    static MALE = "MALE"
}

var malePronouns = {
    subject: "he",
    object: "him",
    possessive: "his",
    possessivePronouns: "his",
    reflexive: "himself",
}
var femalePronouns = {
    subject: "she",
    object: "her",
    possessive: "her",
    possessivePronouns: "hers",
    reflexive: "herself",
}

class CreationType {
    static AVERAGE = "AVERAGE"
    static RANDOM = "RANDOM"
    static TOTAL_RANDOM = "TOTAL_RANDOM"
    static NORMAL_DISTRIBUTION = "NORMAL_DISTRIBUTION"
    static FAVOR_HOTNESS_DISTRIBUTION = "FAVOR_HOTNESS_DISTRIBUTION"
}

class TraitIntensity {
    static NOT = "NOT"
    static INSIGNIFICANTLY = "INSIGNIFICANTLY"
    static MODERATELY = "MODERATELY"
    static SIGNIFICANTLY = "SIGNIFICANTLY"
    static VERY = "VERY"
    static EXTREMELY = "EXTREMELY"
    static EXCESSIVELY = "EXCESSIVELY"
    static NOT_SCORE = 0
    static INSIGNIFICANTLY_SCORE = 20
    static MODERATELY_SCORE = 40
    static SIGNIFICANTLY_SCORE = 60
    static VERY_SCORE = 80
    static EXTREMELY_SCORE = 100
    static EXCESSIVELY_SCORE = 120
    // TODO: Remove if no longer necessary
    // // Abilities and Qualities have a default value of 0 unless otherwise noted.
    // static NEGATIVELY = 0
    // static INSUFFICIENTLY = 1 // "NOT"; IMPERCEPTIBLY, INSIGNIFICANTLY
    // static SUFFICIENTLY = 2 // "OKAY"; SLIGHTLY, MILDLY
    // static NICELY = 3 // "GOOD"; MODERATELY, INORDINATELY
    // static GREATLY = 4 // "GREAT"; SEVERELY, STRIKINGLY
    // static AMAZINGLY = 5 // "AMAZING"; INTENSELY, EXCEPTIONALLY
    // static EXCESSIVELY = 6
    // static NEGATIVELY_MIN = -999
    // static NEGATIVELY_MAX = -1
    // static INSUFFICIENTLY_MIN = 0
    // static INSUFFICIENTLY_MAX = 19
    // static SUFFICIENTLY_MIN = 20
    // static SUFFICIENTLY_MAX = 39
    // static NICELY_MIN = 40
    // static NICELY_MAX = 59
    // static GREATLY_MIN = 60
    // static GREATLY_MAX = 79
    // static AMAZINGLY_MIN = 80
    // static AMAZINGLY_MAX = 99
    // static EXCESSIVELY_MIN = 100
    // static EXCESSIVELY_MAX = 999
    generateRandomIntensity(distributionStrategy){
        if (distributionStrategy === undefined) distributionStrategy = CreationType.NORMAL_DISTRIBUTION
        if (distributionStrategy == CreationType.TOTAL_RANDOM){
            let random = Math.round(Math.random() * 7)
            switch(random){
                case 0:
                    return TraitIntensity.NOT
                case 1:
                    return TraitIntensity.INSIGNIFICANTLY
                case 2:
                    return TraitIntensity.MODERATELY
                case 3:
                    return TraitIntensity.SIGNIFICANTLY
                case 4:
                    return TraitIntensity.VERY
                case 5:
                    return TraitIntensity.EXTREMELY
                case 6:
                    return TraitIntensity.EXCESSIVELY
            }
        } else { // if (distributionStrategy == CreationType.NORMAL_DISTRIBUTION) { OR // if (distributionStrategy == CreationType.FAVOR_HOTNESS_DISTRIBUTION) {
            let random = Math.round(Math.random() * 100)
            if (random < 2) { // 2%
                return TraitIntensity.NOT
            } else if (random < 20) { // 18%
                return TraitIntensity.INSIGNIFICANTLY
            } else if (random < 60) { // 40%
                return TraitIntensity.MODERATELY
            } else if (random < 80) { // 20%
                return TraitIntensity.SIGNIFICANTLY
            } else if (random < 91) { // 11%
                return TraitIntensity.VERY
            } else if (random < 98) { // 7%
                return TraitIntensity.EXTREMELY
            } else if (random < 10) { // 2%
                return TraitIntensity.EXCESSIVELY
            }
        }
    }
}

class EffectLevel {
    static DEFAULT_THRESHOLD = 120
    static INNEFFECTIVE = "INNEFFECTIVE"
    static VERY_WEAK = "VERY_WEAK"
    static WEAK = "WEAK"
    static ADEQUATE = "ADEQUATE"
    static STRONG = "STRONG"
    static INTENSE = "INTENSE"
    static EXTREME = "EXTREME"
    static ABSOLUTE  = "ABSOLUTE"
    static INNEFFECTIVE_SCORE = 0
    static VERY_WEAK_SCORE = 10
    static WEAK_SCORE = 30
    static ADEQUATE_SCORE = 40
    static STRONG_SCORE = 50
    static INTENSE_SCORE = 60
    static EXTREME_SCORE = 90
    static ABSOLUTE_SCORE = 120
    static levelFromScore(score){
        switch(score){
            case EffectLevel.INNEFFECTIVE_SCORE:
                return EffectLevel.INNEFFECTIVE
            case EffectLevel.VERY_WEAK_SCORE:
                return EffectLevel.WEAK
            case EffectLevel.WEAK_SCORE:
                return EffectLevel.WEAK
            case EffectLevel.ADEQUATE_SCORE:
                return EffectLevel.ADEQUATE
            case EffectLevel.STRONG_SCORE:
                return EffectLevel.STRONG
            case EffectLevel.INTENSE_SCORE:
                return EffectLevel.INTENSE
            case EffectLevel.EXTREME_SCORE:
                return EffectLevel.EXTREME
            case EffectLevel.ABSOLUTE_SCORE:
                return EffectLevel.ABSOLUTE
            default:
                throw "ERROR: Cannot convert score '" + score + "' to an EffectLevel."
        }
    }
    static scoreFromLevel(level){
        switch(level){
            case EffectLevel.INNEFFECTIVE:
                return EffectLevel.INNEFFECTIVE_SCORE
            case EffectLevel.VERY_WEAK:
                return EffectLevel.VERY_WEAK_SCORE
            case EffectLevel.WEAK:
                return EffectLevel.WEAK_SCORE
            case EffectLevel.ADEQUATE:
                return EffectLevel.ADEQUATE_SCORE
            case EffectLevel.STRONG:
                return EffectLevel.STRONG_SCORE
            case EffectLevel.INTENSE:
                return EffectLevel.INTENSE_SCORE
            case EffectLevel.EXTREME:
                return EffectLevel.EXTREME_SCORE
            case EffectLevel.ABSOLUTE:
                return EffectLevel.ABSOLUTE_SCORE
            default:
                throw "ERROR: Cannot convert score '" + score + "' to an EffectLevel."
        }
    }
}

class PreferenceLevel {
    static LOVE = "LOVE"
    static CHERISH = "CHERISH"
    static LIKE = "LIKE"
    static ENJOY = "ENJOY"
    static ACCEPT = "ACCEPT"
    static IGNORE = "IGNORE"
    static TOLERATE = "TOLERATE"
    static DESPISE = "DESPISE"
    static DISLIKE = "DISLIKE"
    static SCORN = "SCORN"
    static HATE = "HATE"
    static LOVE_SCORE = 50
    static CHERISH_SCORE = 40
    static LIKE_SCORE = 30
    static ENJOY_SCORE = 20
    static ACCEPT_SCORE = 10
    static IGNORE_SCORE = 0
    static TOLERATE_SCORE = -10
    static DESPISE_SCORE = -20
    static DISLIKE_SCORE = -30
    static SCORN_SCORE = -40
    static HATE_SCORE = -50
}

class CharacterTraitEvaluation extends SugarcubeSerializableObject {
    constructor(characterTrait, mustExceed, valueLimit, weight, evaluationFunction){
        super()
        this.characterTrait = characterTrait // A Trait. This is often a CharacterBodyTrait, a CharacterAttitudeTrait or a RelationshipHistoryTrait.
        this.mustExceed = mustExceed // This indicates if the trait must exceed a given score for the weight to be counted. If this is False, the weight is returned if the value is UNDER the limit.
        this.valueLimit = valueLimit // This is the limit of the trait. This will often be a value from TraitIntensity SCORE values.
        this.weight = weight // This is a value to be returned when the Trait is positively evaluated.
        this.evaluationFunction = evaluationFunction // This is a function used to evaluate the trait.
    }

}

class CharacterNames extends SugarcubeSerializableObject {
    constructor(standardName, standardPossessive){
        super()
        this.standard = standardName
        if (standardPossessive !== undefined){
            this.standardPossessive = standardPossessive
        } else {
            this.standardPossessive = standardName + "'s"
        }
        this.first = this.standard
        this.firstPossessive = this.standardPossessive
        this.last = ""
        // honey, hun, sweetie, sugar, darling, dear, baby, sweetheart, lover, doll, babe, lover-boy, my love, cutie, beautiful, kid, kiddo, girlie, sweetness, princess.
        this.affectionateNames = []
        this.privateNames = []
        // dirtbag, asswipe, motherfucker, scum, degenerate, pig, pervert
        // bitch, cunt, 
        this.offensiveNames = []
        this.teasingNames = []
        // sir, master, madam
        this.respectfulNames = []
        //# master, boss, goddess, my queen, princess
        this.superiorNames = []
    }
    setName(kind, newName, newNamesPossessive){
        this.set(kind, newName)
        if (newNamesPossessive !== undefined){
            this.set(kind + "Possessive", newNamesPossessive)
        } else {
            if (newName != ""){
                this(kind + "Possessive", newName + "'s")
            } else {
                this(kind + "Possessive", "")
            }
        }
    }
}

class BaseCharacter extends SugarcubeSerializableObject {
    constructor(name, gender, shouldRegister = true, filePath = "CORE"){
        super()
        this.name = name
        this.names = new CharacterNames(name)
        // UniqueID cannot use random numbers with Sugarcube/Twine due to serialization/deserialization.
        // this.uniqueID = this.name + "_UniqueID_" + Math.floor(Math.random() * 1000000)
        // Filepath is necessary to ensure that game mods don't clash if using the same "name" for a character.
        this.uniqueID = this.name + "_UniqueID_" + filePath
        if (shouldRegister === true){
            this.register()
        }
        this.lastUpdate = new Date(START_DATE.getTime())
        if (gender !== undefined){
            this._setGender(gender)
        }
    }
    toString(){
        return this.uniqueID
    }
    register(){
        State.variables.characters.set(this.uniqueID, this)
    }
    addRelationship(relationship){
        this.relationships[relationship.target] = relationship
    }
    _setGender(maleOrFemale){
        this.gender = maleOrFemale
        if (this.gender == Gender.MALE){
            this.pronouns = malePronouns
        } else {
            this.pronouns = femalePronouns
        }
    }
}

State.variables.characters = new Map()