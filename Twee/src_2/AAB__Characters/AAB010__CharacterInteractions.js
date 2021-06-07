class CharacterInteractionMood extends SugarcubeSerializableObject {
    constructor(perspectiveOwner, perspectiveTarget){
        super()
        this.perspectiveOwner = perspectiveOwner
        this.perspectiveTarget = perspectiveTarget
        this._setInitialMood()
    }
    /// This sets the perspectiveOwner's mood by checking if the two characters already have a relation and also using first impressions given by what the perspectiveOwner can immediately perceive from the perspectiveTarget.
    _setInitialMood(){
        return
    }
}

class InteractionActivityStartRequirements extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.unacceptableThreshold = 0
        this.requirementsThreshold = 0
        this.minStartingSatisfaction = 0
        this.unacceptableTraits = new Map()
        this.requiredTraits = new Map()
    }
}

class InteractionActivityEvaluationElements extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.roundsLimit = 5
        this.satisfactionThreshold = EffectLevel.DEFAULT_THRESHOLD
        this.likedTraits = new Map()
        this.dislikedTraits = new Map()
        this.likedActions = new Map()
        this.satisfactionRequirements = new Map()
        this.unacceptableActions = new Map()
        this.commonTransitions = new Map()
    }
}

class SensualInteractionActivity extends SugarcubeSerializableObject {
    constructor(activityKind){
        super()
        this.activityKind = activityKind
        this.startRequirements = new InteractionActivityStartRequirements()
        this.evaluationElements = new InteractionActivityEvaluationElements()
    }
    static FLIRTING = 0
    static MAKEOUT = 1
    static SEXUAL_CONTACT = 2
    static INTERCOURSE = 3
    static COURTING = 4
    static EXCEPTIONAL_DATE = 5
    static REGULAR_DATE = 6
    static REGULAR_SEXUAL_PARTNER = 7
    static LONGTERM_PUBLIC_PARTNER = 8
    static OVERCOMING_DISLIKE = 9
    static OVERCOMING_EMBARRASSMENT = 10
    static OVERCOMING_TABOO = 11
}

var defaultMakeoutProfilePerGender = generateDefaultMakeoutProfile()
var defaultSexualContactProfilePerGender = generateDefaultSexualContactProfile()
var defaultIntercourseProfilePerGender = generateDefaultIntercourseProfile()

function generateDefaultMakeoutProfile(){
    let startRequirements = undefined
    let evaluationElements = undefined
    let activity = undefined
    let activitiesPerGender = new Map()
    
    startRequirements = new InteractionActivityStartRequirements()
    startRequirements.unacceptableThreshold = EffectLevel.INTENSE_SCORE
    startRequirements.requirementsThreshold = EffectLevel.DEFAULT_THRESHOLD
    startRequirements.unacceptableTraits.set(CharacterBodyTraits.VERY_FAT, new CharacterTraitEvaluation(CharacterBodyTraits.VERY_FAT, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.INTENSE_SCORE))
    startRequirements.unacceptableTraits.set(CharacterBodyTraits.MUCH_OLDER, new CharacterTraitEvaluation(CharacterBodyTraits.MUCH_OLDER, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.INTENSE_SCORE))
    evaluationElements = new InteractionActivityEvaluationElements()
    activity = new SensualInteractionActivity(SensualInteractionActivity.MAKEOUT)
    activitiesPerGender.set(Gender.FEMALE, activity)

    startRequirements = new InteractionActivityStartRequirements()
    evaluationElements = new InteractionActivityEvaluationElements()
    activity = new SensualInteractionActivity(SensualInteractionActivity.MAKEOUT)
    activitiesPerGender.set(Gender.MALE, activity)
}

function generateDefaultSexualContactProfile(){
    let startRequirements = undefined
    let evaluationElements = undefined
    let activity = undefined
    let activitiesPerGender = new Map()
    
    startRequirements = new InteractionActivityStartRequirements()
    startRequirements.unacceptableThreshold = EffectLevel.INTENSE_SCORE
    startRequirements.requirementsThreshold = EffectLevel.DEFAULT_THRESHOLD
    startRequirements.unacceptableTraits.set(CharacterBodyTraits.VERY_FAT, new CharacterTraitEvaluation(CharacterBodyTraits.VERY_FAT, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.INTENSE_SCORE))
    startRequirements.unacceptableTraits.set(CharacterBodyTraits.MUCH_OLDER, new CharacterTraitEvaluation(CharacterBodyTraits.MUCH_OLDER, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.INTENSE_SCORE))
    evaluationElements = new InteractionActivityEvaluationElements()
    activity = new SensualInteractionActivity(SensualInteractionActivity.MAKEOUT)
    activitiesPerGender.set(Gender.FEMALE, activity)

    startRequirements = new InteractionActivityStartRequirements()
    evaluationElements = new InteractionActivityEvaluationElements()
    activity = new SensualInteractionActivity(SensualInteractionActivity.MAKEOUT)
    activitiesPerGender.set(Gender.MALE, activity)
}

function retrieveThisInteractionSexualContactSatisfaction(actor, target){
    let interaction = State.variables.currentInteraction

}

function generateDefaultIntercourseProfile(){
    let startRequirements = undefined
    let evaluationElements = undefined
    let activity = undefined
    let activitiesPerGender = new Map()
    let instrument = undefined
    let object = undefined
    let actDescription = undefined
    let modifiers = undefined
    let modifiersCollection = undefined
    let key = undefined
    let actionRole = undefined
    let action = undefined

    startRequirements = new InteractionActivityStartRequirements()
    startRequirements.unacceptableThreshold = EffectLevel.ABSOLUTE_SCORE
    startRequirements.requirementsThreshold = EffectLevel.ABSOLUTE_SCORE
    startRequirements.unacceptableTraits.set("BODY", new CharacterTraitEvaluation(CharacterBodyTraits.VERY_FAT, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.INTENSE_SCORE))
    startRequirements.unacceptableTraits.set("BODY", new CharacterTraitEvaluation(CharacterBodyTraits.VERY_OLD, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.INTENSE_SCORE))
    // TODO: Implement these. Check if the perspective owner is in some comitted and exclusive sexual relatiosnhip and if it is not with the perspective target. Repeat the same for the perspective's owner relationship model of the perspective target.
    // startRequirements.unacceptableTraits.set("CIRCUMSTANCE", "PERSPECTIVE_OWNER_IS_CHEATING")
    // startRequirements.unacceptableTraits.set("CIRCUMSTANCE", "PERSPECTIVE_TARGET_IS_CHEATING")
    // startRequirements.requiredTraits.set("INTERACTION_HISTORY", new CharacterTraitEvaluation("SEXUAL_CONTACT", true, TraitIntensity.MODERATELY_SCORE, EffectLevel.ADEQUATE_SCORE, retrieveThisInteractionSexualContactSatisfaction))
    // startRequirements.requiredTraits.set("INTERACTION_HISTORY", new CharacterTraitEvaluation("SEXUAL_CONTACT", true, TraitIntensity.EXTREMELY_SCORE, EffectLevel.EXTREME_SCORE))
    // startRequirements.requiredTraits.set("SEXUALITY_MOOD", new CharacterTraitEvaluation("AROUSAL", true, TraitIntensity.EXTREMELY_SCORE, EffectLevel.EXTREME_SCORE))
    // startRequirements.requiredTraits.set("RELATSIONSHIP_HISTORY", "TRUST")
    // startRequirements.requiredTraits.set("RELATSIONSHIP_HISTORY", "INTIMACY")
    // startRequirements.requiredTraits.set("RELATSIONSHIP_HISTORY", "REGULAR_SEX_PARTNER_SATISFACTION")
//    startRequirements.requiredTraits.set("INTERACTION_HISTORY", new CharacterTraitEvaluation(InteractionHistory.SEXUAL_CONTACT, true, TraitIntensity.EXTREMELY_SCORE, EffectLevel.EXTREME_SCORE))
    evaluationElements = new InteractionActivityEvaluationElements()
    evaluationElements.roundsLimit = 8
    evaluationElements.satisfactionThreshold = EffectLevel.ABSOLUTE_SCORE
    //evaluationElements.likedTraits.set("ATTITUDE", "PATIENT")
    evaluationElements.likedTraits.set("BODY", new CharacterTraitEvaluation(CharacterBodyTraits.FIT, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.WEAK_SCORE))
    evaluationElements.likedTraits.set("BODY", new CharacterTraitEvaluation(CharacterBodyTraits.VERY_FIT, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.WEAK_SCORE))
    evaluationElements.dislikedTraits.set("BODY", new CharacterTraitEvaluation(CharacterBodyTraits.FAT, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.WEAK_SCORE))
    evaluationElements.dislikedTraits.set("BODY", new CharacterTraitEvaluation(CharacterBodyTraits.OLD, true, TraitIntensity.MODERATELY_SCORE, EffectLevel.WEAK_SCORE))

    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.PENETRATE, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.ACTOR
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.PULL, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)
    
    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SURFACE)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.NUB, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.CLIT)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.RUB, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.LICKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.TONGUE)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SURFACE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.LICK, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SUCKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.MOUTH)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.NUB, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.CLIT)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.SUCK, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.FINGERS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.PENETRATE, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.VERY_WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CARESSER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SURFACE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.CARESS, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.THRUST, SensualActionIntensity.SOFT, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.TARGET
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.THRUST, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.ACTOR
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.RIDE, SensualActionIntensity.SOFT, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    actionRole = ActionRole.ACTOR
    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.RIDE, undefined, object)
    modifiers = new Map()
    modifiers.set(ActModifiers.ADDER, new ActModifiers(ActModifiers.ADDER, EffectLevel.WEAK_SCORE))
    modifiersCollection = new ActModifiersCollection(SensualMoodAttribute.INTERACTION_SATISFACTION, false, modifiers)
    action = new SensualActionEffects(actDescription, modifiers)
    key = ArousalElements.actionEvaluationKey(actionRole, actDescription)
    evaluationElements.likedActions.set(key, action)

    activity = new SensualInteractionActivity(SensualInteractionActivity.INTERCOURSE)
    activity.startRequirements = startRequirements
    activity.evaluationElements = evaluationElements
    activitiesPerGender.set(Gender.FEMALE, activity)

    startRequirements = new InteractionActivityStartRequirements()
    evaluationElements = new InteractionActivityEvaluationElements()
    activity = new SensualInteractionActivity(SensualInteractionActivity.MAKEOUT)
    activitiesPerGender.set(Gender.MALE, activity)
}

window.CharacterInteraction = class extends SugarcubeSerializableObject {
    constructor(characters){
        super()
        if (characters === undefined){
            this.characters = new Array()
        } else {
            this.characters = characters
        }
        this.moodsPerCharacterPair = new Map()
        this._moodTypeConstructor = CharacterInteractionMood.prototype.constructor
        for(let perspectiveOwnerIndex = 0; perspectiveOwnerIndex < this.characters.length; perspectiveOwnerIndex++){
            for(let perspectiveTargetIndex = 0; perspectiveTargetIndex < this.characters.length; perspectiveTargetIndex++){
                if (perspectiveOwnerIndex != perspectiveTargetIndex){
                    let perspectiveOwner = this.characters[perspectiveOwnerIndex]
                    let perspectiveTarget = this.characters[perspectiveTargetIndex]
                    let pairInteractionKey = CharacterInteraction.createPairInteractionKey(perspectiveOwner, perspectiveTarget)
                    this.moodsPerCharacterPair.set(pairInteractionKey, new this._moodTypeConstructor(perspectiveOwner, perspectiveTarget))
                }
            }
        }
    }
    static createPairInteractionKey(perspectiveOwner, perspectiveTarget){
        return perspectiveOwner.toString() + "|" + perspectiveTarget.toString()
    }
}

class SexualInteractionMood extends CharacterInteractionMood {
    constructor(perspectiveOwner, perspectiveTarget){
        super(perspectiveOwner, perspectiveTarget)
        this.arousalLevel = ArousalLevel.COOL
        this.arousalScore = ArousalLevel.COOL_SCORE
        this.curentLevelSatisfaction = 0
        this.nextLevelPreparation = 0
}
    _setInitialMood(){
        [this.arousalLevel, this.arousalScore] = perspectiveOwner.getInitialArousal()
    }
}

class SexualInteraction extends CharacterInteraction {
    constructor(characters){
        super(characters)
        this._moodTypeConstructor = SexualInteractionMood
        this.currentLevelActionHistory = new Array()
        this.fullActionHistory = new Array()
        this.currentActivity = undefined
        // this.activities = new Map()
        // this.activities.set(SensualInteractionActivity.INTERCOURSE)
    }
    calculateReaction(actor, target, stimulatingActionId){
        // Find the target's mood towards the actor.
        let targetsMood = this.moodsPerCharacterPair.get(CharacterInteraction.createPairInteractionKey(target, actor))
        if (targetsMood === undefined){
            throw "ERROR: Cannot calculateReaction when target mood can't be found for key '" + CharacterInteraction.createPairInteractionKey(target, actor) + "'."
        }
        let action = completeStimulatingActionsList.get(stimulatingActionId)
        let actionEvaluationKey = ArousalElements.actionEvaluationKey(ActionRole.TARGET, action)
        let arousalProfile = target.sexuality.arousalProfilePerArousalLevel.get(target.sexuality.sexualMood.aroused)
        let evaluation = arousalProfile.evaluateAction(target, actor, target, stimulatingActionId)
        let evaluationElements = this.currentActivity.evaluationElements
        
        
        
        // TODO: Remove if no longer necessary
        // target.sexuality.evaluateAction(target, actor, target, this, stimulatingActionId)
        // evaluateAction(perspetiveOwner, actor, target, interaction, action){
        //     let arousalProfile = undefined
        //     switch(perspetiveOwner.sexuality.sexualMood.aroused){
        //         case ArousalLevel.EXCITED:
        //             arousalProfile = perspetiveOwner.sexuality.arousalProfilePerArousalLevel[perspetiveOwner.sexuality.sexualMood.aroused]
        //             arousalProfile.
        //             break
        //         default:
        //             throw "ERROR: CharacterSexuality.evaluateAction: Can't find an ArousalLevel corresponding to '" + perspetiveOwner.sexuality.sexualMood.aroused + "'."
        //     }
        // }
    

        // Find the target's corresponding arousal level.
        let arousalLevel = targetsMood.arousal


        // Find the action by it's ID on the target's corresponding arousal level.
        // Calibrate the target's reaction by the target's mood.
        return
    }
}
