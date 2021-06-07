class BodyPartSize {
    static MINUSCULE = "MINUSCULE"
    static TINY = "TINY"
    static SMALL = "SMALL"
    static AVERAGE = "AVERAGE"
    static BIG = "BIG"
    static HUGE = "HUGE"
    static MINUSCULE_LEVEL = -3
    static TINY_LEVEL = -2
    static SMALL_LEVEL = -1
    static AVERAGE_LEVEL = 0
    static BIG_LEVEL = 1
    static HUGE_LEVEL = 2
    static getNameFromLevel(level){
        switch(level){
            case BodyPartSize.MINUSCULE_LEVEL:
                return BodyPartSize.MINUSCULE
            case BodyPartSize.TINY_LEVEL:
                return BodyPartSize.TINY
            case BodyPartSize.SMALL_LEVEL:
                return BodyPartSize.SMALL
            case BodyPartSize.AVERAGE_LEVEL:
                return BodyPartSize.AVERAGE
            case BodyPartSize.BIG_LEVEL:
                return BodyPartSize.BIG
            case BodyPartSize.HUGE_LEVEL:
                return BodyPartSize.HUGE
            default:
                throw new Error("ERROR: BodyPartSize.getNameFromLevel: Can't find a name for level '" + level + "'.")
        }
    }
}

class BodyPart extends SugarcubeSerializableObject {
    constructor(name, parentString){
        super()
        this.name = name
        this.parentString = parentString
        this.value = undefined
        this.size = BodyPartSize.AVERAGE
        this.descriptors = new Array()
        this.qualities = new Map()
        this.children = new Map()
        this.isAccessible = true
        // Visible and Hinted At can be implemented for games that may treat this.
        // this.isVisible = true
        // this.isHinted = true
    }
    addChild(childBodyPart){
        this.children.push(childBodyPart)
        return childBodyPart
    }
}

class FaceProperties {
    static GORGEOUS = "GORGEOUS"
    static BEAUTIFUL = "BEAUTIFUL"
    static CUTE = "CUTE"
    static INNOCENT = "INNOCENT"
    static YOUNG_LOOKING = "YOUNG_LOOKING"
    static AVERAGE_LOOKING = "AVERAGE_LOOKING"
    static ORDINARY = "ORDINARY"
    static PLAIN = "PLAIN"
    static UNATTRACTIVE = "UNATTRACTIVE"
    static UGLY = "UGLY"
    static HIDEOUS = "HIDEOUS"
    static HIDEOUS_LEVEL = -3
    static UGLY_LEVEL = -2
    static UNATTRACTIVE_LEVEL = -1
    static PLAIN_LEVEL = 0
    static CUTE_LEVEL = 1
    static BEAUTIFUL_LEVEL = 2
    static GORGEOUS_LEVEL = 3
}

class BodyParts extends SugarcubeSerializableObject {
    constructor(gender){
        super()
        this.HEAD = new BodyPart(BodyParts.HEAD)
        this.CHEEKS = this.HEAD.addChild(new BodyPart(BodyParts.CHEEKS, BodyParts.HEAD))
        this.FACE = this.HEAD.addChild(BodyParts.generateFace())
        this.HAIR = this.HEAD.addChild(new BodyPart(BodyParts.HAIR, BodyParts.HEAD))
        // # pixie cut, chanel cut, ear-long, jaw-length, should-length, middle-of-the-back, to her butt long
        // self.hair_length_descriptors = ["shoulder-length"]
        // # BLACK (black, raven, night-colored), DARK_BROWN (dark brown, dark, chestnut), LIGHT_BROWN (fair, light, ), BLONDE (blonde, golden, sandy), WHITE_BLONDE (platinum, champagne, icy), RED_HEAD (coppery, strawberry, fiery)
        // self.hair_color_descriptors = ["black", "raven", "night-colored"]
        // # wavy, curly, in cornrows, straight, silky
        // self.hair_quality_descriptors = ["wavy"]
        this.EYES = this.FACE.addChild(new BodyPart(BodyParts.EYES, BodyParts.FACE))
        // # DARK (dark, mysterious, night-colored), LIGHT_BROWN (light-brown, hazel, honey-colored), YELLOW (golden, amethyst-colored), LIGHT_BLUE (icy-blue, baby-blue, light blue), DARK_BLUE (sapphire, lake-blue, dark blue), GREEN (emerald, shiny green, jade-colored), PURPLE (purple, exotic, lavender)
        // self.eye_color_descriptors = ["dark", "mysterious black", "night-colored"]
        this.NOSE = this.FACE.addChild(new BodyPart(BodyParts.NOSE, BodyParts.FACE))
        // # small nose, button nose, proud nose, high cheekbones, dimpling cheeks, cute chin, perfect skin
        // self.nose_descriptors = ["small nose"]
        this.MOUTH = this.FACE.addChild(new BodyPart(BodyParts.MOUTH, BodyParts.FACE))
        // # small mouth, broad mouth, pouty lips, beestung lips, thin lips
        // self.mouth_descriptors = ["broad mouth"]
        this.LIPS = this.MOUTH.addChild(new BodyPart(BodyParts.LIPS, BodyParts.MOUTH))
        this.TONGUE = this.MOUTH.addChild(new BodyPart(BodyParts.TONGUE, BodyParts.MOUTH))

        this.THROAT = new BodyPart(BodyParts.THROAT)

        this.ARMS = new BodyPart(BodyParts.ARMS)
        this.SHOULDERS = new BodyPart(BodyParts.SHOULDERS)

        this.HANDS = new BodyPart(BodyParts.HANDS)
        this.FINGERS = this.HANDS.addChild(new BodyPart(BodyParts.FINGERS, BodyParts.HANDS))

        this.CHEST = new BodyPart(BodyParts.CHEST)
        this.BREASTS = this.CHEST.addChild(BodyParts.generateBreasts(gender))
        // # ALWAY START WITH CUP SIZE. [AA cup, nonexistant, flat], [A cup, tiny, mosquito bites], [B cup, small, modest, perky], [C cup, perky, round, torpedo-shaped], [D cup, round, perky, proud, big, heavy], [DD cup, heavy, saggy, round, teardrop-shaped], [E cup, heavy, big, saggy, udders], [F cup, enormous, saggy, very heavy, udders].
        // # ADD NIPPLES LAST. Hard, pointy, timid, puffy, inverted, pencil-eraser, timid.
        // self.breast_descriptors = ("C cup", ["perky", "round"], "timid nipples") # ALWAY START WITH CUP SIZE. ADD NIPPLES LAST.
        this.NIPPLES = this.BREASTS.addChild(new BodyPart(BodyParts.NIPPLES, BodyParts.BREASTS))

        this.MID_SECTION = new BodyPart(BodyParts.MID_SECTION)
        this.BACK = this.MID_SECTION.addChild(new BodyPart(BodyParts.BACK, BodyParts.MID_SECTION))
        this.STOMACH = this.MID_SECTION.addChild(new BodyPart(BodyParts.STOMACH, BodyParts.MID_SECTION))

        this.CROTCH = new BodyPart(BodyParts.CROTCH)
        this.PUBES = this.CROTCH.addChild(new BodyPart(BodyParts.PUBES, BodyParts.CROTCH))
        // # bald, trimmed landing strip, wild bush, neat triangle, small patch, heart-shaped
        // self.pubic_hair_descriptor = "trimmed landing strip"
        if (gender == Gender.FEMALE){
            this.VULVA = this.CROTCH.addChild(new BodyPart(BodyParts.VULVA, BodyParts.CROTCH))
            // # thin outer lips, timid inner lips, long inner lips, frilly inner lips, dark inner lips, pink outer, dark outer lips, smooth outer lips, meaty outer lips, hooded small clit, hooded immodest clit, big clit, exposed clit.
            // self.vulva_descriptors = ("smooth outer lips", "pink and short inner lips", "hooded, small clit") # OUTER LIPS, INNER LIPS, CLIT
            this.VAGINA = this.VULVA.addChild(new BodyPart(BodyParts.VAGINA, BodyParts.VULVA))
            this.CLIT = this.VULVA.addChild(new BodyPart(BodyParts.CLIT, BodyParts.VULVA))
        } else {
            this.PENIS = this.CROTCH.addChild(new BodyPart(BodyParts.PENIS, BodyParts.CROTCH))
            this.SCROTUM = this.CROTCH.addChild(new BodyPart(BodyParts.SCROTUM, BodyParts.CROTCH))
        }

        this.BUTT = new BodyPart(BodyParts.BUTT)
        // # flat, modest, toned, round, plump, bubble-shaped, hard, impressive, advantaged, big
        // self.butt_descriptors = ["round", "toned"]
        this.ANUS = this.BUTT.addChild(new BodyPart(BodyParts.ANUS, BodyParts.BUTT))
        this.RECTUM = this.ANUS.addChild(new BodyPart(BodyParts.RECTUM, BodyParts.ANUS))

        this.THIGHS = new BodyPart(BodyParts.THIGHS)
        // # short, long, thin, athletic, strong, dancer's, athlete's, runners, gazelle's, toned
        // self.legs_descriptors = []

        this.FEET = new BodyPart(BodyParts.FEET)
    }
    static generateFace(){
        // TODO: Allow for a random generation option.
        let face = new BodyPart(BodyParts.FACE, BodyParts.HEAD)
        face.value = FaceProperties.CUTE_LEVEL
        face.properties.push(FaceProperties.CUTE)
        return face
    }
    static generateBreasts(gender){
        // TODO: Allow for a random generation option.
        let breasts = new BodyPart(BodyParts.BREASTS, BodyParts.CHEST)
        if (gender == Gender.FEMALE){
            breasts.size = BodyPartSize.AVERAGE
        } else {
            breasts.size = BodyPartSize.MINUSCULE
        }
    }
    /// Indicates if a given body part is accessible. This is, usually, used to check if a character is clothed or is wearing some kind of chastity device, preventing the body part from being accessible.
    isAccessible(bodyPartName){
        let bodyPart = this.get(bodyPart)
        if (bodyPart.parent === undefined){
            return bodyPart.isAccessible
        } else {
            return this.isAccessible(bodyPart.parent)
        }
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

class BodyFatTendency {
    static VOLUPTUOUS_TENDENCY = "VOLUPTUOUS_TENDENCY"
    static SLIM_TENDENCY = "SLIM_TENDENCY"
}

class BodyFatBalanceLevels {
    static SLIM_BODY = "SLIM_BODY"
    static FIT_BODY = "FIT_BODY"
    static VOLUPTUOUS_BODY = "VOLUPTUOUS_BODY"
    static SLIM_BODY_LEVEL = -1
    static FIT_BODY_LEVEL = 0
    static VOLUPTUOUS_BODY_LEVEL = 1
}

class SlimBodyLevels {
    static SLIM = "SLIM"
    static THIN = "THIN"
    static SKINNY = "SKINNY"
    static BONY = "BONY"
    static SLIM_LEVEL = 0
    static THIN_LEVEL = -1
    static SKINNY_LEVEL = -2
    static BONY_LEVEL = -3
}

class VoluptuousBodyLevels {
    static VOLUPTUOUS = "VOLUPTUOUS"
    static CHUBBY = "CHUBBY"
    static FAT = "FAT"
    static ENORMOUS = "ENORMOUS"
    static VOLUPTUOUS_LEVEL = 0
    static CHUBBY_LEVEL = -1
    static FAT_LEVEL = -2
    static ENORMOUS_LEVEL = -3
}

class FitBodyLevels {
    static SHREDDED = "SHREDDED"
    static MUSCULAR = "MUSCULAR"
    static HYPERTROPHIED = "HYPERTROPHIED"
    static SHREDDED_LEVEL = 1
    static MUSCULAR_LEVEL = 2
    static HYPERTROPHIED_LEVEL = 3
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
        this.heightGroup = BodyPartSize.AVERAGE_LEVEL
        this.bodyFatTendency = BodyFatTendency.VOLUPTUOUS_TENDENCY
        this.bodyFatBalance = BodyFatBalanceLevels.VOLUPTUOUS_BODY
        this.bodyFatLevel = VoluptuousBodyLevels.CHUBBY_LEVEL
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
    static DEFAULT_FITNESS_VALUE = TraitIntensity.MODERATELY
    static DEFAULT_ETHNICITY = Ethnicity.LATINX
    static DEFAULT_SKIN_COLOR_GROUP = SkinColorGroup.CARAMEL
    isFit(){
        let fitnessScore = TraitIntensity.getTraitScoreFromTrait(this.fitness)
        if (fitnessScore >= TraitIntensity.NICELY_LEVEL){
            return true
        } else {
            return false
        }
    }
    isFaceTraditionallyAttractive(){
        let faceAttractiveness = this.bodyParts.FACE.value
        if (faceAttractiveness >= FaceProperties.CUTE_LEVEL){
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
