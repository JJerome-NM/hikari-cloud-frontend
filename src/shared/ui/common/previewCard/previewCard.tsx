import {ComponentProps, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {PreviewCardContext} from "./previewCardContext.ts";
import {useOnHovered} from "../../../hooks/useOnHovered.tsx";
import {motion, MotionProps} from "framer-motion";
import {PreviewCardPreview} from "./previewCardPreview.tsx";
import {PreviewCardDetails} from "./previewCardDetails.tsx";
import {useHandleResize} from "../../../hooks/useHandleResize.tsx";

const StyledPlaceholder = styled.div`
    position: relative;

    min-width: 300px;
    flex-grow: 1;
`

const StyledCardWrapper = styled(motion.div)`
    box-sizing: border-box;
    position: absolute;

    border-radius: 10px;

    overflow: hidden;
		
    width: 100%;
`

const TARGET_HOVERED_SIZE = 1.5;

type CardPosition = "left" | "right" | "center";

export const PreviewCardComponent = ({aspectRatio, children, onHovered, ...props}: AnimeCardV3Props) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const {isHovered} = useOnHovered<HTMLDivElement>(wrapperRef)
	const [detailsHeight, setDetailsHeight] = useState(0)

	const {width} = useHandleResize<HTMLDivElement>(wrapperRef)

	const cardPosition = useMemo((): CardPosition => {
		const wrapper = wrapperRef.current;
		if (wrapper) {
			const rect = wrapper.getBoundingClientRect();

			const onHoveredWidth = rect.width * (TARGET_HOVERED_SIZE)
			const neededMargin = onHoveredWidth - rect.width
			const distanceToRightBound = window.innerWidth - rect.right
			const distanceToLeftBound = rect.left

			if (distanceToRightBound < neededMargin) {
				return "right"
			} else if (distanceToLeftBound < neededMargin) {
				return "left"
			} else {
				return "center"
			}
		}
		return "right";
	}, [width, wrapperRef.current]) // Dont change deps

	const hoveredMTPL: number = useMemo(() => {
		if (wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			const onHoveredWidth = rect.width * (TARGET_HOVERED_SIZE)
			const distanceToRightBound = window.innerWidth - rect.right
			const distanceToLeftBound = rect.left

			switch (cardPosition) {
				case "right":
					return Math.min(TARGET_HOVERED_SIZE, (distanceToLeftBound / onHoveredWidth) + 1)
				case "left":
					return Math.min(TARGET_HOVERED_SIZE, (distanceToRightBound / onHoveredWidth) + 1)
				default:
					return TARGET_HOVERED_SIZE
			}
		}
		return 1
	}, [width, cardPosition, wrapperRef.current]) // Dont change deps

	const cardHorizontalPosition = useMemo(() => {
		switch (cardPosition) {
			case "left":
				return {left: 0}
			case "center":
				return {right: "50%", transform: "translate(50%)"}
			case "right":
				return {right: 0}
		}
	}, [cardPosition])

	const wrapperTopPos: string | number | undefined = useMemo(() => {
		const wrapper = wrapperRef.current;
		if (wrapper) {
			if (!isHovered) {
				return
			}
			const rect = wrapper.getBoundingClientRect();

			const fullHeight = rect.height * hoveredMTPL + detailsHeight
			const bottomOffset = (rect.top + fullHeight) - window.innerHeight

			if (bottomOffset > 0) {
				return -(fullHeight - (window.innerHeight - rect.top))
			}
		}
		return 0
	}, [detailsHeight, hoveredMTPL, isHovered, wrapperRef])

	useEffect(() => {
		onHovered?.(isHovered)
	}, [isHovered, onHovered])

	return (
		<PreviewCardContext.Provider value={{isHovered, setDetailsHeight}}>
			<StyledPlaceholder style={{aspectRatio: aspectRatio || 16 / 9}} ref={wrapperRef}>
				<StyledCardWrapper {...props}
				                   animate={{
					                   width: isHovered ? `${100 * hoveredMTPL}%` : "100%",
					                   top: wrapperTopPos
				                   }}
				                   transition={{delay: 0.2}}
				                   style={{
					                   ...cardHorizontalPosition,
					                   zIndex: isHovered ? 11 : 10,
				                   }}
				>
					{children}
				</StyledCardWrapper>
			</StyledPlaceholder>
		</PreviewCardContext.Provider>
	)
}

type AnimeCardV3Props = {
	aspectRatio: string
	onHovered?: (state: boolean) => void
} & Omit<ComponentProps<"div">, "ref"> & MotionProps

export const PreviewCard = Object.assign(PreviewCardComponent, {
	Preview: PreviewCardPreview,
	Details: PreviewCardDetails
})