function generateDefaultSmallTalkPreferences(gender, preferencesPreset){
    let preferences = new ApprovalEvaluation()
    if (gender == Gender.FEMALE){
        preferences.addApprovalTrait(ApprovalEvaluation.ADDING_TO_APPROVAL, TraitCategory.BODY, CharacterBodyTraits.FITNESS, new ThresholdEvaluation(TraitIntensity.MODERATELY_LEVEL, TraitIntensity.MODERATELY_LEVEL, true, 10, 1))
    } else {
        preferences.addApprovalTrait(ApprovalEvaluation.ADDING_TO_APPROVAL, TraitCategory.BODY, CharacterBodyTraits.FITNESS, new ThresholdEvaluation(TraitIntensity.MODERATELY_LEVEL, TraitIntensity.MODERATELY_LEVEL, true, 10, 1))
    }
}

class IntimacyProfile extends SugarcubeSerializableObject {
    constructor(intimacyLevel, socialStaminaForIntimacyLevel, satisfactionThreshold, intimacyUpgradeThreshold, approvalEvaluation){
        super()
        this.intimacyLevel = intimacyLevel
        if (socialStaminaForIntimacyLevel === undefined){
            socialStaminaForIntimacyLevel = 5
        }
        if (satisfactionThreshold === undefined){
            satisfactionThreshold = EffectLevel.DEFAULT_THRESHOLD
        }
        this.satisfactionThreshold = satisfactionThreshold
        if (intimacyUpgradeThreshold === undefined){
            intimacyUpgradeThreshold = EffectLevel.DEFAULT_THRESHOLD
        }
        this.intimacyUpgradeThreshold = intimacyUpgradeThreshold // This is a value of stimulation a character must reach before upgrading to the next Arousal level. This may be split in Physical and Psychological stimuli.
        this.approvalEvaluation = approvalEvaluation
    }
}
