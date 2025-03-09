import {useCallback, useState} from "react";

type EventCallback = () => void;

// TODO Need a better solution
// Check this https://github.com/cool-hooks/react-custom-events-hooks/blob/main/src/hooks
export const useEventListener = <EventsType extends string = string, >(): EventListenerReturnType<EventsType> => {
/*	const eventsMap = useRef<Map<EventsType, EventCallback>>(new Map());

	const addEventListener = useCallback((event: EventsType, callback: EventCallback) => {
		eventsMap.current.set(event, callback);
	}, [])

	const removeEventListener = useCallback((event: EventsType, callback?: EventCallback) => {
		const events = eventsMap.current;
		if (events.has(event) && events.get(event) !== undefined) {
			eventsMap.current.delete(event);
		}
	}, [])*/

	const [events, setEvents] = useState<Record<string, EventCallback>>({})

	const addEventListener = useCallback((event: EventsType, callback: EventCallback) => {
		setEvents(prev => ({...prev, [event]: callback}));
	}, [])

	const removeEventListener = useCallback((event: EventsType, callback?: EventCallback) => {
		setEvents(prev => {
			const newEvents = {...prev};
			if (callback) {
				if (newEvents[event] === callback) {
					delete newEvents[event];
				}
			} else {
				delete newEvents[event];
			}
			return newEvents;
		});
	}, [])

	return {
		events: events,
		addEventListener,
		removeEventListener
	}
}

type EventListenerReturnType<EventsType extends string> = {
	events: Record<EventsType, EventCallback>;
	addEventListener: (event: EventsType, callback: EventCallback) => void
	removeEventListener: (event: EventsType, callback?: EventCallback) => void
}
