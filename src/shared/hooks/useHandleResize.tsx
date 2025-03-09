import {RefObject, useEffect, useState} from "react";


export const useHandleResize = <T extends HTMLElement,>(
	ref?: RefObject<T | null> | null,
	initialValues?: {
		width?: number;
		height?: number;
	},
) => {
	const [width, setWidth] = useState(initialValues?.width || 0);
	const [height, setHeight] = useState(initialValues?.height || 0);

	useEffect(() => {
		const currentElement = ref?.current;

		if (currentElement != null) {
			setWidth(currentElement.offsetWidth);
			setHeight(currentElement.offsetHeight);

			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					setWidth(entry.contentRect.width);
					setHeight(entry.contentRect.height);
				}
			})

			resizeObserver.observe(currentElement);

			return () => {
				resizeObserver.unobserve(currentElement);
			}
		}
	}, [ref]);

	return {width, height}
}
