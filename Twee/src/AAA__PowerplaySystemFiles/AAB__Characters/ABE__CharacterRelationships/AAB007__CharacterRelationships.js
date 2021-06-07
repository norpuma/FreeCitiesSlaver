class FriendlyRelationship extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.trust = 10
        this.intimacy = 0
    }
}

class PowerRelationship extends SugarcubeSerializableObject {
    constructor(){
        super()
    }
}

class SensualRelationshipHistory {
    static LATEST_FLIRT_SATISFACTION = "LATEST_FLIRT_SATISFACTION"
    static LATEST_MAKEOUT_SATISFACTION = "LATEST_MAKEOUT_SATISFACTION"
    static LATEST_SEXUAL_CONTACT_SATISFACTION = "LATEST_SEXUAL_CONTACT_SATISFACTION"
    static LATEST_INTERCOURSE_SATISFACTION = "LATEST_INTERCOURSE_SATISFACTION"
    static LATEST_COURTING_SATISFACTION = "LATEST_COURTING_SATISFACTION"
    static LATEST_ROMANTIC_PARTNER_SATISFACTION = "LATEST_ROMANTIC_PARTNER_SATISFACTION"
}

class SensualRelationship extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.sensualHistory = undefined
    }
}

class TrustLevels {
    static TERRORIZED = "TERRORIZED"
    static FEARFUL = "FEARFUL"                          // Doesn't believe anything said, is sure the other has bad intentions towards them and that they will act on those on the first occasion.
    static CAUTIOUS = "CAUTIOUS"                        // Believes the other will behave in socially acceptable ways, at least for as long as there are witnesses nearby and that the other will keep their word if it is not bothersome to do so. Okay to see target in public places.
    static SAFE = "SAFE"                                // Believes the other will behave in socially acceptable ways even if there are no other people around and that the other will keep their word out of principle. Okay to see target in private places.
    static INTIMATE = "INTIMATE"                        // Believes the other will behave to keep a minor secret safe. Okay to see target in intimate places.
    static FRIENDLY = "FRIENDLY"                        // Believes the other will not act against their interest.
    static CONFIDANTE = "CONFIDANTE"                    // Believes the other will not act against them even if they have power over them and interest in doing so.
    static TERRORIZED_LEVEL = -2
    static FEARFUL_LEVEL = -1
    static CAUTIOUS_LEVEL = 0
    static SAFE_LEVEL = 1
    static INTIMATE_LEVEL = 2
    static FRIENDLY_LEVEL = 3
    static CONFIDANTE_LEVEL = 4
    static getNameFromLevel(level){
        switch (level){
            case TrustLevels.TERRORIZED_LEVEL:
                return TrustLevels.TERRORIZED
            case TrustLevels.FEARFUL_LEVEL:
                return TrustLevels.FEARFUL
            case TrustLevels.CAUTIOUS_LEVEL:
                return TrustLevels.CAUTIOUS
            case TrustLevels.SAFE_LEVEL:
                return TrustLevels.SAFE
            case TrustLevels.INTIMATE_LEVEL:
                return TrustLevels.INTIMATE
            case TrustLevels.FRIENDLY_LEVEL:
                return TrustLevels.FRIENDLY
            case TrustLevels.CONFIDANTE_LEVEL:
                return TrustLevels.CONFIDANTE
            default:
                throw new Error("ERROR: TrustLevels.getNameFromLevel: Can't find level '" + level + "'.")
        }
    }
    static getLevelFromName(name) {
        switch(name){
            case TrustLevels.TERRORIZED:
                return TrustLevels.TERRORIZED_LEVEL
            case TrustLevels.FEARFUL:
                return TrustLevels.FEARFUL_LEVEL
            case TrustLevels.CAUTIOUS:
                return TrustLevels.CAUTIOUS_LEVEL
            case TrustLevels.SAFE:
                return TrustLevels.SAFE_LEVEL
            case TrustLevels.INTIMATE:
                return TrustLevels.INTIMATE_LEVEL
            case TrustLevels.FRIENDLY:
                return TrustLevels.FRIENDLY_LEVEL
            case TrustLevels.CONFIDANTE:
                return TrustLevels.CONFIDANTE_LEVEL
            default:
                throw new Error("ERROR: TrustLevels.getLevelFromName: Can't find name '" + name + "'.")
        }
    }
}

class CharacterRelationshipFeelings extends SugarcubeSerializableObject {
    constructor(){
        this.selfTitle = "" // How the character refers to themself in the relationship. As in "I'm your husband".
        this.isRomantic = false
        this.isSexual = false
        this.isCommited = false
        this.isExclusive = false // Whether the character treats the relationship as exclusive. This, mostly, applies to romantic relationships and/or sexual.
        this.trust = TrustLevels.CAUTIOUS
        this.love = EmpathyLevels.ALOOF
        // - Trust or Fear Elements
        // - Love or Hatred Elements
        // - Entitlement or Debt Elements
        // - Envy Threshold
        // - Envy or Pity Elements
        // - Jealousy Threshold
        // - Jealousy or Security Elements
    }
}

class CharacterRelationshipTargetModel extends SugarcubeSerializableObject {
    constructor(target){
        super()
        this.title = "" // How the character refers to the other part in the relationship. As in "You are my wife".
        this.names = new CharacterNames(target.names.standard, target.names.standardPossessive)
        this.feelings = new CharacterRelationshipFeelings()

        this.friendly = new FriendlyRelationship()
        this.power = new PowerRelationship()
        this.sensual = new SensualRelationship()
        this.bodyTraits = new EvaluatedTraits()
        this.personalityTraits = new EvaluatedTraits()
        this.attainmentTraits = new EvaluatedTraits()
        // Worthiness. A measure of respect.
        // this.profile = undefined // Instance of SocialInteractionPartnerProfile
        // - Intimacy Elements
        // - Superior or Inferior Elements
        // - Useful or Burden Elements
        // ### Consistency
        // - Happy or Sad Elements
        // - Calm or Angry Elements
        // - Safe or Scarred Elements
        // - Excited or Bored Elements
        // - Horny or Disgusted Elements // At the midpoint the character is just "cold"
        // - Stimulated or Tired Elements
        // - Engaged or Disinterested Elements
        // - Emboldened or Humiliated Elements
        // - Intimidated or Humbled Elements
        // - Embarrassed or Reassured Elements
    }
}

class CharactersRelationship extends SugarcubeSerializableObject {
    constructor(target){
        super()
        this.target = target
        this.feelings = new CharacterRelationshipFeelings()
        // this.kind = socialRelationshipKind
        // this.subKind = "" // e.g.: familial-aunt
        // this.title = "" // This is the title of the relationship. e.g.: "marriage". As in "Don't you care for our marriage?"
        // Goals and Anxieties
        // Desires and Dreads
        // Morality Map
        // Obedience
        // this.mood = undefined // Instance of MoodTowardsRelationship
        // this.feelings = undefined // Instance of CharacterRelationshipFeelings
        this.targetModel = new CharacterRelationshipTargetModel(target) // Instance of CharacterRelationshipTargetModel
    }
}

function createStrangersRelationship(target){
    let relationship = new Relationship(target)
    // Kind of relationship is strangers.
    relationship.targetModel.names.standard("Stranger", "Stranger's")
}
