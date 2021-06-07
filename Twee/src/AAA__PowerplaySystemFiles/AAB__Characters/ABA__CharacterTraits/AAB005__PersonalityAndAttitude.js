class EmpathyLevels {
    static SADIST = "SADIST" // Needs to make others suffer. Not making others suffer makes them suffer.
    static CRUEL = "CRUEL" // Likes to make others suffer. Making others suffer makes them happy.
    static MEAN = "MEAN" // Likes to see others suffer.
    static CALLOUS = "CALLOUS" // Is okay with others suffering.
    static ALOOF = "ALOOF" // Is okay with others being happy or unhappy.
    static AMIABLE = "AMIABLE" // Likes to see others happy.
    static SWEET = "SWEET" // Likes to make others happy. Making other happy makes them happy.
    static OVEREAGER = "OVEREAGER" // Needs to make others happy. Not making others happy frequently makes them suffer.
    static SADIST_LEVEL = -4
    static CRUEL_LEVEL = -3
    static MEAN_LEVEL = -2
    static CALLOUS_LEVEL = -1
    static ALOOF_LEVEL = 0
    static AMIABLE_LEVEL = 1
    static SWEET_LEVEL = 2
    static OVEREAGER_LEVEL = 3
    static getNameFromLevel(level) {
        switch(level){
            case EmpathyLevels.SADIST_LEVEL:
                return EmpathyLevels.SADIST
            case EmpathyLevels.CRUEL_LEVEL:
                return EmpathyLevels.CRUEL
            case EmpathyLevels.MEAN_LEVEL:
                return EmpathyLevels.MEAN
            case EmpathyLevels.CALLOUS_LEVEL:
                return EmpathyLevels.CALLOUS
            case EmpathyLevels.ALOOF_LEVEL:
                return EmpathyLevels.ALOOF
            case EmpathyLevels.AMIABLE_LEVEL:
                return EmpathyLevels.AMIABLE
            case EmpathyLevels.SWEET_LEVEL:
                return EmpathyLevels.SWEET
            case EmpathyLevels.OVEREAGER_LEVEL:
                return EmpathyLevels.OVEREAGER
            default:
                throw new Error("ERROR: EmpathyLevels.getNameFromLevel: Can't find '" + level + "'.")
        }
    }
    static getLevelFromName(name){
        switch(name){
            case EmpathyLevels.SADIST:
                return EmpathyLevels.SADIST_LEVEL
            case EmpathyLevels.CRUEL:
                return EmpathyLevels.CRUEL_LEVEL
            case EmpathyLevels.MEAN:
                return EmpathyLevels.MEAN_LEVEL
            case EmpathyLevels.CALLOUS:
                return EmpathyLevels.CALLOUS_LEVEL
            case EmpathyLevels.ALOOF:
                return EmpathyLevels.ALOOF_LEVEL
            case EmpathyLevels.AMIABLE:
                return EmpathyLevels.AMIABLE_LEVEL
            case EmpathyLevels.SWEET:
                return EmpathyLevels.SWEET_LEVEL
            case EmpathyLevels.OVEREAGER:
                return EmpathyLevels.OVEREAGER_LEVEL
            default:
                throw new Error("ERROR: EmpathyLevels.getLevelFromName: Can't find a level for '" + name + "'.")
        }
    }
}

class SubmissivenessLevels {
    static INDOMITABLE = "INDOMITABLE"
    static REBELLIOUS = "REBELLIOUS"
    static UNYIELDING = "UNYIELDING"
    static COMPROMISING = "COMPROMISING"
    static COMPLIANT = "COMPLIANT"
    static DEFERENTIAL = "DEFERENTIAL"
    static DOCILE = "DOCILE"
    static INDOMITABLE_LEVEL = -30
    static REBELLIOUS_LEVEL = -20
    static UNYIELDING_LEVEL = -10
    static COMPROMISING_LEVEL = 0
    static COMPLIANT_LEVEL = 10
    static DEFERENTIAL_LEVEL = 20
    static DOCILE_LEVEL = 30
    static getLevelFromName(name){
        switch(name){
            case SubmissivenessLevels.INDOMITABLE:
                return SubmissivenessLevels.INDOMITABLE_LEVEL
            case SubmissivenessLevels.REBELLIOUS:
                return SubmissivenessLevels.REBELLIOUS_LEVEL
            case SubmissivenessLevels.UNYIELDING:
                return SubmissivenessLevels.UNYIELDING_LEVEL
            case SubmissivenessLevels.COMPROMISING:
                return SubmissivenessLevels.COMPROMISING_LEVEL
            case SubmissivenessLevels.COMPLIANT:
                return SubmissivenessLevels.COMPLIANT_LEVEL
            case SubmissivenessLevels.DEFERENTIAL:
                return SubmissivenessLevels.DEFERENTIAL_LEVEL
            case SubmissivenessLevels.DOCILE:
                return SubmissivenessLevels.DOCILE_LEVEL
            default:
                throw new Error("ERROR: SubmissivenessLevels.getLevelFromName: Can't find '" + name + "'.")
        }
    }
}

class SociabilityLevels {
    // This indicates how much the character likes to be around other people.
    static RECLUSIVE = "RECLUSIVE"
    static WITHDRAWN = "WITHDRAWN"
    static RESERVED = "RESERVED"
    static COOL = "COOL"
    static CORDIAL = "CORDIAL"
    static EXPANSIVE = "EXPANSIVE"
    static OUTGOING = "OUTGOING"
    static GREGARIOUS = "GREGARIOUS"
    static RECLUSIVE_LEVEL = -30
    static WITHDRAWN_LEVEL = -20
    static RESERVED_LEVEL = -10
    static COOL_LEVEL = 0
    static CORDIAL_LEVEL = 10
    static EXPANSIVE_LEVEL = 20
    static OUTGOING_LEVEL = 30
    static GREGARIOUS_LEVEL = 40
}

class CourageLevels {
    static COWARDLY = "COWARDLY"
    static FEARFUL = "FEARFUL"
    static CAUTIOUS = "CAUTIOUS"
    static TOUGH = "TOUGH"
    static DARING = "DARING"
    static FEARLESS = "FEARLESS"
    static COWARDLY_LEVEL = -2
    static FEARFUL_LEVEL = -1
    static CAUTIOUS_LEVEL = 0
    static TOUGH_LEVEL = 1
    static DARING_LEVEL = 2
    static FEARLESS_LEVEL = 3
}

class SexualLibertyLevels {
    static VERY_REPRESSED = "VERY_REPRESSED"
    static REPRESSED = "REPRESSED"
    static SLIGHTLY_REPRESSED = "SLIGHTLY_REPRESSED"
    static UNCERTAIN = "UNCERTAIN"
    static SLIGHTLY_LIBERATED = "SLIGHTLY_LIBERATED"
    static LIBERATED = "LIBERATED"
    static VERY_LIBERATED = "VERY_LIBERATED"
    static VERY_REPRESSED_LEVEL = -3
    static REPRESSED_LEVEL = -2
    static SLIGHTLY_REPRESSED_LEVEL = -1
    static UNCERTAIN_LEVEL = 0
    static SLIGHTLY_LIBERATED_LEVEL = 1
    static LIBERATED_LEVEL = 2
    static VERY_LIBERATED_LEVEL = 3
}

class SexualExperienceLevels {
    static COMPLETELY_INNOCENT = "COMPLETELY_INNOCENT"
    static MOSTLY_INNOCENT = "MOSTLY_INNOCENT"
    static PARTIALLY_AWARE = "PARTIALLY_AWARE"
    static AWARE = "AWARE"
    static SLIGHTLY_EXPERIENCED = "SLIGHTLY_EXPERIENCED"
    static MOSTLY_EXPERIENCED = "MOSTLY_EXPERIENCED"
    static RATHER_EXPERIENCED = "RATHER_EXPERIENCED"
    static VERY_EXPERIENCED = "VERY_EXPERIENCED"
    static EXTREMELY_EXPERIENCED = "EXTREMELY_EXPERIENCED"
    static COMPLETELY_INNOCENT_LEVEL = -3
    static MOSTLY_INNOCENT_LEVEL = -2
    static PARTIALLY_AWARE_LEVEL = -1
    static AWARE_LEVEL = 0
    static SLIGHTLY_EXPERIENCED_LEVEL = 1
    static MOSTLY_EXPERIENCED_LEVEL = 2
    static RATHER_EXPERIENCED_LEVEL = 3
    static VERY_EXPERIENCED_LEVEL = 4
    static EXTREMELY_EXPERIENCED_LEVEL = 5
}

class SexualInterestQualifiers {
    static SCARRED = "SCARRED"
    static DISINTERESTED = "DISINTERESTED"
    static JADED = "JADED"
    static CURIOUS = "CURIOUS"
    static DESIROUS_OF_EXPERIENCE = "DESIROUS"
    static INTERESTED = "INTERESTED"
    static ENTHUSIASTIC = "ENTHUSIASTIC"
    static ADDICTED = "ADDICTED"
}

class MoralityLevels {
    static EXTREMELY_AMORAL = "EXTREMELY_AMORAL"
    static SEVERELY_AMORAL = "SEVERELY_AMORAL"
    static FAIRLY_AMORAL = "FAIRLY_AMORAL"
    static SLIGHTLY_AMORAL = "SLIGHTLY_AMORAL"
    static UNCERTAIN = "UNCERTAIN"
    static SLIGHTLY_UPRIGHT = "SLIGHTLY_UPRIGHT"
    static FAIRLY_UPRIGHT = "FAIRLY_UPRIGHT"
    static VERY_UPRIGHT = "VERY_UPRIGHT"
    static EXTREMELY_UPRIGHT = "EXTREMELY_UPRIGHT"
    static EXTREMELY_AMORAL_LEVEL = -4
    static SEVERELY_AMORAL_LEVEL = -3
    static FAIRLY_AMORAL_LEVEL = -2
    static SLIGHTLY_AMORAL_LEVEL = -1
    static UNCERTAIN_LEVEL = 0
    static SLIGHTLY_UPRIGHT_LEVEL = 1
    static FAIRLY_UPRIGHT_LEVEL = 2
    static VERY_UPRIGHT_LEVEL = 3
    static EXTREMELY_UPRIGHT_LEVEL = 4
}

class DutifulnessLevels {
    static EXTREMELY_INDOLENT = "EXTREMELY_INDOLENT"
    static SEVERELY_INDOLENT = "SEVERELY_INDOLENT"
    static FAIRLY_INDOLENT = "FAIRLY_INDOLENT"
    static SLIGHTLY_INDOLENT = "SLIGHTLY_INDOLENT"
    static UNCERTAIN = "UNCERTAIN"
    static SLIGHTLY_DUTIFUL = "SLIGHTLY_DUTIFUL"
    static FAIRLY_DUTIFUL = "FAIRLY_DUTIFUL"
    static VERY_DUTIFUL = "VERY_DUTIFUL"
    static EXTREMELY_DUTIFUL = "EXTREMELY_DUTIFUL"
    static EXTREMELY_INDOLENT_LEVEL = -4
    static SEVERELY_INDOLENT_LEVEL = -3
    static FAIRLY_INDOLENT_LEVEL = -2
    static SLIGHTLY_INDOLENT_LEVEL = -1
    static UNCERTAIN_LEVEL = 0
    static SLIGHTLY_DUTIFUL_LEVEL = 1
    static FAIRLY_DUTIFUL_LEVEL = 2
    static VERY_DUTIFUL_LEVEL = 3
    static EXTREMELY_DUTIFUL_LEVEL = 4
}

class PrideLevels {
    static EXTREMELY_TIMID = "EXTREMELY_TIMID" // The character has low self-esteem and think they are almost incapable in everything in their life and that their positive aspects only have worth to very feel people.
    static MEEK = "MEEK" // Very very timid. The character has low self-esteem and only feels proud of anything with those very close to them (mother, brother, etc.).
    static TIMID = "TIMID" // The character only acts confident in a feel circles. Usually with their family or with some specific group of friends (e.g.: trekkie nerds).
    static SHY = "SHY" // The character usually keeps a low profile, but may speak up on some very specific subjects.
    static HUMBLE = "HUMBLE" // Very modest. The character rarely boasts, but there are a few things they are proud of.
    static MODEST = "MODEST" // The character is inwardly proud of some of their accomplishments or traits, but doesn't, usually, feel the need to boast.
    static SMUG = "SMUG" // Moderately confident. The character sometimes walks around with their chest puffed and their chin raised after making something worth of boasting.
    static CHEEKY = "CHEEKY" // Confident. The character feels confident in many circumstances, takes the initiative to show off and often mentions their reasons for pride.
    static PROUD = "PROUD" // The character feels proud of their accomplishments and tries to remind people of them.
    static ARROGANT = "ARROGANT" // Very proud. The character almost always talks about themselves and their accomplishments. They can hear others, but expect them to excel (and less than them) at whatever the character themself values/is proud of.
    static PRESUMPTUOUS = "PRESUMPTUOUS" // Extremely proud. It's almost impossible to make the character shut up about their accomplishments. They almost never take off some reminder of what they are.
    static EXTREMELY_TIMID_LEVEL = -5
    static MEEK_LEVEL = -4
    static TIMID_LEVEL = -3
    static SHY_LEVEL = -2
    static HUMBLE_LEVEL = -1
    static MODEST_LEVEL = 0
    static SMUG_LEVEL = 1
    static CHEEKY_LEVEL = 2
    static PROUD_LEVEL = 3
    static ARROGANT_LEVEL = 4
    static PRESUMPTUOUS_LEVEL = 5
}

class NicenessLevels {
    static SADIST = -40 // Needs to make others suffer. Not making others suffer makes them suffer.
    static CRUEL = -30 // Likes to make others suffer. Making others suffer makes them happy.
    static MEAN = -20 // Likes to see others suffer.
    static CALLOUS = -10 // Is okay with others suffering.
    static ALOOF = 0 // Is okay with others being happy or unhappy.
    static AMIABLE = 20 // Likes to see others happy.
    static SWEET = 40 // Likes to make others happy. Making other happy makes them happy.
    static OVEREAGER = 60 // Needs to make others happy. Not making others happy frequently makes them suffer.
}

class IrascibleThresholdLevels {
    static POWDERKEG = 0
    static HOTHEAD = 10
    static TESTY = 20
    static IRASCIBLE = 30
    static COMPOSED = 40
    static COLD = 50
    static STONY = 60
}

class MelancholyThresholdLevels {
    static CRYBABY = 0
    static WEEPY = 10
    static MOURNFUL = 20
    static MELANCHOLY = 30
    static DISPASSIONATE = 40
    static POISED = 50
    static SERENE = 60
}

class FlirtinessLevels {
    static PRUDE = -10 // Often offended by flirty interactions.
    static DISCREET = 0 // Doesn't flirt openly and doesn't openly react to flirting.
    static FLIRTY = 10 // Occasionally drops innuendo or offer a flirty smile or draws attention to a part of their body.
    static STRUTTY = 20 // Frequently drops innuendo, offers a flirty smile or a wink or draws attention to a part of their body - usually one they are proud of.
    static TEASING = 30 // Constantly drops innuendo, offers a flirty smile or a wink and draws attention to a part of their body - usually one they are proud of.
}

class DecorumLevels {
    static VULGAR = "VULGAR" // Talks about sex, about her body, shows it off clothed. Likes being watched and feels like it's normal. Strikes sexy or suggestive poses, parades in skimpy clothes 
    static INDECENT = "INDECENT" // Says lewd things but won't follow through. Is teasing in her words, but not detailed and doesn't actually expose herself with her words. May show off her clothed body to tease.
    static UNCONCERNED = "UNCONCERNED" // Might forget that some things shouldn't be shown off. (Leans over too far, grabs own tits, etc).
    static UNINTERESTED = "UNINTERESTED" // Doesn't talk about sex or lewd things. Aware, but doesn't like broaching the subject. Careful never to expose herself, may wear very modest and covering clothes.
    static INNOCENT = "INNOCENT" // Doesn't think about sex or lewd things. Is simply unaware. Too innocent to care about being covered up.
    static VULGAR_LEVEL = 0
    static INDECENT_LEVEL = 10
    static UNCONCERNED_LEVEL = 20
    static UNINTERESTED_LEVEL = 30
    static INNOCENT_LEVEL = 40
    static getLevelFromName(name){
        switch(name){
            case DecorumLevels.VULGAR:
                return DecorumLevels.VULGAR_LEVEL
            case DecorumLevels.INDECENT:
                return DecorumLevels.INDECENT_LEVEL
            case DecorumLevels.UNCONCERNED:
                return DecorumLevels.UNCONCERNED_LEVEL
            case DecorumLevels.UNINTERESTED:
                return DecorumLevels.UNINTERESTED_LEVEL
            case DecorumLevels.INNOCENT:
                return DecorumLevels.INNOCENT_LEVEL
            default:
                throw new Error("ERROR: DecorumLevels.getLevelFromName: Can't find '" + name + "'.")
        }
    }
}

class PersonalityPresets {
    static ZEROES = "ZEROES"
    static DEFAULT = "DEFAULT"
    static MEEK = "MEEK"
    static SWEET = "SWEET"
    static NICE = "NICE"
    static BITCHY = "BITCHY"
    static COLD = "COLD"
    static ENTITLED = "ENTITLED"
    static REBEL = "REBEL"
    static SLUTTY = "SLUTTY"
    static SELF_CENTERED = "SELF_CENTERED"
    static DECEITFUL_MANIPULATOR = "DECEITFUL_MANIPULATOR"
    static BULLY = "BULLY"
    static EVIL_PERSECUTOR = "EVIL_PERSECUTOR"
}

class AttitudePresets {
    static ZEROES = 0
    static GENERAL = 1
}

class CharacterPersonality extends SugarcubeSerializableObject {
    constructor(prideElements, shameElements, personalityPreset = PersonalityPresets.DEFAULT){
        super()
        this.qualifiedTraits = new Map()
        switch (personalityPreset){
            case PersonalityPresets.ZEROES:
                this.prideElements = undefined
                this.shameElements = undefined
                this.empathy = undefined
                this.submission = undefined
                this.sociability = undefined
                this.smarts = undefined
                this.courage = undefined
                this.sexualLiberty = undefined
                this.morality = undefined
                break
            case PersonalityPresets.MEEK:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.AMIABLE
                this.submission = SubmissivenessLevels.DOCILE
                this.sociability = SociabilityLevels.WITHDRAWN
                this.smarts = undefined
                this.courage = CourageLevels.COWARDLY
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_LIBERATED
                this.morality = MoralityLevels.FAIRLY_UPRIGHT
                break
            case PersonalityPresets.SWEET:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.SWEET
                this.submission = SubmissivenessLevels.DEFERENTIAL
                this.sociability = SociabilityLevels.EXPANSIVE
                this.smarts = undefined
                this.courage = CourageLevels.FEARFUL
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_LIBERATED
                this.morality = MoralityLevels.VERY_UPRIGHT
                break
            case PersonalityPresets.NICE:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.AMIABLE
                this.submission = SubmissivenessLevels.COMPLIANT
                this.sociability = SociabilityLevels.CORDIAL
                this.smarts = undefined
                this.courage = CourageLevels.FEARFUL
                this.sexualLiberty = SexualLibertyLevels.LIBERATED
                this.morality = MoralityLevels.FAIRLY_UPRIGHT
                break
            case PersonalityPresets.BITCHY:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.CALLOUS
                this.submission = SubmissivenessLevels.UNYIELDING
                this.sociability = SociabilityLevels.COOL
                this.smarts = undefined
                this.courage = CourageLevels.DARING
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_REPRESSED
                this.morality = MoralityLevels.SLIGHTLY_AMORAL
                break
            case PersonalityPresets.COLD:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.ALOOF
                this.submission = SubmissivenessLevels.COMPROMISING
                this.sociability = SociabilityLevels.COOL
                this.smarts = undefined
                this.courage = CourageLevels.DARING
                this.sexualLiberty = SexualLibertyLevels.REPRESSED
                this.morality = MoralityLevels.SLIGHTLY_AMORAL
                break
            case PersonalityPresets.ENTITLED:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.CALLOUS
                this.submission = SubmissivenessLevels.UNYIELDING
                this.sociability = SociabilityLevels.COOL
                this.smarts = undefined
                this.courage = CourageLevels.TOUGH
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_REPRESSED
                this.morality = MoralityLevels.FAIRLY_AMORAL
                break
            case PersonalityPresets.REBEL:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.CALLOUS
                this.submission = SubmissivenessLevels.REBELLIOUS
                this.sociability = SociabilityLevels.WITHDRAWN
                this.smarts = undefined
                this.courage = CourageLevels.DARING
                this.sexualLiberty = SexualLibertyLevels.VERY_LIBERATED
                this.morality = MoralityLevels.SEVERELY_AMORAL
                break
            case PersonalityPresets.SLUTTY:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.ALOOF
                this.submission = SubmissivenessLevels.COMPLIANT
                this.sociability = SociabilityLevels.OUTGOING
                this.smarts = undefined
                this.courage = CourageLevels.TOUGH
                this.sexualLiberty = SexualLibertyLevels.VERY_LIBERATED
                this.morality = MoralityLevels.SLIGHTLY_AMORAL
                break
            case PersonalityPresets.SELF_CENTERED:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.ALOOF
                this.submission = SubmissivenessLevels.UNYIELDING
                this.sociability = SociabilityLevels.COOL
                this.smarts = undefined
                this.courage = CourageLevels.TOUGH
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_REPRESSED
                this.morality = MoralityLevels.FAIRLY_AMORAL
                break
            case PersonalityPresets.DECEITFUL_MANIPULATOR:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.CALLOUS
                this.submission = SubmissivenessLevels.COMPROMISING
                this.sociability = SociabilityLevels.EXPANSIVE
                this.smarts = undefined
                this.courage = CourageLevels.DARING
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_REPRESSED
                this.morality = MoralityLevels.SEVERELY_AMORAL
                break
            case PersonalityPresets.BULLY:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.MEAN
                this.submission = SubmissivenessLevels.UNYIELDING
                this.sociability = SociabilityLevels.COOL
                this.smarts = undefined
                this.courage = CourageLevels.TOUGH
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_LIBERATED
                this.morality = MoralityLevels.SEVERELY_AMORAL
                break
            case PersonalityPresets.EVIL_PERSECUTOR:
                this.prideElements = new Map()
                this.shameElements = new Map()
                this.empathy = EmpathyLevels.CRUEL
                this.submission = SubmissivenessLevels.UNYIELDING
                this.sociability = SociabilityLevels.EXPANSIVE
                this.smarts = undefined
                this.courage = CourageLevels.FEARFUL
                this.sexualLiberty = SexualLibertyLevels.REPRESSED
                this.morality = MoralityLevels.EXTREMELY_AMORAL
                break
            default:
                this.prideElements = prideElements
                this.shameElements = shameElements
                this.empathy = EmpathyLevels.ALOOF
                this.submission = SubmissivenessLevels.COMPROMISING
                this.sociability = SociabilityLevels.CORDIAL
                this.courage = CourageLevels.CAUTIOUS
                this.sexualLiberty = SexualLibertyLevels.SLIGHTLY_LIBERATED
                this.morality = MoralityLevels.SLIGHTLY_UPRIGHT
        }
    }
    getSelfWorth(){
        return this.getPrideLevel() - this.getShameLevel()
    }
    getPrideLevel(){
        let totalPride = 0
        for(let element of this.prideElements.keys()){
            totalPride += this.prideElements.get(element)
        }
        return totalPride
    }
    getShameLevel(){
        let totalShame = 0
        for(let element of this.shameElements.keys()){
            totalShame += this.shameElements.get(element)
        }
        return totalShame
    }
}

class CharacterAttitudeBase extends SugarcubeSerializableObject {
    static SMUGNESS = "SMUGNESS"
    static NICENESS = "NICENESS"
    static SOCIABILITY = "SOCIABILITY"
    static IRASCIBLE_THRESHOLD = "IRASCIBLE_THRESHOLD"
    static MELANCHOLY_THRESHOLD = "MELANCHOLY_THRESHOLD"
    static DECORUM = "DECORUM"
    static FLIRTINESS = "FLIRTINESS"
    static DILIGENCE = "DILIGENCE"
    static BRAVERY = "BRAVERY"
    constructor(attitudePresets = AttitudePresets.GENERAL){
        super()
        switch(attitudePresets){
            case AttitudePresets.ZEROES:
                this.smugness = undefined
                this.niceness = undefined
                this.sociability = undefined
                this.irascibleThreshold = undefined
                this.melancholyThreshold = undefined
                this.liberated = undefined
                this.flirtiness = undefined
                this.diligence = undefined
                this.bravery = undefined
                break
            default:
                this.smugness = PrideLevels.SMUG
                this.niceness = NicenessLevels.ALOOF
                this.sociability = SociabilityLevels.CORDIAL
                this.irascibleThreshold = IrascibleThresholdLevels.IRASCIBLE
                this.melancholyThreshold = MelancholyThresholdLevels.MELANCHOLY
                this.decorum = DecorumLevels.UNCONCERNED
                this.flirtiness = FlirtinessLevels.FLIRTY
                this.diligence = DutifulnessLevels.UNCERTAIN
                this.bravery = CourageLevels.CAUTIOUS
        }
    }
}

class CharacterAttitude extends SugarcubeSerializableObject {
    static GENERAL_CONTEXT = "GENERAL_CONTEXT"
    static INTIMATE_CONTEXT = "INTIMATE_CONTEXT"
    static LOVERS_CONTEXT = "LOVERS_CONTEXT"
    constructor(generalAttitudePreset = AttitudePresets.GENERAL, attitudeAmongIntimiatesOverloadsPreset = AttitudePresets.ZEROES, attitudeWithLoversOverloadsPreset = AttitudePresets.ZEROES){
        super()
        this.generalAttitude = new CharacterAttitudeBase(generalAttitudePreset)
        this.attitudeAmongIntimiatesOverloads = new CharacterAttitudeBase(attitudeAmongIntimiatesOverloadsPreset)
        this.attitudeWithLoversOverloads = new CharacterAttitudeBase(attitudeWithLoversOverloadsPreset)
    }
    getTrait(traitName, context = CharacterAttitude.GENERAL_CONTEXT){
        let generalContext = this.generalAttitude
        let specificContext = undefined
        switch(context){
            case CharacterAttitude.GENERAL_CONTEXT:
                specificContext = this.generalAttitude
            case CharacterAttitude.INTIMATE_CONTEXT:
                specificContext = this.attitudeAmongIntimiatesOverloads
                break
            case CharacterAttitude.LOVERS_CONTEXT:
                specificContext = this.attitudeWithLoversOverloads
                break
            default:
                throw new Error("ERROR: CharacterAttitude.getTrait: Can't find '" + context + "' among CharacterAttitude contexts.")
        }
        let value = undefined
        switch(traitName){
            case CharacterAttitudeBase.SMUGNESS:
                value = specificContext.smugness
                if (value !== undefined){
                    value = generalContext.smugness
                }
                return value
            case CharacterAttitudeBase.NICENESS:
                value = specificContext.niceness
                if (value !== undefined){
                    value = generalContext.niceness
                }
                return value
            case CharacterAttitudeBase.SOCIABILITY:
                value = specificContext.sociability
                if (value !== undefined){
                    value = generalContext.sociability
                }
                return value
            case CharacterAttitudeBase.IRASCIBLE_THRESHOLD:
                value = specificContext.irascibleThreshold
                if (value !== undefined){
                    value = generalContext.irascibleThreshold
                }
                return value
            case CharacterAttitudeBase.MELANCHOLY_THRESHOLD:
                value = specificContext.melancholyThreshold
                if (value !== undefined){
                    value = generalContext.melancholyThreshold
                }
                return value
            case CharacterAttitudeBase.DECORUM:
                value = specificContext.decorum
                if (value !== undefined){
                    value = generalContext.decorum
                }
                return value
            case CharacterAttitudeBase.DILIGENCE:
                value = specificContext.diligence
                if (value !== undefined){
                    value = generalContext.diligence
                }
                return value
            case CharacterAttitudeBase.BRAVERY:
                value = specificContext.bravery
                if (value !== undefined){
                    value = generalContext.bravery
                }
                return value
            case CharacterAttitudeBase.FLIRTINESS:
                value = specificContext.flirtiness
                if (value !== undefined){
                    value = generalContext.flirtiness
                }
                return value
            default:
                throw new Error("ERROR: CharacterAttitude.getTrait: Can't find '" + traitName + "' among CharacterAttitudeBase traits.")
        }
    }
}
