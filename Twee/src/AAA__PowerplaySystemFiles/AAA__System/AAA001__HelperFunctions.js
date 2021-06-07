class SugarcubeSerializableObject {
    constructor(){}
    static copy(src){
        let copy = new src.constructor()
        Object.keys(src).forEach(function (pn) {
            copy[pn] = clone(src[pn])
        }, copy)
        return copy
    }
    clone(){
        return this.constructor.copy(this)
    }
    toJSON(){
        var ownData = {}
        Object.keys(this).forEach(function (pn) {
            ownData[pn] = clone(this[pn]);
        }, this);
        State.variables.DEBUG_aab = JSON.reviveWrapper(this.name + '.copy($ReviveData$)', ownData);
        return JSON.reviveWrapper(this.name + '.copy($ReviveData$)', ownData);
    }
}

function calculateRandom(min, max){
    let result = (Math.random() * (max - min)) + min
    return result
}

function calculateRandomInt(min, max){
    let result = Math.floor(calculateRandom(min, max))
    return result
}

function adjustForLimit(oldValue, newValue, limit){
    if (oldValue == newValue){
        return newValue
    }
    let difference = newValue - oldValue
    if (difference > 0){
        if (newValue < limit){
            return limit
        } else {
            return newValue
        }
    } else {
        if (newValue > limit){
            return limit
        } else {
            return newValue
        }
    }
}
// TODO: Remove if no longer necessary.
// function adjustForLimit(oldValue, value, limit){
//     if (value == 0){
//         return oldValue
//     }
//     let upcomingValue = oldValue + value
//     if ((value >= 1) && (limit !== undefined)){
//         if (oldValue >= limit){
//             return oldValue
//         }
//         if (upcomingValue >= limit){
//             upcomingValue = limit
//         }
//     } else if ((value <= -1) && (limit !== undefined)){
//         if (oldValue <= limit){
//             return oldValue
//         }
//         if (upcomingValue <= limit){
//             upcomingValue = limit
//         }
//     }
//     return upcomingValue
// }

/// This represents a modifier to a StatisticAdjustment.
/// kind must be either ADDER or MULTIPLIER, which determines if the value must be added or must multiply the value.
/// value an adjustment to a StatisticAdjustment's final value. For MULTIPLIER this is expected to be a the final multiplier -1 (for instance 0.2 for a 20% increase, instead of 1.2). This is for ease of combining multipliers.
/// adjustmentFunction this is a function that will be called before making the adjustment. This may reduce the modifer to neutral (zero for ADDER or one for MULTIPLIER) if some requirement is not met.
class ActModifiers extends SugarcubeSerializableObject {
    constructor(kind, value, adjustmentFunction){
        super()
        this.kind = kind
        this.value = value
        this.adjustmentFunction = adjustmentFunction
    }
    static ADDER = 0
    static MULTIPLIER = 1
    apply(baseValue){
        let finalModifier = this.value
        if (this.adjustmentFunction !== undefined){
            finalModifier = this.adjustmentFunction(baseValue, value, actor, targets, circumstances)
        }
        return finalModifier
    }
    static calculateFinalModifier(modifiers, baseValue, actor, targets, circumstances){
        // Modifiers are calculated in parallel. If the modifier is less than -100% or less, the impact is 0.
        // e.g.: a 60 point impact with a +50% bonus, a +30% and a 10% bonus is 60 * (1 + (0.5+0.3+0.1)) = 60 * (1 + 0.9) = 60 * (1.9) = 114
        // e.g.: a 60 point impact with a -30% penalty and a -20% penalty is 60 * (1 + (-0.3 + -0.2)) = 60 * 0.5 = 30
        // e.g.: a 60 point impact with a -80% penalty, a -70% penalty and a -50% penalty is 60 * (1 + (-0.8 + -0.7 + -0.5)) = 60 * (1-2) = 60 * -1 -> 60 * 0 = 0
        // e.g.: a 60 point impact with a +50% bonus and a -30% penalty is 60 * (1 + (0.5)-(0.3)) = 60 * 1.2
        // e.g.: a 60 point impact with a +60% bonus, a +20% bonus, a -10% penalty and a -30% penalty is 60 * ((1 + 0.6 + 0.2) - (0.1 + 0.3)) = 60 * (1.8 - 0.4) = 60 * 1.4 = 84
        // e.g.: a 60 point impact with a +10% bonus, a +30% bonus, a -60% penalty and a -20% penalty is 60 * ((1 + 0.1 + 0.3) - (0.6 + 0.2)) = 60 * (1.4 - 0.8) = 60 * 0.6 = 36
        let totalMultiplier = 1
        let totalAdder = 0
        if (modifiers !== undefined){
            for(modifier of modifiers){
                if (modifier.kind == ActModifiers.ADDER){
                    totalAdder += modifier.apply(baseValue, actor, targets, circumstances)
                } else {
                    totalMultiplier += modifier.apply(baseValue, actor, targets, circumstances)
                }
            }
        }
        return (baseValue * totalMultiplier) + totalAdder
    }
}

class ActModifiersCollection extends SugarcubeSerializableObject {
    constructor(classMemberName, isActor, modifiers){
        super()
        this.classMemberName = classMemberName
        this.isActor = isActor
        if (modifiers === undefined){
            this.actorActModifiers = new Map()
        } else {
            this.actorActModifiers = modifiers
        }
    }
}

/// This represents a potential statistic adjustment.
/// classMemberName is the name of an object's member identifying the statistic to adjust. The type of the member should be Number.
/// min is the minimum value by which the statistic may be modified. If the adjustment is a flat value (i.e. not an interval to be selected randomly), the value is stored in Min.
/// max is the maximum value by which the statistic may be modified. If the adjustment is not an interval (with a minimum and a maximum), max should be left <c>undefined</c>.
/// limit is a value which the statistic AFTER the adjustment may not exceed. If the adjustment is positive, this is an upper limit, if the adjustment is negative, this is a lower limit.
/// modifiers is a list of ActModifiers objects to be added to 1 before multiplying the value (After being randomly determined). If the final modifier is less than zero, it is limited to zero.
/*
    E.g. 1: classMemberName: "health", min: -15, max: -5, limit: -30, modifiers: [0.4, -0.2, -0.3]
    An object's "health" member will be adjusted by a value between -15 to -5 to which a +10% (0.4 + -0.2 + -0.3 = 0.1). After the adjustment, it may not exceed -30.
    If player.health is -20, on resolution, a random number between -15 and -5 is generated (e.g. -12) and it receives a 10% modifier (e.g. -12 * 1.1 = -13.2). Since player.health -20 modified by -13.2 would be less than -30, player.health is set to -30.
*/
class StatisticAdjustment extends SugarcubeSerializableObject {
    constructor(classMemberName, min, max, limit){
        super()
        if ((classMemberName === undefined) || (classMemberName == "")){
            throw "ERROR: Can't build StatisticAdjustment with classMemberName empty or undefined."
        }
        this.classMemberName = classMemberName
        this.min = min
        this.max = max
        this.limit = limit
    }
    apply(object, modifiers){
        if ((object === undefined) || (object[this.classMemberName] === undefined)){
            throw "ERROR: Can't apply statistic adjustment for '" + this.classMemberName + "' if object is undefined or does not have a member with that name."
        }
        let oldValue = object[this.classMemberName]
        let adjustment = this.min
        if ((this.max !== undefined) && (this.min != this.max)) {
            adjustment = calculateRandomInt(this.min, this.max)
        }
        adjustment = adjustment * ActModifiers.calculateFinalModifier(modifiers, adjustment, actor, targets, circumstances)
        object[this.classMemberName] = adjustForLimit(oldValue, adjustment, this.limit)
    }
}

// This allows for the evaluation of thresholds with a modifier attributed to it. This is often used to give a grade to a score or to offer a bonus or penalty depending on a Trait.
// To check to give a 10 bonus for a trait that is above 25 use: new ThresholdEvaluation(25, 25, true, 10, 1)
// To check to give a -20 penalty for a trait that is below 10 use: new ThresholdEvaluation(10, 10, false, -20, 1)
// To give a bonus of 5 for every 10 points a trait exceeds 32 with an upper limit of 80 use: new ThresholdEvaluation(32, 80, true, 5, 10)
class ThresholdEvaluation extends SugarcubeSerializableObject {
    constructor(minimum, maximum, isMeasureUpwards, modifierPerStep, step, evaluationFunction){
        super()
        this.minimum = minimum
        this.maximum = maximum
        this.isMeasureUpwards = isMeasureUpwards
        this.modifierPerStep = modifierPerStep
        this.step = step
        this.evaluationFunction = evaluationFunction // evaluation function must have a signagure function(perspectiveOwner, perspectiveTarget)
    }
    getModifier(value, perspectiveOwner, perspectiveTarget){
        if (this.evaluationFunction != undefined){
            return evaluationFunction(perspectiveOwner, perspectiveTarget)
        }
        let difference = 0
        if (isMeasureUpwards){
            if (value < this.minimum){
                return 0
            }
            if (value > this.maximum){
                value = this.maximum
            }
            difference = value - this.minimum
        } else {
            if (value > this.maximum){
                return 0
            }
            if (value < this.minximum){
                value = this.minimum
            }
            difference = this.maximum - value
        }
        if (this.maximum == this.minimum){
            return this.modifierPerStep
        }
        let steps = Math.floor(difference / this.step)
        return steps * this.modifierPerStep
    }
}
