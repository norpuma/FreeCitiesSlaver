class CharacterMood extends SugarcubeSerializableObject {
    static HAPPY_OR_SAD = "HAPPY_OR_SAD"
    static CALM_OR_ANGRY = "CALM_OR_ANGRY"
    static SAFE_OR_SCARRED = "SAFE_OR_SCARRED"
    static EXCITED_OR_BORED = "EXITED_OR_BORED"
    constructor(){
        super()
        this.dominantMood = CharacterMood.HAPPY_OR_SAD
        this.intensity = TraitIntensity.NOT_LEVEL
    }
    isPositive(){
        if (this.intensity > 0){
            return true
        } else {
            return false
        }
    }
}

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

