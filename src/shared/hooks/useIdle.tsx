import {RefObject, useCallback, useEffect, useRef, useState} from "react";

const activityEvents = [
	"mousedown",
	"mousemove",
	"keydown",
	"scroll",
	"touchstart",
];

export const useIdle = <T extends HTMLElement, >(
	ms: number,
	ref?: RefObject<T>,
	{inverted} = {inverted: false}
) => {
	const [isIdle, setIsIdle] = useState(false)
	const lastActivityTime = useRef(Date.now())

	const resetActivity = useCallback(() => {
		lastActivityTime.current = Date.now()
		setIsIdle(inverted)
	}, [inverted])

	useEffect(() => {
		const checkIdle = () => {
			if (Date.now() - lastActivityTime.current >= ms) {
				setIsIdle(!inverted)
			}
		}

		const intervalId = setInterval(checkIdle, 250)

		const element = ref && ref.current ? ref.current : document.body
		if (element) {
			activityEvents.forEach(event => {
				element.addEventListener(event, resetActivity)
			})

			return () => {
				clearInterval(intervalId)
				activityEvents.forEach(event => {
					element.removeEventListener(event, resetActivity)
				})
			}
		}
	}, [ms, inverted, resetActivity, ref])

	return isIdle
}
