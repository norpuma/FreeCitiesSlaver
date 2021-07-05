import renpy.exports as renpy

class Scheduled_Activity():
    def __init__(self):
        self._reset()
    
    def _reset(self):
        self.starts_at_timestamp = None
        self.ends_before_timestamp = None
        self.location = None
        self.activity = None
        self.callable = None
    
    @classmethod
    def build(cls, starts_at_timestamp, ends_before_timestamp, location, activity, callable):
        result = cls()
        result.starts_at_timestamp = starts_at_timestamp
        result.ends_before_timestamp = ends_before_timestamp
        result.location = location
        result.activity = activity
        result.callable = callable
        return result
    
    @classmethod
    def build_from_json(cls, json):
        pass
    
    def get_compare_key(self) :
        return self.starts_at_timestamp

class Event(object) :
    def __init__(self, interrupts, starts_at_timestamp, ends_before_timestamp, conditional_function, interrupting_label, non_interrupting_function, recurring_count):
        self.interrupts = interrupts
        self.starts_at_timestamp = starts_at_timestamp
        self.ends_before_timestamp = ends_before_timestamp
        self.conditional_function = conditional_function
        self.interrupting_label = interrupting_label
        self.non_interrupting_function = non_interrupting_function
        self.recurring_count = recurring_count
    
    def get_compare_key(self):
        # Orders events so that first come all interrupting events and, then, all non-interrupting, sorted by starts_at_timestamp (that is, when they should first occur).
        if self.interrupts:
            interrupt_key = 0
        else:
            interrupt_key = 1
        compare_key = (interrupt_key, self.starts_at_timestamp)
        return compare_key

# ATTENTION: Interrupting events are responsible for setting the new time, since the previous progress was interrupted. Interruptible events are checked first, so, when an interrupt occurs, a second check should be called for the time of the interruption with a check_can_be_interrupted flag set to FALSE.
def check_scheduled_events( events_to_check , previous_timestamp , target_timestamp , check_can_be_interrupted , interrupt_message , failed_events , completed_events ) :
    calendar.last_scheduled_event_previous_time = previous_timestamp
    calendar.last_scheduled_event_target_time = target_timestamp
    # Sorting events in ascending order of when they may first occur.
    events_to_check.sort( key = lambda checking_event : checking_event.get_compare_key() )
    for checking_event in events_to_check :
        if calendar.compare_times( previous_timestamp , checking_event.ends_before_timestamp ) > 0 :
            # Event should already have happened. It didn't. So, let's eliminate it.
            failed_events.append(checking_event)
            events_to_check.remove(checking_event)
        if ( calendar.compare_times( previous_timestamp , checking_event.starts_at_timestamp ) >= 0 ) and ( calendar.compare_times( target_timestamp , checking_event.ends_before_timestamp ) < 0 ) :
            if checking_event.interrupts and check_can_be_interrupted :
                if checking_event.conditional_function is not None :
                    if checking_event.conditional_function( previous_timestamp , target_timestamp ) :
                        call_interrupting_scheduled_event_label( checking_event , previous_timestamp , target_timestamp , events_to_check, completed_events , interrupt_message )
                else : # checking_event.conditional_function is None
                    call_interrupting_scheduled_event_label( checking_event , previous_timestamp , target_timestamp , events_to_check, completed_events , interrupt_message )
            elif not checking_event.interrupts :
                if checking_event.conditional_function is not None :
                    if checking_event.conditional_function( previous_timestamp , target_timestamp ) :
                        execute_non_interrupting_scheduled_event_function( checking_event , previous_timestamp , target_timestamp , events_to_check, completed_events , interrupt_message )
                else : # checking_event.conditional_function is None
                    execute_non_interrupting_scheduled_event_function( checking_event , previous_timestamp , target_timestamp , events_to_check, completed_events , interrupt_message )
    return

def call_interrupting_scheduled_event_label( checking_event , previous_timestamp , target_timestamp , events_to_check, completed_events , interrupt_message ) :
    # Before calling the interrupting event, define when it occurs and call all non-interrupting events that should happen before that.
    if calendar.compare_times( checking_event.starts_at_timestamp , previous_timestamp ) <= 0 :
        target_timestamp = previous_timestamp
    else :
        target_timestamp = checking_event.starts_at_timestamp
    for index in range( len( events_to_check ) -1 , 0 , -1 ) :
        # Events are ordered with all non-interrupting events at the end. If an interrupting event is found, the search through the list can be stopped.
        if not events_to_check[ index ].interrupts :
            execute_non_interrupting_scheduled_event_function( checking_event , previous_timestamp , target_timestamp , events_to_check, completed_events )
        else :
            break

    # Once all non-interrupting functions have beel called, time should be advanced to the interrupting event's starts_at_timestamp time.
    calendar.progress_calendar_to_timestamp( new_timestamp = target_timestamp , progress_can_be_interrupted = False , interrupted_message = "" )
    if checking_event.recurring_count < INFINITE :
        checking_event.recurring_count -= 1
        if checking_event.recurring_count < 1 :
            completed_events.append( checking_event )
            events_to_check.remove( checking_event )
    renpy.call( checking_event.interrupting_label , previous_timestamp , target_timestamp , interrupt_message )
    return

def execute_non_interrupting_scheduled_event_function( checking_event , previous_timestamp , target_timestamp , events_to_check, completed_events , interrupt_message ) :
    if checking_event.recurring_count < INFINITE :
        checking_event.recurring_count -= 1
        if checking_event.recurring_count < 1 :
            completed_events.append( checking_event )
            events_to_check.remove( checking_event )
    checking_event.non_interrupting_function( previous_timestamp , target_timestamp , interrupt_message )
    return

def check_traveling_events( leaving_events , arrival_events , previous_location , target_location , check_can_be_interrupted , interrupt_message , completed_events ) :
    if previous_location is not None :
        events_to_check = leaving_events[ previous_location ]
        for checking_event in  events_to_check :
            if checking_event.interrupts and check_can_be_interrupted :
                if checking_event.conditional_function is not None :
                    if checking_event.conditional_function( previous_location , target_location ) :
                        call_interrupting_traveling_event_label( checking_event , previous_location , target_location , events_to_check, completed_events[ previous_location ] , interrupt_message )
                else : # checking_event.conditional_function is None
                    call_interrupting_traveling_event_label( checking_event , previous_location , target_location , events_to_check, completed_events[ previous_location ] , interrupt_message )
            elif not checking_event.interrupts :
                if checking_event.conditional_function is not None :
                    if checking_event.conditional_function( previous_timestamp , target_timestamp ) :
                        execute_non_interrupting_traveling_event_function( checking_event , previous_location , target_location , events_to_check, completed_events[ previous_location ] , interrupt_message )
                else : # checking_event.conditional_function is None
                    execute_non_interrupting_traveling_event_function( checking_event , previous_location , target_location , events_to_check, completed_events[ previous_location ] , interrupt_message )
    if target_location is not None :
        events_to_check = arrival_events[ target_location ]
        for checking_event in  events_to_check :
            if checking_event.interrupts and check_can_be_interrupted :
                if checking_event.conditional_function is not None :
                    if checking_event.conditional_function( previous_location , target_location ) :
                        call_interrupting_traveling_event_label( checking_event , previous_location , target_location , events_to_check, completed_events[ target_location ] , interrupt_message )
                else : # checking_event.conditional_function is None
                    call_interrupting_traveling_event_label( checking_event , previous_location , target_location , events_to_check, completed_events[ target_location ] , interrupt_message )
            elif not checking_event.interrupts :
                if checking_event.conditional_function is not None :
                    if checking_event.conditional_function( previous_timestamp , target_timestamp ) :
                        execute_non_interrupting_traveling_event_function( checking_event , previous_location , target_location , events_to_check, completed_events[ target_location ] , interrupt_message )
                else : # checking_event.conditional_function is None
                    execute_non_interrupting_traveling_event_function( checking_event , previous_location , target_location , events_to_check, completed_events[ target_location ] , interrupt_message )
    return

def call_interrupting_traveling_event_label( checking_event , previous_location , target_location , events_to_check, completed_events , interrupt_message ) :
    if checking_event.recurring_count < INFINITE :
        checking_event.recurring_count -= 1
        if checking_event.recurring_count < 1 :
            completed_events.append( checking_event )
            events_to_check.remove( checking_event )
    renpy.call( checking_event.interrupting_label , previous_location , target_location , interrupt_message )
    return

def execute_non_interrupting_traveling_event_function( checking_event , previous_location , target_location , events_to_check, completed_events , interrupt_message ) :
    if checking_event.recurring_count < INFINITE :
        checking_event.recurring_count -= 1
        if checking_event.recurring_count < 1 :
            completed_events.append( checking_event )
            events_to_check.remove( checking_event )
    checking_event.non_interrupting_function( previous_location , target_location , interrupt_message )
    return

INFINITE = 999999
