class PlannedActivity extends SugarcubeSerializableObject {
    constructor(startHour, durationInHours, planningTextPassage, linkText, retrospectivePassageName){
        super()
        this.startHour = startHour
        this.durationInHours = durationInHours
        this.planningTextPassage = planningTextPassage
        this.linkText = linkText
        this.retrospectivePassageName = retrospectivePassageName
    }
}

class DayPlan extends SugarcubeSerializableObject {
    constructor(){
        super()
        this.plannedActivitiesByStartHour = new Map()
    }
    addPlannedActivity(plannedActivity){
        this.plannedActivitiesByStartHour.set(plannedActivity.startHour,plannedActivity)
    }
    getNextActivity(currentHour){
        let nextActivity = this.plannedActivitiesByStartHour.get(currentHour)
        if (nextActivity === undefined){
            let sortedStartingHours = Array.from(this.plannedActivitiesByStartHour.keys()).sort((x, y) => parseInt(x, 10) < parseInt(y, 10))
            let candidateNextActivityStartingHour = 0
            if (currentHour > candidateNextActivityStartingHour[length-1]){
                return undefined
            }
            for(let startHour of sortedStartingHours){
                candidateNextActivityStartingHour = startHour
                if (startHour > currentHour){
                    break
                }
            }
            nextActivity = this.plannedActivitiesByStartHour.get(candidateNextActivityStartingHour)
            if (nextActivity === undefined){
                throw "ERROR: DayPlan.getNextActivity() can't find activity starting after '" + currentHour + "' among the '" + sortedStartingHours.length + "' registered activities."
            }
        }
        return nextActivity
    }
    getActivitiesStartHourInOrderFromStartHour(startHour){
        State.variables.DEBUG_ddd = startHour
        let sortedStartingHours = Array.from(this.plannedActivitiesByStartHour.keys()).sort((x, y) => parseInt(x, 10) < parseInt(y, 10))
        for(let startHourIndex = 0; startHourIndex < sortedStartingHours.length; startHourIndex++){
            if (sortedStartingHours[startHourIndex] >= startHour){
                return sortedStartingHours.slice(startHourIndex, sortedStartingHours.length)
            }
        }
        return undefined
    }
}
