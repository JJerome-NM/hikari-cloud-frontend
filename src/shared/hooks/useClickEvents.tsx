import {RefObject, useCallback, useEffect, useState} from "react";

type Props = {
	onClick: () => void;
	onDoubleClick: () => void;
	delay?: number;
};

export function useClickEvents<T extends HTMLElement>(
	ref: RefObject<T>,
	{ onClick, onDoubleClick, delay = 250 }: Props
) {
	const [timeoutId, setTimeoutId] = useState<number>()

	const handleSingleClick = useCallback(() => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		const timeout = setTimeout(() => {
			onClick()
			setTimeoutId(undefined)
		}, delay)
		setTimeoutId(timeout)
	}, [timeoutId, delay, onClick])

	const handleDoubleClick = useCallback(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			setTimeoutId(undefined)
		}
		onDoubleClick()
	}, [onDoubleClick, timeoutId])


	useEffect(() => {
		if (ref && ref.current){
			const element = ref.current;

			element.addEventListener("click", handleSingleClick)
			element.addEventListener("dblclick", handleDoubleClick)

			element.addEventListener("touchstart", handleSingleClick)

			return () => {
				element.removeEventListener("click", handleSingleClick)
				element.removeEventListener("dblclick", handleDoubleClick)

				element.removeEventListener("touchstart", handleSingleClick)
			}
		}
	}, [handleDoubleClick, handleSingleClick, ref]);
}