class CharacterBodyTraits {
    static GENDER = "GENDER"
    static AGE_GROUP = "AGE_GROUP"
    static ETHNICITY = "ETHNICITY"
    static FITNESS = "FITNESS"
    static BODY_FAT_BALANCE = "BODY_FAT_BALANCE"
    static BODY_FAT_LEVEL = "BODY_FAT_LEVEL"
    static FACE_ATTRACTIVENESS = "FACE_ATTRACTIVENESS"
    static TALLNESS = "TALLNESS"
    static SHAPELY_BUTT = "SHAPELY_BUTT"
    static BREASTS_SIZE = "BREASTS_SIZE"
    static PENIS_SIZE = "PENIS_SIZE"
    static getTraitQualifierAndLevel(traitName, perspectiveOwner, perspectiveTarget){
        if (perspectiveTarget instanceof EvaluatedTraits){
            return perspectiveTarget.getTrait(traitName)
        }
        switch(traitName){
            case CharacterBodyTraits.GENDER:
                return new TraitQualifierAndLevel(perspectiveTarget.body.gender, undefined)
            case CharacterBodyTraits.AGE_GROUP:
                return new TraitQualifierAndLevel(ageGroupFromAge(perspectiveTarget.body.age), perspectiveTarget.body.age)
            case CharacterBodyTraits.ETHNICITY:
                return new TraitQualifierAndLevel(perspectiveTarget.body.ethnicity, undefined)
            case CharacterBodyTraits.FITNESS:
                return new TraitQualifierAndLevel(perspectiveTarget.body.fitness, TraitIntensity.getTraitLevelFromTrait(perspectiveTarget.body.fitness))
            case CharacterBodyTraits.BODY_FAT_BALANCE:
                return new TraitQualifierAndLevel(perspectiveTarget.body.bodyFatBalance, undefined)
            case CharacterBodyTraits.BODY_FAT_LEVEL:
                return new TraitQualifierAndLevel(undefined, perspectiveTarget.body.bodyFatLevel)
            case CharacterBodyTraits.FACE_ATTRACTIVENESS:
                return new TraitQualifierAndLevel(undefined, perspectiveTarget.body.bodyParts.FACE.value)
            case CharacterBodyTraits.TALLNESS:
                return new TraitQualifierAndLevel(undefined, perspectiveTarget.body.heightGroup)
            case CharacterBodyTraits.SHAPELY_BUTT:
                if (TraitIntensity.getTraitLevelFromTrait(perspectiveTarget.body.fitness) < TraitIntensity.MODERATELY_LEVEL){
                    return new TraitQualifierAndLevel("UNFIT_" + BodyPartSize.getNameFromLevel(perspective.body.bodyParts.BUTT.size) + "_BUTT", undefined)
                } else {
                    return new TraitQualifierAndLevel("FIT_" + BodyPartSize.getNameFromLevel(perspective.body.bodyParts.BUTT.size) + "_BUTT", undefined)
                }
            case CharacterBodyTraits.BREASTS_SIZE:
                return new TraitQualifierAndLevel(perspectiveTarget.body.bodyParts.breasts.size, undefined)
            case CharacterBodyTraits.PENIS_SIZE:
                if (perspectiveTarget.body.bodyParts.penis === undefined){
                    return new TraitQualifierAndLevel(undefined, undefined)
                }
                return new TraitQualifierAndLevel(perspectiveTarget.body.bodyParts.penis.size, undefined)
            default:
                throw new Error("Error: CharacterBodyTraits.getTraitQualifierAndLevel: Can't find trait '" + traitName + "' among CharacterBodyTraits.")
        }
    }
    // This returns a list of Traits that can be perceived at a glance.
    static getTraitsAtAGlance(perspectiveOwner, perspectiveTarget){
        let observedTraits = new Map()
        let gender = perspectiveTarget.body.gender
        observedTraits.set(CharacterBodyTraits.GENDER, CharacterBodyTraits.getTraitQualifierAndLevel(CharacterBodyTraits.GENDER, perspectiveOwner, perspectiveTarget))
        observedTraits.set(CharacterBodyTraits.AGE_GROUP, CharacterBodyTraits.getTraitQualifierAndLevel(CharacterBodyTraits.AGE_GROUP, perspectiveOwner, perspectiveTarget))
        observedTraits.set(CharacterBodyTraits.ETHNICITY, CharacterBodyTraits.getTraitQualifierAndLevel(CharacterBodyTraits.ETHNICITY, perspectiveOwner, perspectiveTarget))
        observedTraits.set(CharacterBodyTraits.BODY_FAT_APPEARANCE_GROUP, CharacterBodyTraits.getTraitQualifierAndLevel(CharacterBodyTraits.BODY_FAT_APPEARANCE_GROUP, perspectiveOwner, perspectiveTarget))
        if (gender == Gender.FEMALE){
            observedTraits.set(CharacterBodyTraits.BREASTS_SIZE, CharacterBodyTraits.getTraitQualifierAndLevel(CharacterBodyTraits.BREASTS_SIZE, perspectiveOwner, perspectiveTarget))
        }
        observedTraits.set(CharacterBodyTraits.TALLNESS, CharacterBodyTraits.getTraitQualifierAndLevel(CharacterBodyTraits.TALLNESS, perspectiveOwner, perspectiveTarget))
        return observedTraits
    }
}

class CharacterBodyTraits_ORIG {
    static FAT = "FAT"
    static VERY_FAT = "VERY_FAT"
    static FIT = "FIT"
    static VERY_FIT = "VERY_FIT"
    static OLD = "OLD"
    static VERY_OLD = "VERY_OLD"
    static OLDER = "OLDER"
    static MUCH_OLDER = "MUCH_OLDER"
    static BALD = "BALD"
    static TALL = "TALL"
    static SHORT = "SHORT"
    static THIN = "THIN"
    static BIG_TITS = "BIG_TITS"
    static SMALL_TITS = "SMALL_TITS"
    static BIG_COCK = "BIG_COCK"
    static SMALL_COCK = "SMALL_COCK"
    static evaluate_FAT(character){
        if ((character === undefined) || (character.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        switch (character.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.AVERAGE:
                return TraitIntensity.INSIGNIFICANTLY_LEVEL
            case BodyFatAppearanceGroup.ROUNDED:
                return TraitIntensity.MODERATELY_LEVEL
            case BodyFatAppearanceGroup.VOLUPTUOUS:
                return TraitIntensity.MODERATELY_LEVEL
            case BodyFatAppearanceGroup.CHUBBY:
                return TraitIntensity.MODERATELY_LEVEL
            case BodyFatAppearanceGroup.FAT:
                return TraitIntensity.SIGNIFICANTLY_LEVEL
            case BodyFatAppearanceGroup.ENORMOUS:
                return TraitIntensity.EXTREMELY_LEVEL
            default:
                // case BodyFatAppearanceGroup.THIN:
                // case BodyFatAppearanceGroup.SLIM:
                // case BodyFatAppearanceGroup.MUSCULAR:
                // case BodyFatAppearanceGroup.ATHLETIC:
                // case BodyFatAppearanceGroup.FIT:
                return TraitIntensity.NOT_LEVEL
        }
    }
    static evaluate_VERY_FAT(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        switch (evaluatedCharacter.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.FAT:
                return TraitIntensity.INSIGNIFICANTLY_LEVEL
            case BodyFatAppearanceGroup.ENORMOUS:
                return TraitIntensity.SIGNIFICANTLY_LEVEL
            default:
                // case BodyFatAppearanceGroup.THIN:
                // case BodyFatAppearanceGroup.SLIM:
                // case BodyFatAppearanceGroup.MUSCULAR:
                // case BodyFatAppearanceGroup.ATHLETIC:
                // case BodyFatAppearanceGroup.FIT:
                // case BodyFatAppearanceGroup.AVERAGE:
                // case BodyFatAppearanceGroup.ROUNDED:
                // case BodyFatAppearanceGroup.VOLUPTUOUS:
                // case BodyFatAppearanceGroup.CHUBBY:
                return TraitIntensity.NOT_LEVEL
        }
    }
    static evaluate_FIT(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        switch (evaluatedCharacter.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.AVERAGE:
                return TraitIntensity.INSIGNIFICANTLY_LEVEL
            case BodyFatAppearanceGroup.FIT:
                return TraitIntensity.SIGNIFICANTLY_LEVEL
            case BodyFatAppearanceGroup.ATHLETIC:
                return TraitIntensity.VERY_LEVEL
            case BodyFatAppearanceGroup.MUSCULAR:
                return TraitIntensity.EXTREMELY_LEVEL
            default:
                // case BodyFatAppearanceGroup.THIN:
                // case BodyFatAppearanceGroup.SLIM:
                // case BodyFatAppearanceGroup.ATHLETIC:
                // case BodyFatAppearanceGroup.FIT:
                // case BodyFatAppearanceGroup.AVERAGE:
                // case BodyFatAppearanceGroup.ROUNDED:
                // case BodyFatAppearanceGroup.VOLUPTUOUS:
                // case BodyFatAppearanceGroup.CHUBBY:
                // case BodyFatAppearanceGroup.FAT:
                // case BodyFatAppearanceGroup.ENORMOUS:
                    return TraitIntensity.NOT_LEVEL
        }
    }
    static evaluate_VERY_FIT(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        switch (evaluatedCharacter.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.FIT:
                return TraitIntensity.INSIGNIFICANTLY_LEVEL
            case BodyFatAppearanceGroup.ATHLETIC:
                return TraitIntensity.MODERATELY_LEVEL
            case BodyFatAppearanceGroup.MUSCULAR:
                return TraitIntensity.SIGNIFICANTLY_LEVEL
            default:
                // case BodyFatAppearanceGroup.THIN:
                // case BodyFatAppearanceGroup.SLIM:
                // case BodyFatAppearanceGroup.ATHLETIC:
                // case BodyFatAppearanceGroup.FIT:
                // case BodyFatAppearanceGroup.AVERAGE:
                // case BodyFatAppearanceGroup.ROUNDED:
                // case BodyFatAppearanceGroup.VOLUPTUOUS:
                // case BodyFatAppearanceGroup.CHUBBY:
                // case BodyFatAppearanceGroup.FAT:
                // case BodyFatAppearanceGroup.ENORMOUS:
                    return TraitIntensity.NOT_LEVEL
        }
    }
    static evaluate_OLD(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatedCharacterAgeGroup){
            case AgeGroup.ADULT:
                return TraitIntensity.INSIGNIFICANTLY_LEVEL
            case AgeGroup.MATURE_ADULT:
                return TraitIntensity.SIGNIFICANTLY_LEVEL
            case AgeGroup.ELDER:
                return TraitIntensity.VERY_LEVEL
            default:
                // case AgeGroup.TEENAGER:
                // case AgeGroup.YOUNG_ADULT:
                return TraitIntensity.NOT_LEVEL
        }
    }
    static evaluate_VERY_OLD(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatedCharacterAgeGroup){
            case AgeGroup.MATURE_ADULT:
                return TraitIntensity.INSIGNIFICANTLY_LEVEL
            case AgeGroup.ELDER:
                return TraitIntensity.SIGNIFICANTLY_LEVEL
            default:
                // case AgeGroup.TEENAGER:
                // case AgeGroup.YOUNG_ADULT:
                // case AgeGroup.ADULT:
                return TraitIntensity.NOT_LEVEL
        }
    }
    static evaluate_OLDER(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        if ((evaluatingCharacter === undefined) || (evaluatingCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        let evaluatingCharacterAgeGroup = ageGroupFromAge(evaluatingCharacter.body.age)
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatingCharacterAgeGroup){
            case AgeGroup.TEENAGER:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.YOUNG_ADULT:
                        return TraitIntensity.MODERATELY_LEVEL
                    case AgeGroup.ADULT:
                        return TraitIntensity.SIGNIFICANTLY_LEVEL
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.EXTREMELY_LEVEL
                    case AgeGroup.ELDER:
                        return TraitIntensity.EXCESSIVELY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            case AgeGroup.YOUNG_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ADULT:
                        return TraitIntensity.MODERATELY_LEVEL
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.SIGNIFICANTLY_LEVEL
                    case AgeGroup.ELDER:
                        return TraitIntensity.EXTREMELY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            case AgeGroup.ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.SIGNIFICANTLY_LEVEL
                    case AgeGroup.ELDER:
                        return TraitIntensity.MODERATELY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            case AgeGroup.MATURE_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ELDER:
                        return TraitIntensity.SIGNIFICANTLY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            default:
                return TraitIntensity.NOT_LEVEL
        }
    }
    static evaluate_MUCH_OLDER(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        if ((evaluatingCharacter === undefined) || (evaluatingCharacter.body === undefined)) {
            return TraitIntensity.NOT_LEVEL
        }
        let evaluatingCharacterAgeGroup = ageGroupFromAge(evaluatingCharacter.body.age)
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatingCharacterAgeGroup){
            case AgeGroup.TEENAGER:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.YOUNG_ADULT:
                        return TraitIntensity.INSIGNIFICANTLY_LEVEL
                    case AgeGroup.ADULT:
                        return TraitIntensity.MODERATELY_LEVEL
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.SIGNIFICANTLY_LEVEL
                    case AgeGroup.ELDER:
                        return TraitIntensity.EXTREMELY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            case AgeGroup.YOUNG_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ADULT:
                        return TraitIntensity.INSIGNIFICANTLY_LEVEL
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.MODERATELY_LEVEL
                    case AgeGroup.ELDER:
                        return TraitIntensity.SIGNIFICANTLY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            case AgeGroup.ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.INSIGNIFICANTLY_LEVEL
                    case AgeGroup.ELDER:
                        return TraitIntensity.SIGNIFICANTLY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            case AgeGroup.MATURE_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ELDER:
                        return TraitIntensity.INSIGNIFICANTLY_LEVEL
                    default:
                        return TraitIntensity.NOT_LEVEL
                }
            default:
                return TraitIntensity.NOT_LEVEL
        }
    }
}

class CharacterPersonalityTraits {
    static EMPATHY = "EMPATHY"
    static SUBMISSIVENESS = "SUBMISSIVENESS"
    static CONFIDENCE = "CONFIDENCE"
    static COURAGE = "COURAGE"
    static SEXUAL_LIBERTY = "SEXUAL_LIBERTY"
    static DUTIFULNESS = "DUTIFULNESS"
    static MORALITY = "MORALITY"
    static SOCIABILITY = "SOCIABILITY"

    static TASTE_STYLE = "TASTE_STYLE"
    static getTraitQualifierAndLevel(traitName, perspectiveOwner, perspectiveTarget){
        switch(traitName){
            case CharacterPersonalityTraits.EMPATHY:
                return new TraitQualifierAndLevel(perspectiveTarget.personality.empathy, EmpathyLevels.getLevelFromName(perspectiveTarget.personality.empathy))
            case CharacterPersonalityTraits.SUBMISSIVENESS:
                return new TraitQualifierAndLevel(perspectiveTarget.personality.submission, SubmissivenessLevels.getLevelFromName(perspectiveTarget.personality.submission))
            case CharacterPersonalityTraits.CONFIDENCE:
                return new TraitQualifierAndLevel(undefined, perspectiveTarget.personality.getSelfWorth())
            case CharacterPersonalityTraits.COURAGE:
                return new TraitQualifierAndLevel(perspectiveTarget.personality.courage, undefined)
            case CharacterPersonalityTraits.SEXUAL_LIBERTY:
                return new TraitQualifierAndLevel(perspectiveTarget.personality.sexualLiberty, undefined)
            case CharacterPersonalityTraits.DUTIFULNESS:
                return new TraitQualifierAndLevel(perspectiveTarget.personality.dutifulness, undefined)
            case CharacterPersonalityTraits.MORALITY:
                return new TraitQualifierAndLevel(perspectiveTarget.personality.morality, undefined)
            case CharacterPersonalityTraits.SOCIABILITY:
                return new TraitQualifierAndLevel(perspectiveTarget.personality.sociability, undefined)
            case CharacterPersonalityTraits.TASTE_STYLE:
                throw new Error("ERROR: CharacterPersonalityTraits.getTraitQualifierAndLevel: TASTE_STYLE trait is not yet defined in CharacterPersonality.")
            default:
                throw new Error("ERROR: CharacterPersonalityTraits.getTraitQualifierAndLevel: Can't find '"+ traitName + "' amid CharacterPersonalityTraits.")
        }
    }
}

class CharacterAttitudeTraits {
    static SMUGNESS = "SMUGNESS" // Guided by CONFIDENCE
    static NICENESS = "NICENESS" // Guided by EMPATHY
    static DECORUM = "DECORUM" // Guided by SEXUAL_LIBERTY
    static CHARM = "CHARM" // Entertaining/Charming
    static DILIGENCE = "DILIGENCE" // Guided by DUTIFULNESS
    static BRAVERY = "BRAVERY" // Guided by COURAGE
    static FLIRTINESS = "FLIRTINESS"

    static GENEROSITY = "GENEROSITY"
    static ROMANTICISM = "ROMANTICISM"
    static BOASTFULNESS = "BOASTFULNESS"
    static FLATTERY = "FLATTERY"
    static HONESTY = "HONESTY"
    static OBSEQUIOUSNESS = "OBSEQUIOUSNESS" // This is a mix of smugness, niceness and submissiveness to people the character sees as superior. Go from NOT to EXCESSIVELY. Most people are MODERATELY.
    // This should be handled by SMUGNESS
    // static HUMILITY = "HUMILITY"
    static IRASCIBILITY = "IRASCIBILITY"
    static WEEPINESS = "WEEPINESS"
    static POLITENESS = "POLITENESS"
    static getTraitQualifierAndLevel(traitName, perspectiveOwner, perspectiveTarget){
        let context = CharacterAttitude.GENERAL_CONTEXT
        let targetPerspective = perspectiveTarget.relationships.get(perspectiveOwner)
        if (targetPerspective !== undefined){
            if (TrustLevels.getLevelFromName(targetPerspective.targetModel.feelings.trust) >= TrustLevels.INTIMATE_LEVEL){
                context = CharacterAttitude.INTIMATE_CONTEXT
                if (targetPerspective.targetModel.feelings.isSexual == true){
                    context = CharacterAttitude.LOVERS_CONTEXT
                }
            }
        }
        let qualifier = undefined
        switch(traitName){
            case CharacterAttitudeTraits.SMUGNESS:
                qualifer = perspectiveTarget.personality.attitude.getTrait(CharacterAttitudeBase.SMUGNESS, context)
                return new TraitQualifierAndLevel(qualifier, PrideLevels.getLevelFromName(qualifier))
            case CharacterAttitudeTraits.NICENESS:
                qualifier = perspectiveTarget.personality.attitude.getTrait(CharacterAttitudeBase.NICENESS, context)
                return new TraitQualifierAndLevel(qualifier, EmpathyLevels.getLevelFromName(qualifier))
            case CharacterAttitudeTraits.DECORUM:
                qualifier = perspectiveTarget.personality.attitude.getTrait(CharacterAttitudeBase.DECORUM, context)
                return new TraitQualifierAndLevel(qualifier, DecorumLevels.getLevelFromName(qualifier))
            case CharacterAttitudeTraits.CHARM:
                return new TraitQualifierAndLevel(undefined, perspectiveTarget.attainments.charm)
            case CharacterAttitudeTraits.DILIGENCE:
                qualifier = perspectiveTarget.personality.attitude.getTrait(CharacterAttitudeBase.DILIGENCE, context)
                return new TraitQualifierAndLevel(qualifier, DecorumLevels.getLevelFromName(qualifier))
            case CharacterAttitudeTraits.BRAVERY:
                qualifier = perspectiveTarget.personality.attitude.getTrait(CharacterAttitudeBase.BRAVERY, context)
                return new TraitQualifierAndLevel(qualifier, DecorumLevels.getLevelFromName(qualifier))
            case CharacterAttitudeTraits.FLIRTINESS:
                qualifier = perspectiveTarget.personality.attitude.getTrait(CharacterAttitudeBase.FLIRTINESS, context)
                return new TraitQualifierAndLevel(qualifier, DecorumLevels.getLevelFromName(qualifier))
            default:
                throw new Error("ERROR: CharacterAttitudeTraits.getTraitQualifierAndLevel: Can't find '"+ traitName + "' amid CharacterAttitudeTraits.")
        }
    }
}

// class CharacterPersonalityTraits_ORIG {
//     static NICENESS = "NICE"
//     static SWEET = "SWEET"
//     static OBSEQUIOUS = "OBSEQUIOUS"
//     static CONFIDENCE = "CONFIDENT"
//     static ARROGANT = "ARROGANT"
//     static DECORUM = "DECOROUS"
//     static VULGAR = "VULGAR"
//     static DUTIFUL = "DUTIFUL"
//     static SLOVENLY = "SLOVENLY"
//     static BRAVE = "BRAVE"
//     static WIMP = "WIMP"
//     static COWARDLY = "COWARDLY"
//     static HONEST = "HONEST"
//     static DISHONEST = "DISHONEST"
//     static GENEROUS = "GENEROUS"
//     static HUMBLE = "HUMBLE"
//     static BOASTFUL = "BOASTFUL"
//     static OFFENSIVE = "OFFENSIVE"
//     static CRUEL = "CRUEL"
//     static ROMANTIC = "ROMANTIC"
//     static SOPHISTICATED = "SOPHISTICATED"
//     static VULGAR_TASTES = "VULGAR_TASTES"
//     static NERDY = "NERDY"
//     static SIMPLE_TASTES = "SIMPLE_TASTES"
//     static EXPANSIE_TASTES = "EXPANSIE_TASTES"
// }

class CharacterInvestmentAttainmentTraits {
    static FASHION = "FASHION"
    static PERSONAL_CARE = "PERSONAL_CARE"
    static WEALTH = "WEALTH"
    static PROFESSIONAL_SKILL = "PROFESSIONAL_SKILL"
    static KNOWLEDGE = "KNOWLEDGE"
    static CHARM = "CHARM" // Entertaining/Charming
}

class CharacterAcquiredTraits {
    static HAIR_COLOR = "HAIR_COLOR"
    static HAIR_QUALITIES = "HAIR_QUALITIES"
}

class CharacterInterpersonalHistoryAttainments {
    static GOOD_LISTENER = "GOOD_LISTENER"
    static FLATTERING = "FLATTERING"
}

class CharacterPublicPersonaHistoryAttainments {
    static FAME = "FAME"
    static DANGEROUS = "DANGEROUS"
    static VIOLENT = "VIOLENT"
    static RELATIONSHIP_STATUS = "COMMITTED_RELATIONSHIP"
    static INFLUENCE = "INFLUENCE"
    static ECONOMIC_STABILITY = "ECONOMIC_STABILITY"
    static SLAVING_SOCIETY_STATUS = "SLAVING_SOCIETY_STATUS"
    static EMPLOYMENT_KIND = "EMPLOYMENT_KIND"
}

class TraitQualification extends SugarcubeSerializableObject {
    constructor(traitName, traitCategory, hiddenLevel){
        super()
        this.traitName = traitName
        this.traitCategory = traitCategory
        this.hiddenLevel = hiddenLevel
        this.prideEvaluations = new Array()
        this.respectEvaluations = new Array()
        this.socialEvaluations = new Array()
        this.sensualEvaluationsTowardsMales = new Array()
        this.sensualEvaluationsTowardsFemales = new Array()
    }
}
