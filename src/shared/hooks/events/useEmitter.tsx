import {useCallback} from "react";

export const useEmitter = <T, EventsType extends string = string>(
	eventName: EventsType,
	element: HTMLElement | Window | Document = window
) => {
	return useCallback((data?: T) => {
		element.dispatchEvent(new CustomEvent(eventName, {detail: data}))
	}, [element, eventName])
}