import {RefObject, useEffect, useState} from "react";

export const useCSSActiveTransition = (elementRef: RefObject<HTMLElement>) => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		const element = elementRef.current;

		if (!element) return

		const onTransitionStart = () => {
			setIsTransitioning(true)
		};

		const onTransitionEnd = () => {
			setIsTransitioning(false)
		};

		element.addEventListener("transitionstart", onTransitionStart);
		element.addEventListener("transitionend", onTransitionEnd);

		return () => {
			element.removeEventListener("transitionstart", onTransitionStart);
			element.removeEventListener("transitionend", onTransitionEnd);
		}
	}, [elementRef]);

	return {isTransitioning};
};