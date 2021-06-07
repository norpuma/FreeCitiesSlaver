// Interview, interrogate, test
// Skills:
// - Charm
// - Composure
// - Deception
// - Impressiveness
// - Insight
// - Leadership

// When evaluating a trait, a character may be fooled. The "confidence" element indicates how much of the change will be made permanent. If there is a previous confidence, it must first be eliminated.
// e.g. The character evaluating how much they think a target is generous. The target provides a demonstration and the character becomes 50% confident in their generosity. But, then, someone tells the character that the target is actually not generous and it is a source the character trusts, so the confidence is of 70%, at the end of the scene, the character has a 20% confidence that the target is not generous.

// Activities:
// Look At
// Examine
// Observe
// Gather Information / Hear about
// Interview
// Test

// Approach
// Spread rumor
// Create a reputation
// Demonstrate
// Create a persona
// Lie
// Boast

// A character can Look At another and gather some basic information.

// A character may chose to show off some Trait or Prefrence.

function lookAt(perspectiveOwner, perspectiveTarget){
    let relationship = perspectiveOwner.relationships.get(perspectiveTarget)
    if (relationship === undefined){
        relationship = createStrangersRelationship(perspectiveTarget)
        perspectiveOwner.relationships.set(perspectiveTarget, relationship)
    }
    let observedTraits = CharacterBodyTraits.getTraitsAtAGlance(perspectiveOwner, perspectiveTarget)
    for (traitName of observedTraits.keys()){
        relationship.targetModel.bodyTraits.addTrustedTrait(traitName, observedTraits.get(traitName))
    }
}

