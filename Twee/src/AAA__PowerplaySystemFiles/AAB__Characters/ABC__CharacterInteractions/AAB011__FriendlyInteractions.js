class FriendlyInteraction extends window.CharacterInteraction {
    constructor(characters){
        super(characters)
    }
}

// Influence: The character gets a chance to change one of the target's mood elements.
// Gift: A particular kind of Influence. See Influece above.
// Increase Intimacy: The character gets a chance to improve intimacy.
// Interview/Interrogate/Test: The character gets a chance to find some element about the target.
// ### Expose Trait
// - Admit (proudly, humbly)
// - Boast
// - Subtly Mention
// - Openly Mention (proudly, humbly)
// - Demonstrate

// Small Talk:
// If the character likes the target, loves them or is happy with them, when the small talk starts, they increase good mood by 1 to a maximum of SIGNIFICANTLY.
// If the character dislikes the target, hates them or is unhappy with them, when the small talk starts, they decrease good mood by 1 to a maximum of SIGNIFICANTLY or increases ANGRY or SCARRED by 1.
// Small talk will verse on a topic chosed by the talkInitiator. The topic is evaluated by the talkTarget and may improve or worsen their mood.
// Small talk will lead to a random preference topic. If the target talkInitiator indicates they have a similar level of preference on the subject, the mood may be improved too to a maximum of VERY.
// The talkInitiator Charm also plays a role and has a chance to improve mood by 1 or 2 or worsen it by 1 or 2.
function smallTalk(talkInitiator, talkTarget, conversationTopic, preferenceTopic, opinion){
    let isTalkTargetMoodPositive = talkTarget.status.mood.isPositive()

    let talkInitiatorCharmLevel = talkInitiator.attainments.getTrait(CharacterInvestmentAttainmentTraits.CHARM).levelNumber
    let interactionMoodModifier = 0
    if (talkInitiatorCharmLevel >= TraitIntensity.VERY_LEVEL){
        interactionMoodModifier = 2
    } else if ((tarlkingCharmLevel >= TraitIntensity.SIGNIFICANTLY_LEVEL) || ((isTalkTargetMoodPositive == true) && (talkInitiatorCharmLevel >= TraitIntensity.MODERATELY_LEVEL))){
        interactionMoodModifier = 1
    }
    let talkTargetRelationshipToTalkInitiator = talkTarget.relationships.get(talkInitiator)
    let loveLevel = EmpathyLevels.getLevelFromName(talkTargetRelationshipToTalkInitiator.feelings.love)
    if (Math.abs(loveLevel) >= EmpathyLevels.SWEET_LEVEL){
        if (loveLevel > 0){
            interactionMoodModifier += 2
        } else {
            interactionMoodModifier -= 2
        }
    } else if (Math.abs(loveLevel) >= EmpathyLevels.AMIABLE_LEVEL){
        if (loveLevel > 0){
            interactionMoodModifier += 1
        } else {
            interactionMoodModifier -= 1
        }
    }
    let talkTargetTopicAppreciation = getTopicAppreciation(talkTarget.preferences.smallTalkProfile, conversationTopic)
    if (talkTargetTopicAppreciation.levelNumber >= PreferenceLevel.LOVE_LEVEL){
        interactionMoodModifier += 2
    } else if (talkTargetTopicAppreciation.levelNumber >= PreferenceLevel.ENJOY_LEVEL){
        interactionMoodModifier += 1
    } else if (talkTargetTopicAppreciation.levelNumber <= PreferenceLevel.HATE_LEVEL){
        interactionMoodModifier -= 2
    } else if (talkTargetTopicAppreciation.levelNumber <= PreferenceLevel.DESPISE_LEVEL){
        interactionMoodModifier -= 1
    }
    let preferenceAlignment = checkPreferenceAlignment(talkTarget.preferences, preferenceTopic, opinion)
    if (preferenceAlignment >= TraitIntensity.SIGNIFICANTLY_LEVEL){
        interactionMoodModifier += 2
    } else if (preferenceAlignment >= TraitIntensity.MODERATELY_LEVEL){
        interactionMoodModifier += 1
    } else if (preferenceAlignment <= (-1 * TraitIntensity.SIGNIFICANTLY_LEVEL)){
        interactionMoodModifier -= 2
    } else if (preferenceAlignment <= (-1 * TraitIntensity.MODERATELY_LEVEL)){
        interactionMoodModifier -= 1
    }
    talkTarget.mood.intensity += interactionMoodModifier
    if ((isTalkTargetMoodPositive == true) && (talkTarget.mood.intensity < 0)){
        // TODO: talkInitiator changed the target's mood. This should be worth a perk/achievement or some modifier for the scene.

        // talkInitiator made the talkTarget upset.
        // Default is to make the target angry.
        // TODO: Check if the character should be scarred instead of angry
        talkTarget.mood.dominantMood = CharacterMood.CALM_OR_ANGRY
    } else if ((isTalkTargetMoodPositive == false) && (talkTarget.mood.intensity >= 0)){
        // TODO: talkInitiator changed the target's mood. This should be worth a perk/achievement or some modifier for the scene.

        talkTarget.mood.dominantMood = CharacterMood.HAPPY_OR_SAD
    }

    if (talkTarget.mood.intensity >= TraitIntensity.EXCESSIVELY_LEVEL){
        talkTarget.mood.intensity = TraitIntensity.EXCESSIVELY_LEVEL
    } else if (talkTarget.mood.intensity <= (-1 * TraitIntensity.EXCESSIVELY_LEVEL)){
        talkTarget.mood.intensity = -1 * TraitIntensity.EXCESSIVELY_LEVEL
    }
}

// Meaningful Conversation:
// The character will chose to expose a trait or investigate a trait.
// If the character is exposing a trait and the target believes the character possesses that trait, intimacy is increased.
// If the character is looking for a trait and the target is proud of the trait, intimacy is increased.
//
// Interview:
// The character asks about a trait. The target choses to Admit (proudly or humbly) or to Deny. The character evaluates how much they believe in the answer.
// 
// Demonstrate:
// A character may demonstrate a trait they actually have. But, for some traits, they may only be pretending to have the trait.
// Mention:
// A character may subtly or boastfully mention a trait.
class MeaningfulConversationInteractionStrategy {
    static SUBTLY_INVESTIGATE = "SUBTLY_INVESTIGATE"
    static OPENLY_INTERVIEW = "OPENLY_INTERVIEW"
    static HUMBLY_MENTION = "HUMBLY_MENTION"
    static BOAST = "BOAST"
    static DEMONSTRATE = "DEMONSTRATE"

    static DISCOVERY_STRATEGY = "DISCOVERY_STRATEGY"
    static EXPOSITION_STRATEGY = "EXPOSITION_STRATEGY"
    static isDiscoveryOrExposition(strategy){
        switch(strategy){
            case MeaningfulConversationInteractionStrategy.SUBTLY_INVESTIGATE:
                return MeaningfulConversationInteractionStrategy.DISCOVERY_STRATEGY
            case MeaningfulConversationInteractionStrategy.OPENLY_INTERVIEW:
                return MeaningfulConversationInteractionStrategy.DISCOVERY_STRATEGY
            case MeaningfulConversationInteractionStrategy.HUMBLY_MENTION:
                return MeaningfulConversationInteractionStrategy.EXPOSITION_STRATEGY
            case MeaningfulConversationInteractionStrategy.BOAST:
                return MeaningfulConversationInteractionStrategy.EXPOSITION_STRATEGY
            case MeaningfulConversationInteractionStrategy.DEMONSTRATE:
                return MeaningfulConversationInteractionStrategy.EXPOSITION_STRATEGY
            default:
                throw new Error("ERROR: MeaningfulConversationInteractionStrategy.isDiscoveryOrExposition: Can't find strategy '" + strategy + "'.")
        }
    }
}

class MeaningfulConverationResult extends SugarcubeSerializableObject {
    constructor(initiatorCost, targetCost){
        super()
        this.initiatorCost = initiatorCost
        this.targetCost = targetCost
        this.targetIsAllowedAReply = false
    }
}

function meaningfulConversation(initiator, target, initiatorStrategy, initiatorTraitCategory, initiatorTraitName, initiatorTraitQualifierAndLevel, isGetCostsOnly){
    let initiatorCost = 1
    let targetCost = 0
    switch (initiatorStrategy){
        case MeaningfulConversationInteractionStrategy.SUBTLY_INVESTIGATE:
            initiatorCost += 2
            targetCost += 1
            break
        case MeaningfulConversationInteractionStrategy.OPENLY_INTERVIEW:
            initiatorCost += 0
            targetCost += 1
            break
        case MeaningfulConversationInteractionStrategy.HUMBLY_MENTION:
            initiatorCost += 1
            targetCost += 1
            break
        case MeaningfulConversationInteractionStrategy.BOAST:
            initiatorCost += 1
            targetCost += 0
            break
        case MeaningfulConversationInteractionStrategy.DEMONSTRATE:
            initiatorCost += 1
            targetCost += 0
            break
    }
    let conversationResult = new MeaningfulConverationResult(initiatorCost, targetCost)
    if (isGetCostsOnly == true){
        return conversationResult
    }
    if (MeaningfulConversationInteractionStrategy.isDiscoveryOrExposition(initiatorStrategy) == MeaningfulConversationInteractionStrategy.DISCOVERY_STRATEGY){
        let traitQualifierAndLevel = undefined
        switch(initiatorTraitCategory){
            case TraitCategory.BODY:
                traitQualifierAndLevel = CharacterBodyTraits.getTraitQualifierAndLevel(initiatorTraitName, initiator, target)
                break
            case TraitCategory.PERSONALITY:
                traitQualifierAndLevel = CharacterAttitudeTraits.getTraitQualifierAndLevel(initiatorTraitName, initiator, target)
                if (traitQualifierAndLevel === undefined){
                    traitQualifierAndLevel = CharacterPersonalityTraits.getTraitQualifierAndLevel(initiatorTraitName, initiator, target)
                }
                break
            case TraitCategory.INVESTMENT:
            case TraitCategory.HISTORY:
                break
            default:
                throw new Error("ERROR: meaningfulConversation: Can't find TraitCategory '" + initiatorTraitCategory + "'.")
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  THIS IS NOT FINISHED  /////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // let targetQualifiedTrait = target.personality.qualifiedTraits.get(initiatorTraitName)
        // if ((targetQualifiedTrait.prideLevel >= PrideLevels.MODEST_LEVEL) && ()){
        //     ;
        // }
        assessTrait()
        if (initiatorStrategy == MeaningfulConversationInteractionStrategy.OPENLY_INTERVIEW){
            interviewInterlocutor(initiator, target, initiatorTraitCategory, initiatorTraitName)
        }
        conversationResult.targetIsAllowedAReply = true
    } else {
        if (initiatorStrategy == MeaningfulConversationInteractionStrategy.HUMBLY_MENTION){
            // TODO: Take the Deception skill to increase the confidence in the trait.
            let targetPerspective = target.relationships.get(initiator)
            let subtleMentionTrustLevel = 0.2
            switch(initiatorTraitCategory){
                case TraitCategory.BODY:
                    targetPerspective.targetModel.bodyTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, subtleMentionTrustLevel)
                    break
                case TraitCategory.PERSONALITY:
                    targetPerspective.targetModel.personalityTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, subtleMentionTrustLevel)
                    break
                case TraitCategory.INVESTMENT:
                case TraitCategory.HISTORY:
                    targetPerspective.targetModel.attainmentTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, subtleMentionTrustLevel)
                    break
                default:
                    throw new Error("ERROR: meaningfulConversation: Can't find TraitCategory '" + initiatorTraitCategory + "'.")
            }
            conversationResult.targetIsAllowedAReply = true
        } else if (initiatorStrategy == MeaningfulConversationInteractionStrategy.BOAST){
            // TODO: Take the Impressiveness skill to increase the confidence in the trait.
            let targetPerspective = target.relationships.get(initiator)
            let boastingTrustLevel = 0.4
            switch(initiatorTraitCategory){
                case TraitCategory.BODY:
                    targetPerspective.targetModel.bodyTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, boastingTrustLevel)
                    break
                case TraitCategory.PERSONALITY:
                    targetPerspective.targetModel.personalityTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, boastingTrustLevel)
                    break
                case TraitCategory.INVESTMENT:
                case TraitCategory.HISTORY:
                    targetPerspective.targetModel.attainmentTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, boastingTrustLevel)
                    break
                default:
                    throw new Error("ERROR: meaningfulConversation: Can't find TraitCategory '" + initiatorTraitCategory + "'.")
            }
            targetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterAttitudeTraits.SMUGNESS, new TraitQualifierAndLevel(PrideLevels.PROUD, PrideLevels.PROUD_LEVEL), 0.3)
            targetPerspective.targetModel.personalityTraits.addSceneTrait(AdditionalCharacterAttitudeTraits.BOASTFUL, new TraitQualifierAndLevel(PrideLevels.PROUD, PrideLevels.PROUD_LEVEL), 0.4)
        } else if (initiatorStrategy == MeaningfulConversationInteractionStrategy.DEMONSTRATE){
            // TODO: Take the Impressiveness skill to increase the confidence in the trait.
            let targetPerspective = target.relationships.get(initiator)
            let demonstrationTrustLevel = 0.3
            switch(initiatorTraitCategory){
                case TraitCategory.BODY:
                    targetPerspective.targetModel.bodyTraits.addTrustedTrait(initiatorTraitName, initiatorTraitQualifierAndLevel)
                    break
                case TraitCategory.PERSONALITY:
                    targetPerspective.targetModel.personalityTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, demonstrationTrustLevel)
                    break
                case TraitCategory.INVESTMENT:
                case TraitCategory.HISTORY:
                    targetPerspective.targetModel.attainmentTraits.addEvaluatingTrait(initiatorTraitName, initiatorTraitQualifierAndLevel, demonstrationTrustLevel)
                    break
                default:
                    throw new Error("ERROR: meaningfulConversation: Can't find TraitCategory '" + initiatorTraitCategory + "'.")
            }
            targetPerspective.targetModel.personalityTraits.addSceneTrait(CharacterAttitudeTraits.SMUGNESS, new TraitQualifierAndLevel(PrideLevels.PROUD, PrideLevels.PROUD_LEVEL), 0.1)
            targetPerspective.targetModel.personalityTraits.addSceneTrait(AdditionalCharacterAttitudeTraits.BOASTFUL, new TraitQualifierAndLevel(PrideLevels.PROUD, PrideLevels.PROUD_LEVEL), 0.2)
        }
        return conversationResult
    }
}
