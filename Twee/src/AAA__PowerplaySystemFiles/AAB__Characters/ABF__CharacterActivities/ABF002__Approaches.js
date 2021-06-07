class ApproachStrategy {
    static POLITE = "POLITE"
    static BRASH = "BRASH"
    static OFFENSIVE = "OFFENSIVE"
    static PEACOCKING = "PEACOCKING"
    static SUBTLE = "SUBTLE"
}

function approach(approachingCharacter, approachedTarget, approachStrategy){
    let approachingCharacterPerspective = approachingCharacter.relationships.get(approachedTarget)
    if (approachingCharacterPerspective === undefined){
        lookAt(approachingCharacter, approachedTarget)
        approachingCharacterPerspective = approachingCharacter.relationships.get(approachedTarget)
    }
    let approachedTargetPerspective = undefined
    let charmLevel = 0
    switch (approachStrategy){
        case ApproachStrategy.POLITE:
            lookAt(approachedTarget, approachingCharacter)
            approachedTargetPerspective = approachedTarget.relationships.get(approachingCharacter)
            approachedTargetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterPersonalityTraits.EMPATHY, new TraitQualifierAndLevel(EmpathyLevels.SWEET, EmpathyLevels.SWEET_SCORE), 0.2)
            approachedTargetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterPersonalityTraits.SUBMISSIVENESS, new TraitQualifierAndLevel(SubmissivenessLevels.DEFERENTIAL, SubmissivenessLevels.DEFERENTIAL_LEVEL), 0.2)
            approachedTargetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterAttitudeTraits.CHARM, new TraitQualifierAndLevel(TraitIntensity.MODERATELY, TraitIntensity.MODERATELY_LEVEL), 0.2)
            break
        case ApproachStrategy.BRASH:
            lookAt(approachedTarget, approachingCharacter)
            approachedTargetPerspective = approachedTarget.relationships.get(approachingCharacter)
            charmLevel = approachingCharacter.attainments.getTrait(CharacterInvestmentAttainmentTraits.CHARM).levelNumber
            if (charmLevel > TraitIntensity.NOT_LEVEL){
                charmLevel -= 1
            }
            approachedTargetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterAttitudeTraits.CHARM, new TraitQualifierAndLevel(TraitIntensity.getNameFromLevel(charmLevel), charmLevel), 0.2)
            break
        // case ApproachStrategy.OFFENSIVE:
        //     lookAt(approachedTarget, approachingCharacter)
        //     approachedTargetPerspective = approachedTarget.relationships.get(approachingCharacter)
        //     approachedTargetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterPersonalityTraits.EMPATHY, new TraitQualifierAndLevel(EmpathyLevels.CALLOUS, EmpathyLevels.CALLOUS_LEVEL), 0.2)
        //     approachedTargetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterPersonalityTraits.SUBMISSIVENESS, new TraitQualifierAndLevel(SubmissivenessLevels.REBELLIOUS, SubmissivenessLevels.REBELLIOUS_LEVEL), 0.2)
        //     charmLevel = approachingCharacter.attainments.getTrait(CharacterInvestmentAttainmentTraits.CHARM).levelNumber
        //     if (offenseChallengeWinner(approachingCharacter, approachedTarget) == approachingCharacter){

        //     }
        //     if ((charmLevel > TraitIntensity.NOT_LEVEL) && (charmLevel < TraitIntensity.SIGNIFICANTLY_LEVEL)){
        //         charmLevel -= 1
        //     }
        //     approachedTargetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterAttitudeTraits.CHARM, new TraitQualifierAndLevel(TraitIntensity.getNameFromLevel(charmLevel), charmLevel), 0.2)
        //     break
    }
}
