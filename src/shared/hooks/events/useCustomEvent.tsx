import {useListener} from "./useListener.tsx";
import {useEmitter} from "./useEmitter.tsx";
import {useMemo} from "react";

export const useCustomEvent = <T, EventsType extends string = string>(
	eventName: EventsType,
	onSignal: (e: CustomEvent<T>) => void,
	element: HTMLElement | Window | Document = window,
	options = {},
) => {
	const handleSignal = useMemo(() => {
		return onSignal || (() => null)
	}, [onSignal])

	useListener<T>(eventName, handleSignal, element, options)

	return useEmitter<T>(eventName, element)
}