import {RefObject, useEffect, useState} from "react";

export const useOnHovered = <T extends HTMLElement>(
	ref?: RefObject<T | null> | null,
	startValue?: boolean
) => {
	const [isHovered, setIsHovered] = useState(!!startValue)

	useEffect(() => {
		const handleMouseEnter = () => {
			setIsHovered(true)
		}
		const handleMouseLeave = () => {
			setIsHovered(false)
		}

		const node = ref?.current;
		if (node) {
			node.addEventListener('mouseenter', handleMouseEnter)
			node.addEventListener('mouseleave', handleMouseLeave)
		}

		return () => {
			if (node) {
				node.removeEventListener('mouseenter', handleMouseEnter)
				node.removeEventListener('mouseleave', handleMouseLeave)
			}
		}
	}, [ref])

	return {isHovered, ref};
}
