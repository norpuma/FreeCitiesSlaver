class ArousalLevel {
    static COOL = "COOL"
    static CONTENT = "CONTENT"
    static TINGLY = "TINGLY"
    static PRESSING = "PRESSING"
    static EXCITED = "EXCITED"
    static OVEREXCITED = "OVEREXCITED"
    static YEARNING = "YEARNING"
    static CRAVING = "CRAVING"
    static COOL_SCORE = 0
    static CONTENT_SCORE = 10
    static TINGLY_SCORE = 20
    static PRESSING_SCORE = 30
    static EXCITED_SCORE = 40
    static OVEREXCITED_SCORE = 50
    static YEARNING_SCORE = 60
    static CRAVING_SCORE = 70
    static arousalLevelFromScore(arousalLevelScore){
        let level = ArousalLevel.COOL
        if (arousalLevelScore < ArousalLevel.CONTENT_SCORE) {
            level = ArousalLevel.COOL
        } else if (arousalLevelScore < ArousalLevel.TINGLY_SCORE){
            level = ArousalLevel.CONTENT
        } else if (arousalLevelScore < ArousalLevel.PRESSING_SCORE){
            level = ArousalLevel.TINGLY
        } else if (arousalLevelScore < ArousalLevel.EXCITED_SCORE){
            level = ArousalLevel.PRESSING
        } else if (arousalLevelScore < ArousalLevel.OVEREXCITED_SCORE){
            level = ArousalLevel.EXCITED
        } else if (arousalLevelScore < ArousalLevel.YEARNING_SCORE){
            level = ArousalLevel.OVEREXCITED
        } else if (arousalLevelScore < ArousalLevel.CRAVING_SCORE){
            level = ArousalLevel.YEARNING
        } else {
            level = ArousalLevel.CRAVING
        }
        return level
    }
    static arousalLevelFromExactScore(arousalLevelScore){
        switch (arousalLevelScore){
            case ArousalLevel.COOL_SCORE:
                return ArousalLevel.COOL
            case ArousalLevel.CONTENT_SCORE:
                return ArousalLevel.CONTENT
            case ArousalLevel.TINGLY_SCORE:
                return ArousalLevel.TINGLY
            case ArousalLevel.PRESSING_SCORE:
                return ArousalLevel.PRESSING
            case ArousalLevel.EXCITED_SCORE:
                return ArousalLevel.EXCITED
            case ArousalLevel.OVEREXCITED_SCORE:
                return ArousalLevel.OVEREXCITED
            case ArousalLevel.YEARNING_SCORE:
                return ArousalLevel.YEARNING
            case ArousalLevel.CRAVING_SCORE:
                return ArousalLevel.CRAVING
            default:
                throw "ERROR: Cannot find a ArousalLevel corresponding to score '" + arousalLevelScore + "'."
        }
    }
    static arousalLevelToScore(arousalLevel) {
        switch (arousalLevel){
            case ArousalLevel.COOL:
                return ArousalLevel.COOL_SCORE
            case ArousalLevel.CONTENT:
                return ArousalLevel.CONTENT_SCORE
            case ArousalLevel.TINGLY:
                return ArousalLevel.TINGLY_SCORE
            case ArousalLevel.PRESSING:
                return ArousalLevel.PRESSING_SCORE
            case ArousalLevel.EXCITED:
                return ArousalLevel.EXCITED_SCORE
            case ArousalLevel.OVEREXCITED:
                return ArousalLevel.OVEREXCITED_SCORE
            case ArousalLevel.YEARNING:
                return ArousalLevel.YEARNING_SCORE
            case ArousalLevel.CRAVING:
                return ArousalLevel.CRAVING_SCORE
            default:
                throw "ERROR: Cannot convert '" + arousalLevel + "' to an ArousalLevel."
        }
    }
}

class CharacterSexualMood extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.aroused = ArousalLevel.COOL
        this.disgusted = undefined
        this.frustrated = undefined
        this.embarrassed = undefined
        this.hurt = undefined
    }
}

