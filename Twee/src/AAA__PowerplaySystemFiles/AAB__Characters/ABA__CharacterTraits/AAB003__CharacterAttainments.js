class JobStatusLevels {
    static STUDENT = "STUDENT"
    static UNEMPLOYED = "UNEMPLOYED"
    static MENIAL_JOB = "MENIAL_JOB"
    static BLUE_COLLAR_JOB = "BLUE_COLLAR_JOB"
    static WHITE_COLLAR_JOB = "WHITE_COLLAR_JOB"
    static MANAGER_POSITION_JOB = "MANAGER_POSITION_JOB"
    static DIRECTOR_POSITION_JOB = "DIRECTOR_POSITION_JOB"
    static CEO_POSITION_JOB = "CEO_POSITION_JOB"
    static STUDENT_LEVEL = -1
    static UNEMPLOYED_LEVEL = 0
    static MENIAL_JOB_LEVEL = 1
    static BLUE_COLLAR_JOB_LEVEL = 2
    static WHITE_COLLAR_JOB_LEVEL = 3
    static MANAGER_POSITION_JOB_LEVEL = 4
    static DIRECTOR_POSITION_JOB_LEVEL = 5
    static CEO_POSITION_JOB_LEVEL = 6
    static getLevelFromName(name){
        switch(name){
            case JobStatusLevels.MENIAL_JOB:
                return JobStatusLevels.MENIAL_JOB_LEVEL
            case JobStatusLevels.BLUE_COLLAR_JOB:
                return JobStatusLevels.BLUE_COLLAR_JOB_LEVEL
            case JobStatusLevels.WHITE_COLLAR_JOB:
                return JobStatusLevels.WHITE_COLLAR_JOB_LEVEL
            case JobStatusLevels.MANAGER_POSITION_JOB:
                return JobStatusLevels.MANAGER_POSITION_JOB_LEVEL
            case JobStatusLevels.DIRECTOR_POSITION_JOB:
                return JobStatusLevels.DIRECTOR_POSITION_JOB_LEVEL
            case JobStatusLevels.CEO_POSITION_JOB:
                return JobStatusLevels.CEO_POSITION_JOB_LEVEL
            default:
                throw new Error("ERROR:JobStatusLevels.getNameFromLevel: Can't find '" + name + "'.")
        }
    }
}

class CharacterJob extends SugarcubeSerializableObject {
    constructor(jobLevel, jobTitle, wages){
        super()
        this.level = jobLevel
        this.title = jobTitle
        this.wages = wages
    }
}

class CharacterAttainments extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.charm = TraitIntensity.INSIGNIFICANTLY_LEVEL
        this.fitness = undefined
        this.knowledge = undefined
        this.grooming = undefined
        this.job = undefined
        this.wealth = undefined
        this.pocketMoney = undefined
    }
    getTrait(traitName){
        switch(traitName){
            case CharacterInvestmentAttainmentTraits.CHARM:
                return new TraitQualifierAndLevel(undefined, this.charm)
            default:
                throw Error("ERROR: CharacterAttainments.getTrait: Can't find trait '" + traitName + "'.")
        }
    }
}
