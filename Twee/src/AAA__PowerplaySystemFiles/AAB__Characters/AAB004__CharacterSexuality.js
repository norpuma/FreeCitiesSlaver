class SensualActionKind {
    static PHYSICAL = "PHYSICAL"
    static PSYCHOLOGICAL = "PSYCHOLOGICAL"
}

class SensualActionPhysicalInstrumentNature {
    static BODY_PART = "BODY_PART"
    static TOY = "TOY"
}

class SensualActionPhysicalInstrumentCategory {
    static KISSER = "KISSER"
    static SUCKER = "SUCKER"
    static LICKER = "LICKER"
    static SLAPPER = "SLAPPER"
    static PINCHER = "PINCHER"
    static BITER = "BITER"
    static GRABBER = "GRABBER"
    static SQUEEZER = "SQUEEZER"
    static MASSAGER = "MASSAGER"
    static GROPER = "GROPER"
    static VIBRATOR = "VIBRATOR"
    static PENETRATOR = "PENETRATOR"
    static CARESSER = "CARESSER"
    static CAGER = "CAGER"
    static PHALLIC = "PHALLIC"
    static VALLEY = "VALLEY"
    static CHANNEL = "CHANNEL"
    static ENTRANCE = "ENTRANCE"
    static SURFACE = "SURFACE"
    static NUB = "NUB"
}

class SensualActionVerb {
    static KISS = "KISS"
    static LICK = "LICK"
    static SUCK = "SUCK"
    static BITE = "BITE"
    static SQUEEZE = "SQUEEZE"
    static MASSAGE = "MASSAGE"
    static PINCH = "PINCH"
    static PAT = "PAT"
    static SLAP = "SLAP"
    static CARESS = "CARESS"
    static GROPE = "GROPE"
    static RUB = "RUB"
    static HUG = "HUG"
    static CLAW = "CLAW"
    static PENETRATE = "PENETRATE"
    static PULL = "PULL"
    static THRUST = "THRUST"
    static RIDE = "RIDE"
}

class SensualActionIntensity {
    static SOFT = "SOFT" // Soft, careful, slow
    static AVERAGE = "AVERAGE" // Average, medium
    static STRONG = "STRONG" // Strong, fast, intense
    static EXCESSIVE = "EXCESSIVE" // Excessive, rough, savage
}

class SensualMoodAttribute {
    static AROUSING = "AROUSING"
    static EMBARRASSING = "EMBARRASSING"
    static PAINFUL = "PAINFUL"
    static INTERACTION_SATISFACTION = "INTERACTION_SATISFACTION"
}

class SensualActionPhysicalInstrument extends SugarcubeSerializableObject {
    constructor(category, nature, specific, qualities){
        super()
        this.category = category
        this.nature = nature
        this.specific = specific
        this.qualities = qualities // Commonly "big" or "small" for penises, fingers, butt plugs, dildos, strapons, etc.
    }
}

class SensualActionDescriptor extends SugarcubeSerializableObject {
    constructor(instrument, verb, intensity, object){
        super()
        this.instrument = instrument
        this.verb = verb
        if (intensity !== undefined){
            this.intensity = intensity
        } else {
            this.intensity = SensualActionIntensity.AVERAGE
        }
        this.object = object
    }
    toString(){
        return JSON.stringify(this).replace(/"/g, "'")
    }
}

class SensualActionEffects extends SugarcubeSerializableObject {
    constructor(actDescription, modifiersByClassMember){
        super()
        this.actDescription = actDescription
        this.modifiersByClassMember = modifiersByClassMember
    }
}

class AttractionElements {
    static FEMALE = "FEMALE"
    static MALE = "MALE"
    static FITNESS = "FITNESS"
    static FACE_TRADITIONAL_ATTRACTIVENESS = "FACE_TRADITIONAL_ATTRACTIVENESS"
    static CONFIDENT_ATTITUDE = "CONFIDENT_ATTITUDE"
    static BIG_BREASTS = "BIG_BREASTS"
    static BIG_COCK = "BIG_COCK"
    evaluate_FEMALE(targetCharacter){
        if (targetCharacter.gender == Gender.FEMALE){
            return true
        } else {
            return false
        }
    }
    evaluate_MALE(targetCharacter){
        if (targetCharacter.gender == Gender.MALE){
            return true
        } else {
            return false
        }
    }
    evaluate_FITNESS(targetCharacter){
        if (targetCharacter.body.isFit() == true){
            return true
        } else {
            return false
        }
    }
    evaluate_FACE_TRADITIONAL_ATTRACTIVENESS(targetCharacter){
        if (targetCharacter.body.isFaceTraditionallyAttractive() == true){
            return true
        } else {
            return false
        }
    }
    evaluate_CONFIDENT_ATTITUDE(targetCharacter){
        if (targetCharacter.attitude.isConfident() == true){
            return true
        } else {
            return false
        }
    }
    evaluate_BIG_BREASTS(targetCharacter){
        if (targetCharacter.body.hasBigBreasts() == true){
            return true
        } else {
            return false
        }
    }
    evaluate_BIG_COCK(targetCharacter){
        if (targetCharacter.body.hasBigCock() == true){
            return true
        } else {
            return false
        }
    }
}

class StimulatingAction extends SugarcubeSerializableObject {
    constructor(actionId){
        super()
        this.actionId = actionId // A static member of StimulatingAction used as a key. e.g. StimulatingAction.INITIATE_FRENCH_KISS
        this.registrationRequirementsFunction = undefined // Must be a function receiving actor, target, circumstances and returning boolean. If not undefined, this is called before registering this actions as a possible action in a scene and only registers if the function returns true. This can be used, for instance, to check if a character has a dildo before offering actions that require a dildo.
    }
    static INITIATE_FRENCH_KISS = "INITIATE_FRENCH_KISS"
    static SUCK_NIPPLE = "SUCK_NIPPLE"
    static LICK_PUSSY = "LICK_PUSSY"
    static CARESS_PUSSY = "CARESS_PUSSY"
    static LICK_CLIT = "LICK_CLIT"
    static RUB_CLIT = "RUB_CLIT"
    static FINGER_VAGINA = "FINGER_VAGINA"
    static RIM_ASS = "RIM_ASS"
    static TRIB = "TRIB"
    static FUCK_VAGINA_WITH_COCK = "FUCK_VAGINA_WITH_COCK"
    static FUCK_ASS_WITH_COCK = "FUCK_ASS_WITH_COCK"

    static RECEIVE_FRENCH_KISS = "RECEIVE_FRENCH_KISS"
}

var completeStimulatingActionsList = generateCompleteStimulatingActionsList()

class StimulatingActions extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.acts = new Map()
        this.actsByInstrument = new Map()
        this.actsByVerb = new Map()
        this.actsByObject = new Map()
    }
}

function generateCompleteStimulatingActionsList(){
    let actions = new Map()
    let instrument = undefined
    let object = undefined
    let actDescription = undefined
    let action = undefined

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.KISSER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.MOUTH)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.KISSER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.MOUTH)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.KISS, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    actions.set(action.actionId, actDescription)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SUCKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.MOUTH)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.NUB, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.NIPPLES)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.SUCK, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.LICKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.TONGUE)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.ENTRANCE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.LICK, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        if (target.body.bodyParts.VULVA !== undefined){
            return true
        } else {
            return false
        }
    }
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CARESSER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.HANDS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.ENTRANCE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.CARESS, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.VULVA)
    }
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.LICKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.TONGUE)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.NUB, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.CLIT)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.LICK, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.CLIT)
    }
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SURFACE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.HANDS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.NUB, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.CLIT)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.RUB, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.CLIT)
    }
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.FINGERS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.PENETRATE, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.VAGINA)
    }
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.LICKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.TONGUE)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.ENTRANCE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.ANUS)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.LICK, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SURFACE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SURFACE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.RUB, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return ((actor.body.bodyParts.isAccessible(BodyParts.VAGINA) == true) && (target.body.bodyParts.isAccessible(BodyParts.VAGINA) == true))
    }
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.THRUST, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return actor.body.bodyParts.isAccessible(BodyParts.PENIS)
    }
    actions.set(action.actionId, action)

    instrument = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
    object = new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.RECTUM)
    actDescription = new SensualActionDescriptor(instrument, SensualActionVerb.THRUST, undefined, object)
    action = new StimulatingAction(actDescription.toString())
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return actor.body.bodyParts.isAccessible(BodyParts.PENIS)
    }
    actions.set(action.actionId, action)

    return actions
}

function generateCompleteStimulatingActionsList__OLD(){
    let actions = new Map()
    let action = undefined

    action = new StimulatingAction(StimulatingAction.INITIATE_FRENCH_KISS)
    actions.set(action.actionId, action)

    action = new StimulatingAction(StimulatingAction.SUCK_NIPPLE)
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.LICK_PUSSY)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        if (target.body.bodyParts.VULVA !== undefined){
            return true
        } else {
            return false
        }
    }
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.CARESS_PUSSY)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.VULVA)
    }
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.LICK_CLIT)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.CLIT)
    }
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.RUB_CLIT)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.CLIT)
    }
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.FINGER_VAGINA)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return target.body.bodyParts.isAccessible(BodyParts.VAGINA)
    }
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.RIM_ASS)
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.TRIB)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return ((actor.body.bodyParts.isAccessible(BodyParts.VAGINA) == true) && (target.body.bodyParts.isAccessible(BodyParts.VAGINA) == true))
    }
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.FUCK_VAGINA_WITH_COCK)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return actor.body.bodyParts.isAccessible(BodyParts.PENIS)
    }
    actions.set(action.actionId, action)
    
    action = new StimulatingAction(StimulatingAction.FUCK_ASS_WITH_COCK)
    action.registrationRequirementsFunction = function(actor, target, circumstances){
        return actor.body.bodyParts.isAccessible(BodyParts.PENIS)
    }
    actions.set(action.actionId, action)
    
    return actions
}

class ActionRole {
    static ACTOR = "ACTOR"
    static TARGET = "TARGET"
}

class ArousalElements extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.likedTraits = new Map()
        this.dislikedTraits = new Map()
        this.requiredTraits = new Map()
        this.unacceptableTraits = new Map()
        this.progressActions = new Map()
        this.upgradeActionsRequired = new Map()
        this.upgradeActionsAppreciated = new Map()
        this.unacceptableActions = new Map()
    }
    static actionEvaluationKey(actionRole, sensualActionDescriptor){
        return actionRole + "|" + sensualActionDescriptor
    }
    static parseEvaluationKey(evaluationKey){
        let elements = evaluationKey.split("|")
        let actionRole = elements[0]
        let sensualActionDescriptor = JSON.parse(elements[1])
        return actionRole, sensualActionDescriptor
    }
}

function aaaF() {
    let currentArousalPreferences = new ArousalProfile(ArousalLevel.TINGLY, Gender.FEMALE)
    currentArousalPreferences.sexualStaminaForArousalLevel = 5
    currentArousalPreferences.intensityThreshold = EffectLevel.DEFAULT_THRESHOLD
    currentArousalPreferences.upgradeThreshold = EffectLevel.DEFAULT_THRESHOLD
    currentArousalPreferences.arousingElements = new ArousalElements()
    currentArousalPreferences.arousingElements.likedTraits.set(AttractionElements.FITNESS, EffectLevel.ADEQUATE)
    currentArousalPreferences.arousingElements.likedTraits.set(AttractionElements.FACE_TRADITIONAL_ATTRACTIVENESS, EffectLevel.ADEQUATE)
    currentArousalPreferences.arousingElements.likedTraits.set(AttractionElements.BIG_COCK, EffectLevel.WEAK)
    currentArousalPreferences.arousingElements.requiredTraits.set(AttractionElements.MALE, EffectLevel.INNEFFECTIVE)
    currentArousalPreferences.arousingElements.unacceptableTraits.set(AttractionElements.FEMALE, EffectLevel.ABSOLUTE)
    currentArousalPreferences.arousingElements.progressActions.set(StimulatingActions.KISS_MOUTH, EffectLevel.STRONG)

    return currentArousalPreferences
}

var aaaM = {
    arsousal: ArousalLevel.TINGLY,
    gender: Gender.MALE,
    sexualStaminaForArousalLevel: 5,
}

var bbbF = {
    arsousal: ArousalLevel.PRESSING,
}

class SimpleArousalElementCreator {
    constructor(){}
    setCharacterRole(characterActionRole){
        this.characterActionRole = characterActionRole
        return this
    }
    setInstrumentFromBodyPart(bodyPartServingAsInstrument){
        this.bodyPartServingAsInstrument = bodyPartServingAsInstrument
        return this
    }
    setVerb(sensualActionVerb, actIntensity){
        this.sensualActionVerb = sensualActionVerb
        this.sensualActionVerbIntensity = actIntensity
        return this
    }
    setObjectFromBodyPart(bodyPartServingAsObject){
        this.bodyPartServingAsObject = bodyPartServingAsObject
        return this
    }
    setArousalIncrease(amountToAddToArousal){
        this.amountToAddToArousal = amountToAddToArousal
        return this
    }
    create(){
        let instrument = SimpleArousalElementCreator.buildSensualActionPhysicalInstrumentFromBodyPart(this.bodyPartServingAsInstrument, this.sensualActionVerb)
        let object = SimpleArousalElementCreator.buildSensualActionPhysicalInstrumentFromObjectBodyPart(this.bodyPartServingAsObject, this.sensualActionVerb)
        let actDescription = new SensualActionDescriptor(instrument, this.sensualActionVerb, this.sensualActionVerbIntensity, object)
        let modifiers = new Map()
        let adders = modifiers.get(ActModifiers.ADDER)
        if (adders === undefined){
            adders = new Array()
            modifiers.set(ActModifiers.ADDER, adders)
        }
        adders.push(new ActModifiers(ActModifiers.ADDER, this.amountToAddToArousal))
        let arousalModifiersCollection = new ActModifiersCollection(SensualMoodAttribute.AROUSING, false, modifiers)
        let modifiersByClassMember = new Map()
        modifiersByClassMember.set(SensualMoodAttribute.AROUSING, arousalModifiersCollection)
        let action = new SensualActionEffects(actDescription, modifiersByClassMember)
        let key = ArousalElements.actionEvaluationKey(this.characterActionRole, actDescription)
        return key, action
    }
    static buildSensualActionPhysicalInstrumentFromBodyPart(bodyPartServingAsInstrument, verb){
        switch(bodyPartServingAsInstrument){
            case BodyParts.FINGERS:
                switch(verb){
                    case SensualActionVerb.PENETRATE:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.FINGERS)
                }
                break
            case BodyParts.HANDS:
                switch(verb){
                    case SensualActionVerb.RUB:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SURFACE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.HANDS)
                }
                break
            case BodyParts.MOUTH:
                switch(verb){
                    case SensualActionVerb.KISS:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.KISSER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.MOUTH)
                    case SensualActionVerb.SUCK:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.SUCKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.MOUTH)
                }
                break
            case BodyParts.PENIS:
                switch(verb){
                    case SensualActionVerb.CARESS:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CARESSER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
                    case SensualActionVerb.PENETRATE:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
                    case SensualActionVerb.THRUST:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
                }
                break
            case BodyParts.TONGUE:
                switch(verb){
                    case SensualActionVerb.LICK:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.LICKER, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.TONGUE)
                }
                break
            case BodyParts.VAGINA:
                switch(verb){
                    case SensualActionVerb.PULL:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
                    case SensualActionVerb.RIDE:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
                }
                break
            default:
                throw "ERROR: Can't buildSensualActionPhysicalInstrumentFromBodyPart with bodyPartServingAsInstrument '" + bodyPartServingAsInstrument + "' and verb '" + verb + "'"
        }
        return undefined
    }
    static buildSensualActionPhysicalInstrumentFromObjectBodyPart(bodyPartServingAsObject, verb){
        switch(bodyPartServingAsObject){
            case BodyParts.CLIT:
                switch(verb){
                    case SensualActionVerb.RUB:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.NUB, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.CLIT)
                    case SensualActionVerb.SUCK:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.NUB, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.CLIT)
                }
                break
            case BodyParts.PENIS:
                switch(verb){
                    case SensualActionVerb.PULL:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
                    case SensualActionVerb.RIDE:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.PENETRATOR, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.PENIS)
                }
                break
            case BodyParts.VAGINA:
                switch(verb){
                    case SensualActionVerb.PENETRATE:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
                    case SensualActionVerb.THRUST:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.CHANNEL, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VAGINA)
                }
                break
            case BodyParts.VULVA:
                switch(verb){
                    case SensualActionVerb.CARESS:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.ENTRANCE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
                    case SensualActionVerb.LICK:
                        return new SensualActionPhysicalInstrument(SensualActionPhysicalInstrumentCategory.ENTRANCE, SensualActionPhysicalInstrumentNature.BODY_PART, BodyParts.VULVA)
                }
                break
            default:
                throw "ERROR: Can't buildSensualActionPhysicalInstrumentFromObjectBodyPart with bodyPartServingAsObject '" + bodyPartServingAsObject + "' and verb '" + verb + "'"
        }
        return undefined
    }
}

function defaultFemaleExcitedArousalElements() {
    let key = undefined
    let action = undefined

    let currentArousalPreferences = new ArousalProfile(ArousalLevel.EXCITED, Gender.FEMALE)
    currentArousalPreferences.sexualStaminaForArousalLevel = 5
    currentArousalPreferences.intensityThreshold = EffectLevel.ABSOLUTE_SCORE
    currentArousalPreferences.upgradeThreshold = EffectLevel.ABSOLUTE_SCORE
    currentArousalPreferences.arousingElements = new ArousalElements()
    // currentArousalPreferences.arousingElements.likedTraits.set(AttractionElements.FITNESS, EffectLevel.ADEQUATE)
    // currentArousalPreferences.arousingElements.likedTraits.set(AttractionElements.FACE_TRADITIONAL_ATTRACTIVENESS, EffectLevel.ADEQUATE)
    // currentArousalPreferences.arousingElements.likedTraits.set(AttractionElements.BIG_COCK, EffectLevel.WEAK)
    // currentArousalPreferences.arousingElements.requiredTraits.set(AttractionElements.MALE, EffectLevel.INNEFFECTIVE)
    // currentArousalPreferences.arousingElements.unacceptableTraits.set(AttractionElements.FEMALE, EffectLevel.ABSOLUTE)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.PENIS)
        .setVerb(SensualActionVerb.PENETRATE).setObjectFromBodyPart(BodyParts.VAGINA).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.ACTOR).setInstrumentFromBodyPart(BodyParts.VAGINA)
        .setVerb(SensualActionVerb.PULL).setObjectFromBodyPart(BodyParts.PENIS).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)
    
    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.HANDS)
        .setVerb(SensualActionVerb.RUB).setObjectFromBodyPart(BodyParts.CLIT).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.TONGUE)
        .setVerb(SensualActionVerb.LICK).setObjectFromBodyPart(BodyParts.VULVA).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.MOUTH)
        .setVerb(SensualActionVerb.SUCK).setObjectFromBodyPart(BodyParts.CLIT).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.FINGERS)
        .setVerb(SensualActionVerb.PENETRATE).setObjectFromBodyPart(BodyParts.VAGINA).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.PENIS)
        .setVerb(SensualActionVerb.CARESS).setObjectFromBodyPart(BodyParts.VULVA).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.PENIS)
        .setVerb(SensualActionVerb.THRUST, SensualActionIntensity.SOFT).setObjectFromBodyPart(BodyParts.VAGINA).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.TARGET).setInstrumentFromBodyPart(BodyParts.PENIS)
        .setVerb(SensualActionVerb.THRUST).setObjectFromBodyPart(BodyParts.VAGINA).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.ACTOR).setInstrumentFromBodyPart(BodyParts.VAGINA)
        .setVerb(SensualActionVerb.RIDE, SensualActionIntensity.SOFT).setObjectFromBodyPart(BodyParts.PENIS).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    key, action = new SimpleArousalElementCreator().setCharacterRole(ActionRole.ACTOR).setInstrumentFromBodyPart(BodyParts.VAGINA)
        .setVerb(SensualActionVerb.RIDE).setObjectFromBodyPart(BodyParts.PENIS).setArousalIncrease(EffectLevel.WEAK_SCORE).create()
    currentArousalPreferences.arousingElements.progressActions.set(key, action)

    return currentArousalPreferences
}

class ArousalProfile extends SugarcubeSerializableObject {
    constructor(arousalLevel, gender, sexualStaminaForArousalLevel, downgradeThreshold, intensifyingActs, intensityThreshold, upgradingActs, upgradeRequirements, upgradeThreshold){
        super()
        this.arousalLevel = arousalLevel // The arousal level this profile corresponds to.
        this.gender = gender
        if (sexualStaminaForArousalLevel === undefined){
            sexualStaminaForArousalLevel = 5
        }
        this.sexualStaminaForArousalLevel = sexualStaminaForArousalLevel // This tracks how many rounds the character is willing to go if they reach this Arousal level. It indicates both overal count of rounds and the count of rounds for the current arousal level.
        if (intensityThreshold === undefined){
            intensityThreshold = EffectLevel.DEFAULT_THRESHOLD
        }
        this.intensityThreshold = intensityThreshold // This is a value of stimulation a character must reach before being ready to upgrade to the next Arousal level. This may be split in Physical and Psychological stimuli.
        if (upgradeThreshold === undefined){
            upgradeThreshold = EffectLevel.DEFAULT_THRESHOLD
        }
        this.upgradeThreshold = upgradeThreshold // This is a value of stimulation a character must reach before upgrading to the next Arousal level. This may be split in Physical and Psychological stimuli.
        this.arousingElements = new ArousalElements()

        if (downgradeThreshold === undefined){
            downgradeThreshold = {nonStimulatingLimitForEncounter: 10, consecutiveNonStimulatingLimitForArousalLevel: 3, nonConsecutiveNonStimulatingLimitForArousalLevel: 5}
        }
        this.downgradeThreshold = downgradeThreshold // This indicates the number of total non-stimulating actions at this Arousal level the character will accept before going down an Arousal level; also the number of nons-stimulating acts overal in the Sexual Encounter the character will accept, after reaching this Arousal level before giving up on the Sexual Encounter entirely; and, finally, the number of nons-stimulating actions in a row the character will accept before going down an Arousal level

        // if (intensifyingActs === undefined){
        //     intensifyingActs = ArousalProfile.generateRandomIntensifyingActs(gender, this.arousal)
        // }
        // this.intensifyingActs = intensifyingActs // This is a list of acts the character finds stimulating at this Arousal level. Acts will have stimulation, pleasure, pain, embarrassment and infuriating stats. They also have a satisaction order. For each act with the satisfaction order done in the correct order listed when the character upgrades to the next Arousal level, their Satisfaction with the Sexual Encounter goes up by 1.
        // this.intensityThreshold = intensityThreshold // This is a value of stimulation a character must reach before being ready to upgrade to the next Arousal level. This may be split in Physical and Psychological stimuli.
        // if (upgradingActs === undefined){
        //     upgradingActs = ArousalProfile.generateRandomUpgradingActs(gender, this.arousal)
        // }
        // this.upgradingActs = upgradingActs // This is a list of stimulating acts marked either as ordered, required or bonus. For most characters, this is a single action. Acts will have stimulation, pleasure, pain, embarrassment and infuriating stats.
        // if (upgradeRequirements === undefined){
        //     upgradeRequirements = ArousalProfile.generateRandomUpgradeRequirements(gender, this.arousal)
        // }
        // this.upgradeRequirements = upgradeRequirements // This is a list of acts found in Upgrading Arousal Acts that MUST have appeared in the current Sexual Encounter before the character is ready to upgraded to the next Arousal level.

        // this.reactionsToPromptingForSex = undefined // Arousal and Desire will indicate a character's reaction to promptings to have sex (both explicit and subtle - often wordless - promptings). Different characters will react in subtly different ways, but the overall sentiment will be the same for all.
        // this.arousedFeelings = undefined // Arousal will indicate how a character feels. It will dictate internal states. Different characts will feel a little differently.
        // this.arousedBodyIndicators = undefined // Arousal will have physical manifestations on a character's body. Both manifestations that someone examining them will perceive and subtler ones that most of the time only the character themself will be aware of. Different characters may have small differences, but most of the manifestations are the same.
        // this.focusOnSex = undefined // Arousal will indicate how a character feels during the day, when doing non-sexual activities. Very aroused character will be thinking a lot about sex. Different characters will have, overall, the same kind of thoughts, even if the specifics will differ (according to preferences and kinks). The greater a character's Arousal the more pressing their need for a release will be. Character's at low arousal will disregard stimuli while at higher arousal they will seek more stimulation. Different characters will have similar needs.
        // this.reactionsToStimuli = undefined // Arousal will dictate how a character will react to sexual stimuli, both in terms of vocal and physical reactions. Different character will have different kinds of reactions, although the levels will be similar between them.
        // this.arousedPublicActs = undefined // Arousal will determine some actions a character will tend to do in public. Different characters will have similar actions.
        // this.arousedPrivateActs = undefined // Arousal will define some actions a character will tend to take when in private - either alone or with an intimate partner. Different characters will have distinct actions (usually depending on preferences and kinks).
    }
    static generateRandomArousalProfile(gender, arousal){
        // TODO: Implement this: generateRandomArousalProfile
        throw new Error("generateRandomArousalProfile - NOT IMPLEMENTED")
    }
    static generateRandomIntensifyingActs(gender, arousal){
        return ArousalProfile._generateRandomStimulatingActs(gender, arousal, StimulatingActKind.INTENSIFYING)
    }
    static generateRandomUpgradingActs(gender, arousal){
        return ArousalProfile._generateRandomStimulatingActs(gender, arousal, StimulatingActKind.UPGRADING)
    }
    static _generateRandomStimulatingActs(gender, arousal, stimulatingActKind){
        let arousalAsString = ArousalLevel.arousalLevelToString(arousal)
        let stimulatingActKindAsString = StimulatingActKind.stimulatingActKindToString(stimulatingActKind)
        let genderAsString = Gender.genderToString(gender)
        let rightLevelPhysicalActs = randomPhysicalStimulatingActs[arousalAsString][stimulatingActKindAsString][genderAsString]
        //Generate 3 intensifying stimuating sex acts for this arousal level.
        let remainingStimuliToGenerate = 3
        if (remainingStimuliToGenerate > rightLevelPhysicalActs.length){
            throw new Error("ERROR: _generateRandomStimulatingActs (" + stimulatingActKindAsString + "): Can't generate more stimulating acts (" + remainingStimuliToGenerate + ") than found in map (" + rightLevelPhysicalActs.length + ").")
        }
        let selectedIndexes = new Array()
        while (remainingStimuliToGenerate > 0){
            let index = Math.floor(Math.random() * rightLevelPhysicalActs.length)
            if (selectedIndexes.indexOf(index) == -1){
                selectedIndexes.push(index)
                --remainingStimuliToGenerate
            }
        }
        let stimulatingActs = new Array()
        for(let index of selectedIndexes){
            let actScores = new StimulatingActsScores(EffectLevel.ADEQUATE, 0, 0, 0 , 0)
            let act = rightLevelPhysicalActs[index]
            let newAct = new PhysicalStimulatingAct(actScores, act.actor, act.target, act.verb, act.object, act.modifiers)
            stimulatingActs.push(newAct)
        }
        return stimulatingActs
    }
    static generateRandomUpgradeRequirements(gender, arousal){
        // TODO: Implement this: generateRandomUpgradeRequirements
        throw new Error("generateRandomUpgradeRequirements - NOT IMPLEMENTED")
    }
    static generateDefaultArousalProfile(gender, arousal){
        if (gender === Gender.FEMALE){
            switch(arousal){
                case ArousalLevel.EXCITED:
                    return defaultFemaleExcitedArousalElements()
            }
        }
    }
    evaluateAction(perspetiveOwner, actor, target, actionId){
        let arousalElements = this.arousalElements
        let actionRole = ActionRole.TARGET
        if (perspetiveOwner == actor){
            actionRole = ActionRole.ACTOR
        }
        let key = ArousalElements.actionEvaluationKey(actionRole, actionId)
        let action = this.arousingElements.progressActions.get(actionId)
        let modifiers = action.modifiers
        State.variables.characters.DEBUG_bbb = modifiers
        // for(let modifier of modifiers){
        //     ;
        // }
    }
}

class CharacterSexuality extends SugarcubeSerializableObject {
    constructor(attractionToFemales, attractionToMales){
        super()
        this.sexualMood = new CharacterSexualMood()
        this.attractionToFemales = attractionToFemales
        this.attractionToMales = attractionToMales
        // TODO: Remove if no longer necessary
        //this.attractionElementsPerArousalLevel = new Map() // This is a map of AttractionElements to a number correspoding to an increase in arousal level.
        this.arousalProfilePerArousalLevel = new Map()
        this.activityProfilePerActivity = new Map()
    }
    /// TODO: Check perspectiveOwner arousal elements immediately perceivable (or REMEMBERED) in perspectiveTarget.
    getInitialArousal(target){
        let initialArousal = 0
        if (target.gender == Gender.FEMALE){
            initialArousal += this.attractionToFemales
        } else {
            initialArousal += this.attractionToMales
        }
        return initialArousal
    }
    generateDefaultArousalProfiles(gender){
        let arousalProfilePerArousalLevel = new Map()
        let arousalProfile = undefined

        arousalProfile = ArousalProfile.generateDefaultArousalProfile(gender, ArousalLevel.EXCITED)
        arousalProfilePerArousalLevel.set(arousalProfile.arousalLevel, arousalProfile)
        this.arousalProfilePerArousalLevel = arousalProfilePerArousalLevel
    }
}
