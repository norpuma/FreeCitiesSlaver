label Scheduled_Events__Initialization:
    $ calendar.last_scheduled_event_previous_time = ( 0, 0, 0)
    $ calendar.last_scheduled_event_target_time = ( 0, 0, 0)
    $ scheduled_events = []
    $ failed_scheduled_events = []
    $ completed_scheduled_events = []
    return

label Traveling_Events__Initialization:
    $ traveling_leaving_events = {}
    $ traveling_arrival_events = {}
    $ completed_traveling_events = {}
    return
