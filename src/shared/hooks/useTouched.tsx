import {RefObject, useCallback, useEffect, useState} from "react";
import {useClickOutside} from "./useClickOutside.tsx";

export const useTouched = <T extends HTMLElement>(ref: RefObject<T>) => {
	const [isTouched, setIsTouched] = useState(false)

	useClickOutside(ref, {ignoreEvents: !isTouched}, () => setIsTouched(false))

	const handleTouch = useCallback(() => setIsTouched(true), [])

	useEffect(() => {
		const element = ref.current

		if (element){
			element.addEventListener("click", handleTouch)

			return () => {
				element.removeEventListener("click", handleTouch)
			}
		}
	}, [handleTouch, ref])

	return isTouched
}