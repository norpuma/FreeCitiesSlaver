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
    static NOT_LEVEL = 0
    static INSIGNIFICANTLY_LEVEL = 1
    static MODERATELY_LEVEL = 2
    static SIGNIFICANTLY_LEVEL = 3
    static VERY_LEVEL = 4
    static EXTREMELY_LEVEL = 5
    static EXCESSIVELY_LEVEL = 6
    static generateRandomIntensity(distributionStrategy){
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
    static getTraitLevelFromTrait(trait){
        switch(trait){
            case TraitIntensity.NOT:
                return TraitIntensity.NOT_LEVEL
            case TraitIntensity.INSIGNIFICANTLY:
                return TraitIntensity.INSIGNIFICANTLY_LEVEL
            case TraitIntensity.MODERATELY:
                return TraitIntensity.MODERATELY_LEVEL
            case TraitIntensity.SIGNIFICANTLY:
                return TraitIntensity.SIGNIFICANTLY_LEVEL
            case TraitIntensity.VERY:
                return TraitIntensity.VERY_LEVEL
            case TraitIntensity.EXTREMELY:
                return TraitIntensity.EXTREMELY_LEVEL
            case TraitIntensity.EXCESSIVELY:
                return TraitIntensity.EXCESSIVELY_LEVEL
            default:
                throw new Error("Unable to convert Trait '" + trait + "' to a score.")
        }
    }
    static getNameFromLevel(level){
        switch(level){
            case TraitIntensity.NOT_LEVEL:
                return TraitIntensity.NOT
            case TraitIntensity.INSIGNIFICANTLY_LEVEL:
                return TraitIntensity.INSIGNIFICANTLY
            case TraitIntensity.MODERATELY_LEVEL:
                return TraitIntensity.MODERATELY
            case TraitIntensity.SIGNIFICANTLY_LEVEL:
                return TraitIntensity.SIGNIFICANTLY
            case TraitIntensity.VERY_LEVEL:
                return TraitIntensity.VERY
            case TraitIntensity.EXTREMELY_LEVEL:
                return TraitIntensity.EXTREMELY
            case TraitIntensity.EXCESSIVELY_LEVEL:
                return TraitIntensity.EXCESSIVELY
            default:
                throw new Error("ERROR: BodyPartSize.getNameFromLevel: Can't find a name for level '" + level + "'.")
        }
    }
}

class TraitQualifierAndLevel extends SugarcubeSerializableObject {
    constructor(qualifierString, levelNumber){
        super()
        this.qualifierString = qualifierString
        this.levelNumber = levelNumber
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
    static INNEFFECTIVE_LEVEL = 0
    static VERY_WEAK_LEVEL = 1
    static WEAK_LEVEL = 2
    static ADEQUATE_LEVEL = 3
    static STRONG_LEVEL = 4
    static INTENSE_LEVEL = 5
    static EXTREME_LEVEL = 6
    static ABSOLUTE_LEVEL = 7
    static nameFromLevel(level){
        switch(level){
            case EffectLevel.INNEFFECTIVE_LEVEL:
                return EffectLevel.INNEFFECTIVE
            case EffectLevel.VERY_WEAK_LEVEL:
                return EffectLevel.WEAK
            case EffectLevel.WEAK_LEVEL:
                return EffectLevel.WEAK
            case EffectLevel.ADEQUATE_LEVEL:
                return EffectLevel.ADEQUATE
            case EffectLevel.STRONG_LEVEL:
                return EffectLevel.STRONG
            case EffectLevel.INTENSE_LEVEL:
                return EffectLevel.INTENSE
            case EffectLevel.EXTREME_LEVEL:
                return EffectLevel.EXTREME
            case EffectLevel.ABSOLUTE_LEVEL:
                return EffectLevel.ABSOLUTE
            default:
                throw "ERROR: Cannot convert level '" + level + "' to an EffectLevel."
        }
    }
    static scoreFromName(name){
        switch(name){
            case EffectLevel.INNEFFECTIVE:
                return EffectLevel.INNEFFECTIVE_LEVEL
            case EffectLevel.VERY_WEAK:
                return EffectLevel.VERY_WEAK_LEVEL
            case EffectLevel.WEAK:
                return EffectLevel.WEAK_LEVEL
            case EffectLevel.ADEQUATE:
                return EffectLevel.ADEQUATE_LEVEL
            case EffectLevel.STRONG:
                return EffectLevel.STRONG_LEVEL
            case EffectLevel.INTENSE:
                return EffectLevel.INTENSE_LEVEL
            case EffectLevel.EXTREME:
                return EffectLevel.EXTREME_LEVEL
            case EffectLevel.ABSOLUTE:
                return EffectLevel.ABSOLUTE_LEVEL
            default:
                throw "ERROR: Cannot convert name '" + name + "' to an EffectLevel numeric level."
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
    static LOVE_LEVEL = 5
    static CHERISH_LEVEL = 4
    static LIKE_LEVEL = 3
    static ENJOY_LEVEL = 2
    static ACCEPT_LEVEL = 1
    static IGNORE_LEVEL = 0
    static TOLERATE_LEVEL = -1
    static DESPISE_LEVEL = -2
    static DISLIKE_LEVEL = -3
    static SCORN_LEVEL = -4
    static HATE_LEVEL = -5
}

class TraitCategory {
    static BODY = "BODY"
    static PERSONALITY = "PERSONALITY"
    static ATTITUDE = "ATTITUDE"
    static INVESTMENT = "INVESTMENT"
    static HISTORY = "HISTORY"
}

class EvaluatedTraits extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.sceneTraits = new Map() // This is a trait the character believes in for the scene, but they will probably evaluate those at the end of a scene and, possibly, add them to the trustedTraits.
        this.trustedTraits = new Map() // This is a map of Trait Names to Trait Qualifiers and Levels (instances of TraitQualifierAndLevel).
        this.evaluatingTraits = new Map()
        this.trustInEvaluatedTraits = new Map() // This is a collection of trust levels in traits still being evaluated. Trust is between 0.0 and 1.0
    }
    getTrait(traitName){
        let traitQualifierAndLevel = this.sceneTraits.get(traitName)
        if (traitQualifierAndLevel !== undefined){
            return traitQualifierAndLevel
        }
        traitQualifierAndLevel = this.trustedTraits.get(traitName)
        if (traitQualifierAndLevel !== undefined){
            return traitQualifierAndLevel
        }
        traitQualifierAndLevel = this.evaluatingTraits.get(traitName)
        if (traitQualifierAndLevel !== undefined){
            let confidenceLevel = this.trustInEvaluatedTraits.get(traitName)
            if ((confidenceLevel !== undefined) && (confidenceLevel >= 0.5)){
                return traitQualifierAndLevel
            }
        }
        return undefined
    }
    addSceneTrait(traitName, traitQualifierAndLevel, trustLevel){
        let receivedQualifierIsAcceptable = this.addEvaluatingTrait(traitName, traitQualifierAndLevel, trustLevel)
        if (receivedQualifierIsAcceptable == true){
            this.sceneTraits.set(traitName, traitQualifierAndLevel)
        }
    }
    addTrustedTrait(traitName, traitQualifierAndLevel){
        this.trustedTraits.set(traitName, traitQualifierAndLevel)
        if (this.sceneTraits.get(traitName) !== undefined){
            this.sceneTraits.delete(traitName)
        }
        if (this.evaluatingTraits.get(traitName) !== undefined){
            this.evaluatingTraits.delete(traitName)
        }
        if (this.trustInEvaluatedTraits.get(traitName) !== undefined){
            this.trustInEvaluatedTraits.delete(traitName)
        }
    }
    addEvaluatingTrait(traitName, traitQualifierAndLevel, trustLevel){
        let receivedQualifierIsAcceptable = true
        let previouslyEvaluatedTraitQualifierAndLevel = this.evaluatingTraits.get(traitName)
        let adjustedTrust = trustLevel
        if ((previouslyEvaluatedTraitQualifierAndLevel.qualifierString != traitQualifierAndLevel.qualifierString) || (previouslyEvaluatedTraitQualifierAndLevel.levelNumber != traitQualifierAndLevel.levelNumber)){
            adjustedTrust = this.trustInEvaluatedTraits.get(traitName) - trustLevel
            if (adjustedTrust >= 0){
                this.trustInEvaluatedTraits.set(traitName, adjustedTrust)
                receivedQualifierIsAcceptable = false
                return receivedQualifierIsAcceptable
            } else {
                adjustedTrust = Math.abs(adjustedTrust)
            }
        }
        this.evaluatingTraits.set(traitName, confidenceLevel)
        this.trustInEvaluatedTraits.set(traitName, adjustedTrust)
        return receivedQualifierIsAcceptable
    }
    endScene(){
        this.sceneTraits = new Map()
        for (traitName of this.evaluatingTraits.keys()){
            let trust = this.trustInEvaluatedTraits.get(traitName)
            if ((trust === undefined) || (trust <= 0)){
                this.evaluatingTraits.delete(traitName)
                if (this.trustedTraits.get(traitName) !== undefined){
                    this.trustedTraits.delete(traitName)
                }
            } else if (trust >= 1){
                this.trustedTraits.set(traitName, this.evaluatingTraits.get(traitName))
                this.evaluatingTraits.delete(traitName)
            }
        }
    }
}

class ApprovalEvaluation extends SugarcubeSerializableObject {
    static REQUIRED_TO_START = "REQUIRED_TO_START"
    static FORBIDDING_START = "FORBIDDING_START"
    static ADDING_TO_APPROVAL = "ADDING_TO_APPROVAL"
    static SUBTRACTING_FROM_APPROVAL = "SUBTRACTING_FROM_APPROVAL"
    static REQUIRED_TO_PROGRESS = "REQUIRED_TO_PROGRESS"
    static FORBIDDING_PROGRESS = "FORBIDDING_PROGRESS"
    constructor(){
        super()
        this.traits = new Map()
        this.actions = new Map()
        this.traitsRequiredToStart = new Map()
        this.actionsRequiredToStart = new Map()
        this.traitsForbiddingStart = new Map()
        this.actionsForbiddingStart = new Map()
        this.traitsAddingToApproval = new Map()
        this.actionsAddingToApproval = new Map()
        this.traitsSubtractingFromApproval = new Map()
        this.actionsSubtractingFromApproval = new Map()
        this.traitsRequiredToProgress = new Map()
        this.actionsRequiredToProgress = new Map()
        this.traitsForbiddingProgress = new Map()
        this.actionsForbiddingProgress = new Map()
    }
    static getTraitKey(traitCategory, traitName){
        return traitCategory + "|" + traitName
    }
    addApprovalTrait(traitApprovalKind, traitCategory, traitName, thresholdEvaluation){
        let traitKey = ApprovalEvaluation.getTraitKey(traitCategory, traitName)
        let existingCategories = this.traits.get(traitKey)
        switch(traitApprovalKind){
            case ApprovalEvaluation.REQUIRED_TO_START:
                this.traitsRequiredToStart.set(traitKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.FORBIDDING_START:
                this.traitsForbiddingStart.set(traitKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.ADDING_TO_APPROVAL:
                this.traitsForbiddingStart.set(traitKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.SUBTRACTING_FROM_APPROVAL:
                this.traitsForbiddingStart.set(traitKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.REQUIRED_TO_PROGRESS:
                this.traitsForbiddingStart.set(traitKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.FORBIDDING_PROGRESS:
                this.traitsForbiddingStart.set(traitKey, thresholdEvaluation)
                break
            default:
                throw new Error("ERROR: ApprovalEvaluation.addApprovalTrait: Can't find traitApprovalKind '" + traitApprovalKind + "' for traitKey '" + traitKey + "'.")
        }
        if (existingCategories === undefined){
            existingCategories = new Array()
            this.traits.set(traitKey, existingCategories)
        }
        existingCategories.push(traitApprovalKind)
    }
    static getActionKey(actionName){
        return actionName
    }
    addApprovalAction(actionApprovalKind, actionName, thresholdEvaluation){
        let actionKey = ApprovalEvaluation.getActionKey(actionName)
        let existingCategories = this.actions.get(actionKey)
        switch(actionApprovalKind){
            case ApprovalEvaluation.REQUIRED_TO_START:
                this.actionsRequiredToStart.set(actionKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.FORBIDDING_START:
                this.actionsForbiddingStart.set(actionKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.ADDING_TO_APPROVAL:
                this.actionsForbiddingStart.set(actionKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.SUBTRACTING_FROM_APPROVAL:
                this.actionsForbiddingStart.set(actionKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.REQUIRED_TO_PROGRESS:
                this.actionsForbiddingStart.set(actionKey, thresholdEvaluation)
                break
            case ApprovalEvaluation.FORBIDDING_PROGRESS:
                this.actionsForbiddingStart.set(actionKey, thresholdEvaluation)
                break
            default:
                throw new Error("ERROR: ApprovalEvaluation.addApprovalAction: Can't find actionApprovalKind '" + actionApprovalKind + "' for actionKey '" + actionKey + "'.")
        }
        if (existingCategories === undefined){
            existingCategories = new Array()
            this.actions.set(actionKey, existingCategories)
        }
        existingCategories.push(actionApprovalKind)
    }
    evaluate(perspectiveOwner, perspectiveTarget, actionsHistory){
        // TODO: Implement this.
        // This should visit each of the traits in this.traits and retrieve them from the perspectiveTarget (presumably a Relationship.targetModel).
        // Then, find the approvalKinds for the trait in and check each map to get an ThresholdEvaluation object.
        // Evaluate the threshold and get a value to be added to a tally.
        // Repeat the process above for actions, checking actionsHistory instead of perspectiveTarget.
        // Return the tallies for each of the ApprovalKinds (a tally - or score - for required to start, a tally for approval using adding to approval numbers, etc.).
    }
}

class ApprovalEvaluationHierarchy extends SugarcubeSerializableObject {
    static NOT_APPROVED = "NOT_APPROVED"
    static APPROVED = "APPROVED"
    static READY_FOR_UPGRADE = "READY_FOR_UPGRADE"
    static READY_FOR_DOWNGRADE = "READY_FOR_DOWNGRADE"
    constructor(){
        super(level, approvalMinimalThreshold, upgradeLowerThreshold, downgradeUpperThreshold)
        this.level = level
        this.startMinimalThreshold = 0
        this.approvalMinimalThreshold = approvalMinimalThreshold
        this.upgradeLowerThreshold = upgradeLowerThreshold
        this.downgradeUpperThreshold = downgradeUpperThreshold
        this.approvalElements = new ApprovalEvaluation()
        this.approvalFunction = undefined
    }
    evaluate(perspectiveOwner, perspectiveTarget, actionsHistory){
        if (this.approvalFunction !== undefined){
            return this.approvalFunction(perspectiveOwner, perspectiveTarget, actionsHistory)
        }
        // TODO: Implement this.
        // This should look for traits in ApprovalEvaluation
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
        this[kind] = newName
        if (newNamesPossessive !== undefined){
            this[kind + "Possessive"] = newNamesPossessive
        } else {
            if (newName != ""){
                this[kind + "Possessive"] = newName + "'s"
            } else {
                this[kind + "Possessive"] = ""
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