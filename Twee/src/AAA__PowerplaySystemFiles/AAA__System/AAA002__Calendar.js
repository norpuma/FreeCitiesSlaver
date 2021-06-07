const START_DATE = new Date(Date.UTC(2030, 1, 6, 7, 0)) // Start on January 6 to start on a Sunday.
var gameTime = new Date(START_DATE.getTime())

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = 60 * 60 * 1000
const ONE_DAY = 24 * 60 * 60 * 1000
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000

class TimeController extends SugarcubeSerializableObject {
    constructor(){
        super()
        State.variables.DEBUG_aaa = gameTime
        this.date = gameTime
    }
    getGameDay(isForDisplay = false){
        const OFFSET = 1 // This is used to ensure that the game days start counting at 1 to make more user friendly to humans.
        let gameDay = Math.floor((this.date.getTime() - START_DATE.getTime()) / ONE_DAY)
        if (isForDisplay == true){
            gameDay += OFFSET
        }
        return gameDay
    }
    isWeekday(){
        this.date = new Date(gameTime.getTime())
        let weekdayIndex = this.date.getUTCDay()
        if ((weekdayIndex == 0) || (weekdayIndex == 6)){
            return false
        }
        return true
    }
    getCurrentHour(){
        this.date = new Date(gameTime.getTime())
        return this.date.getUTCHours()
    }
    progressTime(days, hours){
        this.date = new Date(gameTime.getTime())
        let daysInMilliseconds = days * ONE_DAY
        let hoursInMilliseconds = hours * ONE_HOUR
        this.date.setDate(this.date.getTime() + daysInMilliseconds + hoursInMilliseconds)
    }
}

var timeController = new TimeController()
State.variables.timeController = timeController