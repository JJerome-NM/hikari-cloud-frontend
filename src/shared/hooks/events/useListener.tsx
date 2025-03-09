import {useEffect} from "react";

export const useListener = <T, EventsType extends string = string>(
	eventName?: EventsType,
	onSignal?: (e: CustomEvent<T>) => void,
	element: HTMLElement | Window | Document = window,
	options: boolean | AddEventListenerOptions = {}
) => {
	useEffect(() => {
		if (eventName && onSignal && typeof onSignal === 'function') {
			const handleSignal = (e: Event) => {
				onSignal?.(e as CustomEvent)
			}

			element.addEventListener(eventName, handleSignal, options)

			return () =>
				element.removeEventListener(eventName, handleSignal, options)
		}
	}, [element, eventName, onSignal, options])
}