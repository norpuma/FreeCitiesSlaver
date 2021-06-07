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

class CharacterRelationshipTargetModel extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.title = "" // How the character refers to the other part in the relationship. As in "You are my wife".
        this.isRomantic = false
        this.isSexual = false
        this.isExclusive = false // Whether the character believes the other treats the relationship as exclusive. This, mostly, applies to romantic relationships and/or sexual.
        this.friendly = new FriendlyRelationship()
        this.power = new PowerRelationship()
        this.sensual = new SensualRelationship()
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
        // this.kind = socialRelationshipKind
        // this.subKind = "" // e.g.: familial-aunt
        // this.title = "" // As in "Don't you care for our marriage?"
        // Goals and Anxieties
        // Desires and Dreads
        // Morality Map
        // Obedience
        // this.mood = undefined // Instance of MoodTowardsRelationship
        // this.feelings = undefined // Instance of CharacterRelationshipFeelings
        this.targetModel = new CharacterRelationshipTargetModel() // Instance of CharacterRelationshipTargetModel
        }
}
