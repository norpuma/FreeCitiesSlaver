class BodyPartSize {
    static MINUSCULE = -3
    static TINY = -2
    static SMALL = -1
    static AVERAGE = 0
    static BIG = 1
    static HUGE = 2
}

class BodyPart extends SugarcubeSerializableObject {
    constructor(name, parent){
        super()
        this.name = name
        // if (parent !== undefined){
        //     this.setParent(parent)
        // }
        this.value = undefined
        this.size = BodyPartSize.AVERAGE
        this.descriptors = new Array()
        this.qualities = new Map()
        this.children = new Map()
    }
    // setParent(parent){
    //     this.parent = parent
    //     parent.children.set(this.name, this)
    // }
}

class FaceProperties {
    static GORGEOUS = "GORGEOUS"
    static PRETTY = "PRETTY"
    static CUTE = "CUTE"
    static INNOCENT = "INNOCENT"
    static YOUNG_LOOKING = "YOUNG_LOOKING"
    static AVERAGE_LOOKING = "AVERAGE_LOOKING"
    static ORDINARY = "ORDINARY"
    static PLAIN = "PLAIN"
    static UNATTRACTIVE = "UNATTRACTIVE"
    static UGLY = "UGLY"
    static HIDEOUS = "HIDEOUS"
}

class BodyParts extends SugarcubeSerializableObject {
    constructor(gender){
        super()
        this.HEAD = new BodyPart(BodyParts.HEAD)
        this.CHEEKS = new BodyPart(BodyParts.CHEEKS, this.HEAD)
        this.FACE = this.generateFace()
        this.HAIR = new BodyPart(BodyParts.HAIR, this.HEAD)
        // # pixie cut, chanel cut, ear-long, jaw-length, should-length, middle-of-the-back, to her butt long
        // self.hair_length_descriptors = ["shoulder-length"]
        // # BLACK (black, raven, night-colored), DARK_BROWN (dark brown, dark, chestnut), LIGHT_BROWN (fair, light, ), BLONDE (blonde, golden, sandy), WHITE_BLONDE (platinum, champagne, icy), RED_HEAD (coppery, strawberry, fiery)
        // self.hair_color_descriptors = ["black", "raven", "night-colored"]
        // # wavy, curly, in cornrows, straight, silky
        // self.hair_quality_descriptors = ["wavy"]
        this.EYES = new BodyPart(BodyParts.EYES, this.HEAD)
        // # DARK (dark, mysterious, night-colored), LIGHT_BROWN (light-brown, hazel, honey-colored), YELLOW (golden, amethyst-colored), LIGHT_BLUE (icy-blue, baby-blue, light blue), DARK_BLUE (sapphire, lake-blue, dark blue), GREEN (emerald, shiny green, jade-colored), PURPLE (purple, exotic, lavender)
        // self.eye_color_descriptors = ["dark", "mysterious black", "night-colored"]
        this.NOSE = new BodyPart(BodyParts.NOSE, this.HEAD)
        // # small nose, button nose, proud nose, high cheekbones, dimpling cheeks, cute chin, perfect skin
        // self.nose_descriptors = ["small nose"]
        this.MOUTH = new BodyPart(BodyParts.MOUTH, this.HEAD)
        // # small mouth, broad mouth, pouty lips, beestung lips, thin lips
        // self.mouth_descriptors = ["broad mouth"]
        this.LIPS = new BodyPart(BodyParts.LIPS, this.MOUTH)
        this.TONGUE = new BodyPart(BodyParts.TONGUE, this.MOUTH)

        this.THROAT = new BodyPart(BodyParts.THROAT)

        this.ARMS = new BodyPart(BodyParts.ARMS)
        this.SHOULDERS = new BodyPart(BodyParts.SHOULDERS, this.ARMS)

        this.HANDS = new BodyPart(BodyParts.HANDS)
        this.FINGERS = new BodyPart(BodyParts.FINGERS, this.HANDS)

        this.CHEST = new BodyPart(BodyParts.CHEST)
        this.BREASTS = this.generateBreasts(gender)
        // # ALWAY START WITH CUP SIZE. [AA cup, nonexistant, flat], [A cup, tiny, mosquito bites], [B cup, small, modest, perky], [C cup, perky, round, torpedo-shaped], [D cup, round, perky, proud, big, heavy], [DD cup, heavy, saggy, round, teardrop-shaped], [E cup, heavy, big, saggy, udders], [F cup, enormous, saggy, very heavy, udders].
        // # ADD NIPPLES LAST. Hard, pointy, timid, puffy, inverted, pencil-eraser, timid.
        // self.breast_descriptors = ("C cup", ["perky", "round"], "timid nipples") # ALWAY START WITH CUP SIZE. ADD NIPPLES LAST.
        this.NIPPLES = new BodyPart(BodyParts.NIPPLES, this.BREASTS)

        this.MID_SECTION = new BodyPart(BodyParts.MID_SECTION)
        this.BACK = new BodyPart(BodyParts.BACK, this.MID_SECTION)
        this.STOMACH = new BodyPart(BodyParts.STOMACH, this.MID_SECTION)

        this.CROTCH = new BodyPart(BodyParts.CROTCH)
        this.PUBES = new BodyPart(BodyParts.PUBES, this.CROTCH)
        // # bald, trimmed landing strip, wild bush, neat triangle, small patch, heart-shaped
        // self.pubic_hair_descriptor = "trimmed landing strip"
        if (gender == Gender.FEMALE){
            this.VULVA = new BodyPart(BodyParts.VULVA, this.CROTCH)
            // # thin outer lips, timid inner lips, long inner lips, frilly inner lips, dark inner lips, pink outer, dark outer lips, smooth outer lips, meaty outer lips, hooded small clit, hooded immodest clit, big clit, exposed clit.
            // self.vulva_descriptors = ("smooth outer lips", "pink and short inner lips", "hooded, small clit") # OUTER LIPS, INNER LIPS, CLIT
            this.VAGINA = new BodyPart(BodyParts.VAGINA, this.VULVA)
            this.CLIT = new BodyPart(BodyParts.CLIT, this.VULVA)
        } else {
            this.PENIS = new BodyPart(BodyParts.PENIS, this.CROTCH)
            this.SCROTUM = new BodyPart(BodyParts.SCROTUM, this.CROTCH)
        }

        this.BUTT = new BodyPart(BodyParts.BUTT)
        // # flat, modest, toned, round, plump, bubble-shaped, hard, impressive, advantaged, big
        // self.butt_descriptors = ["round", "toned"]
        this.ANUS = new BodyPart(BodyParts.ANUS, this.BUTT)
        this.RECTUM = new BodyPart(BodyParts.RECTUM, this.ANUS)

        this.THIGHS = new BodyPart(BodyParts.THIGHS)
        // # short, long, thin, athletic, strong, dancer's, athlete's, runners, gazelle's, toned
        // self.legs_descriptors = []

        this.FEET = new BodyPart(BodyParts.FEET)
    }
    generateFace(){
        // TODO: Allow for a random generation option.
        let face = new BodyPart(BodyParts.FACE, this.HEAD)
        face.value = FaceProperties.CUTE
        return face
    }
    generateBreasts(gender){
        // TODO: Allow for a random generation option.
        let breasts = new BodyPart(BodyParts.BREASTS, this.CHEST)
        if (gender == Gender.FEMALE){
            breasts.size = BodyPartSize.AVERAGE
        } else {
            breasts.size = BodyPartSize.MINUSCULE
        }
    }
    /// Indicates if a given body part is accessible. This is, usually, used to check if a character is clothed or is wearing some kind of chastity device, preventing the body part from being accessible.
    isAccessible(bodyPart){
        if (this[bodyPart] === undefined){
            return false
        }
        return true
    }
    static HEAD = "HEAD"
    static CHEEKS = "CHEEKS"
    static FACE = "FACE"
    static HAIR = "HAIR"
    static EYES = "EYES"
    static NOSE = "NOSE"
    static MOUTH = "MOUTH"
    static LIPS = "LIPS"
    static TONGUE = "TONGUE"
    static THROAT = "THROAT"
    static ARMS = "ARMS"
    static SHOULDERS = "SHOULDERS"
    static HANDS = "HANDS"
    static FINGERS = "FINGERS"
    static CHEST = "CHEST"
    static BREASTS = "BREASTS"
    static NIPPLES = "NIPPLES"
    static MID_SECTION = "MID_SECTION"
    static BACK = "BACK"
    static STOMACH = "STOMACH"
    static CROTCH = "CROTCH"
    static PUBES = "PUBES"
    static VULVA = "VULVA"
    static VAGINA = "VAGINA"
    static CLIT = "CLIT"
    static PENIS = "PENIS"
    static SCROTUM = "SCROTUM"
    static ANUS = "ANUS"
    static RECTUM = "RECTUM"
    static THIGHS = "THIGHS"
    static FEET = "FEET"
}

class HeightGroup {
    static TINY = "TINY"
    static PETITE = "PETITE"
    static SHORT = "SHORT"
    static SHORT_AND_STACKED = "SHORT_AND_STACKED"
    static STUMPY = "STUMPY"
    static AVERAGE_SIZED = "AVERAGE_SIZED"
    static STRETCHY = "STRETCHY"
    static TALL = "TALL"
    static BIG = "BIG"
    static GIANT = "GIANT"
}

class BodyFatAppearanceGroup {
    static THIN = "THIN"
    static SLIM = "SLIM"
    static MUSCULAR = "MUSCULAR"
    static ATHLETIC = "ATHLETIC"
    static FIT = "FIT"
    static AVERAGE = "AVERAGE"
    static ROUNDED = "ROUNDED"
    static VOLUPTUOUS = "VOLUPTUOUS"
    static CHUBBY = "CHUBBY"
    static FAT = "FAT"
    static ENORMOUS = "ENORMOUS"
}

class SkinColorGroup {
    static WHITE = "WHITE"
    static CARAMEL = "CARAMEL"
    static OLIVE = "OLIVE"
    static DARK = "DARK"
    static BLACK = "BLACK"
}

class Ethnicity {
    static CAUCASIAN = "CAUCASIAN"
    static LATINX = "LATINX"
    static BLACK = "BLACK"
    static ASIAN = "ASIAN"
}

class CharacterBody extends SugarcubeSerializableObject {
    constructor(gender = Gender.FEMALE, age = 18){
        super()
        this.gender = gender
        this.age = age
        this.bodyParts = new BodyParts(this.gender)
        this.fitness = CharacterBody.DEFAULT_FITNESS_VALUE
        // TINY, PETITE, SHORT, SHORT_AND_STACKED, STUMPY, AVERAGE_SIZED, STRETCHY, TALL, BIG, AMAZON
        this.heightGroup = HeightGroup.AVERAGE_SIZED
        // THIN, SLIM, ATHLETIC, FIT, AVERAGE, ROUNDED, VOLUPTUOUS, CHUBBY, FAT, ENORMOUS
        this.bodyFatAppearanceGroup = BodyFatAppearanceGroup.AVERAGE
        this.ethnicity = CharacterBody.DEFAULT_ETHNICITY
        // WHITE (white, creamy, pale, fair), CARAMEL (caramel, tanned, café-au-lait, latina hue), OLIVE (olive, mediterranean, magrebin), DARK (dark, brown, shaded, chocolate-colored), BLACK (black, night-hued, deep, coffee-colored)
        // coppery?
        this.skinGroupDescriptors = CharacterBody.DEFAULT_SKIN_COLOR_GROUP // ["caramel", "tanned", "café-au-lait", "latina-hued"]
        this.bodyParts = new BodyParts(gender)

        /*
        // TODO: Remove if no longer necessary.
        self.birth_week = 30
        self.age_group = age_group_from_age(self.age)
        self.health = 8 # 0 to 10
        self.stamina = 6 # 0 to 10; recharges with fitness (+1/5 per hour and resets to fitness+2 after a night-long sleep).
        # piercings
        # make-up
        # tattoos
        */
    }
    static DEFAULT_FITNESS_VALUE = TraitIntensity.SUFFICIENTLY
    static DEFAULT_ETHNICITY = Ethnicity.LATINX
    static DEFAULT_SKIN_COLOR_GROUP = SkinColorGroup.CARAMEL
    isFit(){
        if (this.fitness >= TraitIntensity.NICELY){
            return true
        } else {
            return false
        }
    }
    isFaceTraditionallyAttractive(){
        let faceAttractiveness = this.bodyParts.HEAD.children.FACE.value
        if ((faceAttractiveness == FaceProperties.CUTE) || (faceAttractiveness == FaceProperties.PRETTY) || (faceAttractiveness.GORGEOUS)){
            return true
        } else {
            return false
        }
    }
    hasBigBreasts(){
        let brastsSize = this.bodyParts.CHEST.children.BREASTS.size
        if ((brastsSize == BodyPartSize.BIG) || (brastsSize == BodyPartSize.HUGE)){
            return true
        } else {
            return false
        }
    }
    hasBigCock(){
        let penisSize = this.bodyParts.CROTCH.children.PENIS.size
        if ((penisSize == BodyPartSize.BIG) || (penisSize == BodyPartSize.HUGE)){
            return true
        } else {
            return false
        }
    }
}

class AgeGroup {
    constructor(identifier){
        this.identifier = identifier
    }
    static ERROR = -1
    static CHILD = 0
    static TEENAGER = 1
    static YOUNG_ADULT = 2
    static ADULT = 3
    static MATURE_ADULT = 4
    static ELDER = 5
    static IDENTIFIERS = {
        ERROR: "ERROR",
        CHILD: "CHILD",
        TEENAGER: "TEENAGER",
        YOUNG_ADULT: "YOUNG_ADULT",
        ADULT: "ADULT",
        MATURE_ADULT: "MATURE_ADULT",
        ELDER: "ELDER"
    }
}

function ageGroupFromAge(age){
    if (age < 18){
        return AgeGroup.CHILD
    } else if ((age >= 18) && (age <= 20)){
        return AgeGroup.TEENAGER
    } else if ((age >= 21) && (age <= 26)){
        return AgeGroup.YOUNG_ADULT
    } else if ((age >= 27) && (age <= 32)){
        return AgeGroup.ADULT
    } else if ((age >= 33) && (age <= 39)){
        return AgeGroup.MATURE_ADULT
    } else if ((age >= 40)){
        return AgeGroup.ELDER
    } else {
        return -1
    }
}

class CharacterBodyTraits {
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
            return TraitIntensity.NOT_SCORE
        }
        switch (character.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.AVERAGE:
                return TraitIntensity.INSIGNIFICANTLY_SCORE
            case BodyFatAppearanceGroup.ROUNDED:
                return TraitIntensity.MODERATELY_SCORE
            case BodyFatAppearanceGroup.VOLUPTUOUS:
                return TraitIntensity.MODERATELY_SCORE
            case BodyFatAppearanceGroup.CHUBBY:
                return TraitIntensity.MODERATELY_SCORE
            case BodyFatAppearanceGroup.FAT:
                return TraitIntensity.SIGNIFICANTLY_SCORE
            case BodyFatAppearanceGroup.ENORMOUS:
                return TraitIntensity.EXTREMELY_SCORE
            default:
                // case BodyFatAppearanceGroup.THIN:
                // case BodyFatAppearanceGroup.SLIM:
                // case BodyFatAppearanceGroup.MUSCULAR:
                // case BodyFatAppearanceGroup.ATHLETIC:
                // case BodyFatAppearanceGroup.FIT:
                return TraitIntensity.NOT_SCORE
        }
    }
    static evaluate_VERY_FAT(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        switch (evaluatedCharacter.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.FAT:
                return TraitIntensity.INSIGNIFICANTLY_SCORE
            case BodyFatAppearanceGroup.ENORMOUS:
                return TraitIntensity.SIGNIFICANTLY_SCORE
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
                return TraitIntensity.NOT_SCORE
        }
    }
    static evaluate_FIT(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        switch (evaluatedCharacter.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.AVERAGE:
                return TraitIntensity.INSIGNIFICANTLY_SCORE
            case BodyFatAppearanceGroup.FIT:
                return TraitIntensity.SIGNIFICANTLY_SCORE
            case BodyFatAppearanceGroup.ATHLETIC:
                return TraitIntensity.VERY_SCORE
            case BodyFatAppearanceGroup.MUSCULAR:
                return TraitIntensity.EXTREMELY_SCORE
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
                    return TraitIntensity.NOT_SCORE
        }
    }
    static evaluate_VERY_FIT(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        switch (evaluatedCharacter.bodyFatAppearanceGroup){
            case BodyFatAppearanceGroup.FIT:
                return TraitIntensity.INSIGNIFICANTLY_SCORE
            case BodyFatAppearanceGroup.ATHLETIC:
                return TraitIntensity.MODERATELY_SCORE
            case BodyFatAppearanceGroup.MUSCULAR:
                return TraitIntensity.SIGNIFICANTLY_SCORE
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
                    return TraitIntensity.NOT_SCORE
        }
    }
    static evaluate_OLD(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatedCharacterAgeGroup){
            case AgeGroup.ADULT:
                return TraitIntensity.INSIGNIFICANTLY_SCORE
            case AgeGroup.MATURE_ADULT:
                return TraitIntensity.SIGNIFICANTLY_SCORE
            case AgeGroup.ELDER:
                return TraitIntensity.VERY_SCORE
            default:
                // case AgeGroup.TEENAGER:
                // case AgeGroup.YOUNG_ADULT:
                return TraitIntensity.NOT_SCORE
        }
    }
    static evaluate_VERY_OLD(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatedCharacterAgeGroup){
            case AgeGroup.MATURE_ADULT:
                return TraitIntensity.INSIGNIFICANTLY_SCORE
            case AgeGroup.ELDER:
                return TraitIntensity.SIGNIFICANTLY_SCORE
            default:
                // case AgeGroup.TEENAGER:
                // case AgeGroup.YOUNG_ADULT:
                // case AgeGroup.ADULT:
                return TraitIntensity.NOT_SCORE
        }
    }
    static evaluate_OLDER(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        if ((evaluatingCharacter === undefined) || (evaluatingCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        let evaluatingCharacterAgeGroup = ageGroupFromAge(evaluatingCharacter.body.age)
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatingCharacterAgeGroup){
            case AgeGroup.TEENAGER:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.YOUNG_ADULT:
                        return TraitIntensity.MODERATELY_SCORE
                    case AgeGroup.ADULT:
                        return TraitIntensity.SIGNIFICANTLY_SCORE
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.EXTREMELY_SCORE
                    case AgeGroup.ELDER:
                        return TraitIntensity.EXCESSIVELY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            case AgeGroup.YOUNG_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ADULT:
                        return TraitIntensity.MODERATELY_SCORE
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.SIGNIFICANTLY_SCORE
                    case AgeGroup.ELDER:
                        return TraitIntensity.EXTREMELY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            case AgeGroup.ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.SIGNIFICANTLY_SCORE
                    case AgeGroup.ELDER:
                        return TraitIntensity.MODERATELY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            case AgeGroup.MATURE_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ELDER:
                        return TraitIntensity.SIGNIFICANTLY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            default:
                return TraitIntensity.NOT_SCORE
        }
    }
    static evaluate_MUCH_OLDER(evaluatingCharacter, evaluatedCharacter){
        if ((evaluatedCharacter === undefined) || (evaluatedCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        if ((evaluatingCharacter === undefined) || (evaluatingCharacter.body === undefined)) {
            return TraitIntensity.NOT_SCORE
        }
        let evaluatingCharacterAgeGroup = ageGroupFromAge(evaluatingCharacter.body.age)
        let evaluatedCharacterAgeGroup = ageGroupFromAge(evaluatedCharacter.body.age)
        switch(evaluatingCharacterAgeGroup){
            case AgeGroup.TEENAGER:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.YOUNG_ADULT:
                        return TraitIntensity.INSIGNIFICANTLY_SCORE
                    case AgeGroup.ADULT:
                        return TraitIntensity.MODERATELY_SCORE
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.SIGNIFICANTLY_SCORE
                    case AgeGroup.ELDER:
                        return TraitIntensity.EXTREMELY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            case AgeGroup.YOUNG_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ADULT:
                        return TraitIntensity.INSIGNIFICANTLY_SCORE
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.MODERATELY_SCORE
                    case AgeGroup.ELDER:
                        return TraitIntensity.SIGNIFICANTLY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            case AgeGroup.ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.MATURE_ADULT:
                        return TraitIntensity.INSIGNIFICANTLY_SCORE
                    case AgeGroup.ELDER:
                        return TraitIntensity.SIGNIFICANTLY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            case AgeGroup.MATURE_ADULT:
                switch(evaluatedCharacterAgeGroup){
                    case AgeGroup.ELDER:
                        return TraitIntensity.INSIGNIFICANTLY_SCORE
                    default:
                        return TraitIntensity.NOT_SCORE
                }
            default:
                return TraitIntensity.NOT_SCORE
        }
    }
}
