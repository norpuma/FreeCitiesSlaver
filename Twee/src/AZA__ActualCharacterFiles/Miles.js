function createMiles(){
    let character = new BaseCharacter("Miles", Gender.MALE)

    let qualifiedTrait = undefined

    // ---------------- PERSONALITY -------------------
    let generalAttitude = new CharacterAttitudeBase()
    let attitudeAmongFriends = new CharacterAttitudeBase()
    let attitudeWithLovers = new CharacterAttitudeBase()
    let combinedAttitude = new CharacterAttitude(generalAttitude, attitudeAmongFriends, attitudeWithLovers)

    character.personality = new CharacterPersonality(undefined, undefined, PersonalityPresets.MEEK)
    character.personality.attitude = combinedAttitude

    character.personality.empathy = EmpathyLevels.AMIABLE
    generalAttitude.niceness = EmpathyLevels.AMIABLE
    qualifiedTrait = new TraitQualification(CharacterPersonalityTraits.EMPATHY, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterPersonalityTraits.EMPATHY, qualifiedTrait)

    character.personality.submissiveness = SubmissivenessLevels.DEFERENTIAL
    qualifiedTrait = new TraitQualification(CharacterPersonalityTraits.SUBMISSIVENESS, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterPersonalityTraits.SUBMISSIVENESS, qualifiedTrait)
    qualifiedTrait.respectEvaluations.push(function(perspectiveOwner, perspectiveTarget){
        if (CharacterPersonalityTraits.getTraitQualifierAndLevel(CharacterPersonalityTraits.SUBMISSIVENESS).levelNumber >= SubmissivenessLevels.DEFERENTIAL_LEVEL)
            return -1 * TraitIntensity.MODERATELY_LEVEL
    })

    generalAttitude.smugness = PrideLevels.TIMID
    attitudeAmongFriends.smugness = PrideLevels.HUMBLE
    qualifiedTrait = new TraitQualification(CharacterPersonalityTraits.CONFIDENCE, TraitCategory.PERSONALITY, TraitIntensity.MODERATELY_LEVEL)
    character.personality.qualifiedTraits.set(CharacterPersonalityTraits.CONFIDENCE, qualifiedTrait)
    qualifiedTrait.respectEvaluations.push(function (perspectiveOwner, perspectiveTarget){
        if (CharacterPersonalityTraits.getTraitQualifierAndLevel(CharacterPersonalityTraits.CONFIDENCE).levelNumber >= PrideLevels.PROUD_LEVEL)
            return TraitIntensity.MODERATELY_LEVEL
    })
    qualifiedTrait = new TraitQualification(CharacterAttitudeTraits.SMUGNESS, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterAttitudeTraits.SMUGNESS, qualifiedTrait)
    qualifiedTrait.socialEvaluations.push(function(perspectiveOwner, perspectiveTarget){
        // let targetPerspective = perspectiveTarget.relationships.get(perspectiveOwner)
        // let intimacyFeltByTarget = TrustLevels.CAUTIOUS_LEVEL
        // if (targetPerspective !== undefined){
        //     intimacyFeltByTarget = TrustLevels.getLevelFromName(targetPerspective.feelings.trust)
        // }
        // let smugness = CharacterAttitudeTraits.getTraitQualifierAndLevel(CharacterAttitudeTraits.SMUGNESS, CharacterAttitude.GENERAL_CONTEXT).levelNumber
        // if (intimacyFeltByTarget >= TrustLevels.FRIENDLY_LEVEL){
        //     smugness = CharacterAttitudeTraits.getTraitQualifierAndLevel(CharacterAttitudeTraits.SMUGNESS, CharacterAttitude.INTIMATE_CONTEXT).levelNumber
        // }
        // if ((targetPerspective !== undefined) && (targetPerspective.feelings.isRomantic || targetPerspective.feelings.isSexual) && (targetPerspective.targetModel.feelings.isRomantic || targetPerspective.targetModel.feelings.isSexual)){
        //     smugness = CharacterAttitudeTraits.getTraitQualifierAndLevel(CharacterAttitudeTraits.SMUGNESS, CharacterAttitude.LOVERS_CONTEXT).levelNumber
        // }
        let smugness = CharacterAttitudeTraits.getTraitQualifierAndLevel(CharacterAttitudeTraits.SMUGNESS).levelNumber
        if (smugness >= PrideLevels.ARROGANT_LEVEL){
            return -1 * TraitIntensity.SIGNIFICANTLY_LEVEL
        }
        if ((smugness == PrideLevels.HUMBLE_LEVEL) || (smugness == PrideLevels.MODEST_LEVEL)) {
            return TraitIntensity.MODERATELY_LEVEL
        }
    })
    qualifiedTrait.sensualEvaluationsTowardsFemales.push(function(perspectiveOwner, perspectiveTarget){
        let smugness = CharacterAttitudeTraits.getTraitQualifierAndLevel(CharacterAttitudeTraits.SMUGNESS).levelNumber
        if (smugness <= PrideLevels.SHY_LEVEL) {
            return -1 * TraitIntensity.MODERATELY_LEVEL
        }
    })

    character.personality.courage = CourageLevels.COWARDLY
    qualifiedTrait = new TraitQualification(CharacterPersonalityTraits.COURAGE, TraitCategory.PERSONALITY, TraitIntensity.MODERATELY_LEVEL)
    character.personality.qualifiedTraits.set(CharacterPersonalityTraits.COURAGE, qualifiedTrait)
    generalAttitude.bravery = CourageLevels.CAUTIOUS
    qualifiedTrait = new TraitQualification(CharacterAttitudeTraits.BRAVERY, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterAttitudeTraits.BRAVERY, qualifiedTrait)

    character.personality.sexual_liberty = SexualLibertyLevels.UNCERTAIN
    qualifiedTrait = new TraitQualification(CharacterPersonalityTraits.SEXUAL_LIBERTY, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterPersonalityTraits.SEXUAL_LIBERTY, qualifiedTrait)
    generalAttitude.decorum = DecorumLevels.UNCONCERNED
    qualifiedTrait = new TraitQualification(CharacterAttitudeTraits.DECORUM, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterAttitudeTraits.DECORUM, qualifiedTrait)

    character.personality.dutifulness = DutifulnessLevels.FAIRLY_DUTIFUL
    qualifiedTrait = new TraitQualification(CharacterPersonalityTraits.DUTIFULNESS, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterPersonalityTraits.DUTIFULNESS, qualifiedTrait)
    generalAttitude.diligence = DutifulnessLevels.FAIRLY_DUTIFUL
    qualifiedTrait = new TraitQualification(CharacterAttitudeTraits.DILIGENCE, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterAttitudeTraits.DILIGENCE, qualifiedTrait)

    character.personality.sociability = SociabilityLevels.WITHDRAWN
    qualifiedTrait = new TraitQualification(CharacterPersonalityTraits.SOCIABILITY, TraitCategory.PERSONALITY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterPersonalityTraits.SOCIABILITY, qualifiedTrait)




    // ------------------- BODY -----------------------
    character.body = new CharacterBody(Gender.MALE, 19)
    qualifiedTrait = new TraitQualification(CharacterBodyTraits.GENDER, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    qualifiedTrait.sensualEvaluations.push(function(perspectiveOwner, perspectiveTarget){ if (CharacterBodyTraits.getTraitQualifierAndLevel(CharacterBodyTraits.GENDER).qualifierString == Gender.MALE) return -1 * TraitIntensity.SIGNIFICANTLY_LEVEL})
    character.personality.qualifiedTraits.set(CharacterBodyTraits.GENDER, qualifiedTrait)

    qualifiedTrait = new TraitQualification(CharacterBodyTraits.AGE_GROUP, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    qualifiedTrait.respectEvaluations.push(function(perspectiveOwner, perspectiveTarget){ let ageGroup = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.AGE_GROUP); if ((ageGroup == AgeGroup.MATURE_ADULT) || (ageGroup == AgeGroup.ELDER)) return TraitIntensity.SIGNIFICANTLY_LEVEL})
    qualifiedTrait.sensualEvaluationsTowardsFemales.push(function(perspectiveOwner, perspectiveTarget){ let ageGroup = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.AGE_GROUP); if (ageGroup == AgeGroup.ELDER){ return -1 * TraitIntensity.EXTREMELY_LEVEL} else if (ageGroup == AgeGroup.MATURE_ADULT) {return -1 * TraitIntensity.MODERATELY_LEVEL}})
    character.personality.qualifiedTraits.set(CharacterBodyTraits.AGE_GROUP, qualifiedTrait)

    character.body.ethnicity = Ethnicity.CAUCASIAN
    qualifiedTrait = new TraitQualification(CharacterBodyTraits.ETHNICITY, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterBodyTraits.ETHNICITY, qualifiedTrait)

    character.body.fitness = TraitIntensity.INSIGNIFICANTLY_LEVEL
    qualifiedTrait = new QualifiedTrait(CharacterBodyTraits.FITNESS, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    qualifiedTrait.prideEvaluations.push(function(perspectiveOwner, perspectiveTarget){ let fitnessLevel = perspectiveOwner.body.getTraitQualifierAndLevel(CharacterBodyTraits.FITNESS); if (fitnessLevel <= TraitIntensity.MODERATELY_LEVEL){ return (TraitIntensity.MODERATELY_LEVEL - fitnessLevel - 1)} else { return (fitnessLevel - TraitIntensity.SIGNIFICANTLY_LEVEL + 1)}})
    qualifiedTrait.respectEvaluations.push(function(perspectiveOwner, perspectiveTarget){ if (perspectiveTarget.body.gender == Gender.FEMALE) return 0; let targetFitness = perspectiveTarget.body.fitness; let characterFitness = perspectiveOwner.body.fitness; if (targetFitness > characterFitness + 3) return TraitIntensity.VERY_LEVEL; if (targetFitness > characterFitness) return TraitIntensity.SIGNIFICANTLY_LEVEL})
    qualifiedTrait.sensualEvaluationsTowardsFemales.push(function(perspectiveOwner, perspectiveTarget){ let targetFitness = perspectiveTarget.body.fitness; if (targetFitness >= TraitIntensity.EXCESSIVELY_LEVEL) return -1 * TraitIntensity.MODERATELY_LEVEL; if (targetFitness > TraitIntensity.SIGNIFICANTLY_LEVEL) return TraitIntensity.VERY_LEVEL; if (targetFitness < TraitIntensity.MODERATELY_LEVEL) return TraitIntensity.SIGNIFICANTLY_LEVEL; if (targetFitness == TraitIntensity.NOT_LEVEL) return -1 * TraitIntensity.INSIGNIFICANTLY_LEVEL;})
    character.personality.qualifiedTraits.set(CharacterBodyTraits.FITNESS, qualifiedTrait)

    character.body.bodyFatTendency = BodyFatTendency.SLIM_TENDENCY
    character.body.bodyFatBalance = BodyFatBalanceLevels.SLIM_BODY
    character.body.bodyFatLevel = SlimBodyLevels.THIN_LEVEL
    qualifiedTrait = new QualifiedTrait(CharacterBodyTraits.BODY_FAT_BALANCE, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    qualifiedTrait.prideEvaluations.push(function(perspectiveOwner, perspectiveTarget){
        let ownbodyFatTendency = perspectiveTarget.body.bodyFatTendency
        let ownBodyFatLevel = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.BODY_FAT_LEVEL).levelNumber
        if (((ownBodyFatTendency == BodyFatTendency.VOLUPTUOUS_TENDENCY) && (ownBodyFatLevel <= VoluptuousBodyLevels.CHUBBY_LEVEL)) || (ownBodyFatLevel <= SlimBodyLevels.SKINNY_LEVEL))
            return -1 * TraitIntensity.MODERATELY_LEVEL
    })
    qualifiedTrait.sensualEvaluationsTowardsFemales.push(function(perspectiveOwner, perspectiveTarget){
        let targetBodyFatBalance = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.BODY_FAT_BALANCE).qualifierString
        let targetBodyFatLevel = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.BODY_FAT_LEVEL).levelNumber
        if (((targetBodyFatBalance == BodyFatBalanceLevels.VOLUPTUOUS_BODY) && (targetBodyFatLevel <= -1)) || (targetBodyFatLevel <= -2))
            return -1 * TraitIntensity.SIGNIFICANTLY_LEVEL
    })
    character.personality.qualifiedTraits.set(CharacterBodyTraits.BODY_FAT_BALANCE, qualifiedTrait)

    character.body.bodyParts.FACE.value = FaceProperties.PLAIN_LEVEL
    character.body.bodyParts.FACE.qualities.push(FaceProperties.ORDINARY)
    character.body.bodyParts.FACE.descriptors.push(FaceProperties.ORDINARY)
    qualifiedTrait = new TraitQualification(CharacterBodyTraits.FACE_ATTRACTIVENESS, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    qualifiedTrait.respectEvaluations.push(function(perspectiveOwner, perspectiveTarget){ let targetFaceAttractiveness = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.FACE_ATTRACTIVENESS).levelNumber; if (targetFaceAttractiveness >= FaceProperties.BEAUTIFUL_LEVEL) return TraitIntensity.MODERATELY_LEVEL})
    qualifiedTrait.socialEvaluations.push(function(perspectiveOwner, perspectiveTarget){ let targetFaceAttractiveness = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.FACE_ATTRACTIVENESS).levelNumber; if (targetFaceAttractiveness <= FaceProperties.UGLY_LEVEL) return -1 * TraitIntensity.MODERATELY_LEVEL; if (targetFaceAttractiveness >= FaceProperties.GORGEOUS_LEVEL) return TraitIntensity.SIGNIFICANTLY_LEVEL; if (targetFaceAttractiveness >= FaceProperties.CUTE_LEVEL) return TraitIntensity.MODERATELY_LEVEL})
    qualifiedTrait.sensualEvaluationsTowardsFemales.push(function(perspectiveOwner, perspectiveTarget){ let targetFaceAttractiveness = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.FACE_ATTRACTIVENESS).levelNumber; if (targetFaceAttractiveness >= FaceProperties.GORGEOUS_LEVEL) return TraitIntensity.VERY_LEVEL; if (targetFaceAttractiveness >= FaceProperties.BEAUTIFUL_LEVEL) return TraitIntensity.SIGNIFICANTLY_LEVEL; if (targetFaceAttractiveness >= FaceProperties.CUTE_LEVEL) return TraitIntensity.MODERATELY_LEVEL; if (targetFaceAttractiveness <= FaceProperties.UNATTRACTIVE_LEVEL) return targetFaceAttractiveness - 1})
    character.personality.qualifiedTraits.set(CharacterBodyTraits.FACE_ATTRACTIVENESS, qualifiedTrait)

    character.body.heightGroup = BodyPartSize.SMALL_LEVEL
    qualifiedTrait = new TraitQualification(CharacterBodyTraits.TALLNESS, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterBodyTraits.TALLNESS, qualifiedTrait)

    character.body.bodyParts.PENIS.size = BodyPartSize.SMALL_LEVEL
    qualifiedTrait = new TraitQualification(CharacterBodyTraits.PENIS_SIZE, TraitCategory.BODY, TraitIntensity.MODERATELY_LEVEL)
    character.personality.qualifiedTraits.set(CharacterBodyTraits.PENIS_SIZE, qualifiedTrait)

    character.body.bodyParts.BUTT.size = BodyPartSize.AVERAGE_LEVEL
    qualifiedTrait = new TraitQualification(CharacterBodyTraits.SHAPELY_BUTT, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    character.personality.qualifiedTraits.set(CharacterBodyTraits.SHAPELY_BUTT, qualifiedTrait)

    character.body.bodyParts.BREASTS.size = BodyPartSize.MINUSCULE_LEVEL
    qualifiedTrait = new TraitQualification(CharacterBodyTraits.BREASTS_SIZE, TraitCategory.BODY, TraitIntensity.NOT_LEVEL)
    qualifiedTrait.sensualEvaluationsTowardsFemales.push(function(perspectiveOwner, perspectiveTarget){ let targetBreastsSize = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.BREASTS_SIZE); if (targetBreastsSize >= BodyPartSize.BIG_LEVEL) return TraitIntensity.SIGNIFICANTLY_LEVEL})
    character.personality.qualifiedTraits.set(CharacterBodyTraits.BREASTS_SIZE, qualifiedTrait)

    // ------------------- SEXUALITY -----------------------
    character.sexuality = new CharacterSexuality(TraitIntensity.SIGNIFICANTLY_LEVEL, TraitIntensity.NOT_LEVEL)

    let arousalProfile = new ArousalProfile(ArousalLevel.TINGLY_SCORE)
    arousalProfile.partnerGender = Gender.FEMALE
    arousalProfile.sexualStaminaForArousalLevel = 5
    arousalProfile.intensityThreshold = 12
    arousalProfile.upgradeThreshold = 12
    arousalProfile.downgradeThreshold = 0
    arousalProfile.approvalEvaluation = new ApprovalEvaluation()
    arousalProfile.approvalEvaluation.addApprovalTrait(ApprovalEvaluation.ADDING_TO_APPROVAL, TraitCategory.BODY, CharacterBodyTraits.BREASTS_SIZE, function(perspectiveOwner, perspectiveTarget){
        let targetBreastsSize = perspectiveTarget.body.getTraitQualifierAndLevel(CharacterBodyTraits.BREASTS_SIZE)
        if (targetBreastsSize >= BodyPartSize.BIG_LEVEL)
            return TraitIntensity.MODERATELY_LEVEL
    })











    return character
}
