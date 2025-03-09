import {ComponentProps, useEffect, useRef} from "react";
import {usePreviewCardContext} from "./previewCardContext.ts";
import styled from "styled-components";
import {motion, MotionProps} from "framer-motion";


const StyledDetails = styled(motion.div)`
    height: 0;

    width: 100%;
    overflow: hidden;
`

export const PreviewCardDetails = ({children, ...props}: AnimeCardV3PreviewProps) => {
	const {isHovered, setDetailsHeight} = usePreviewCardContext()

	const detailsRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setDetailsHeight(detailsRef.current?.offsetHeight || 0)
	}, [isHovered, setDetailsHeight])

	return (
		<StyledDetails {...props}
		               animate={{
			               height: isHovered ? "max-content" : 0,
			               opacity: isHovered ? 1 : 0,
		               }}
		               transition={{delay: 0.2}}
		>
			<div ref={detailsRef}>
				{children}
			</div>
		</StyledDetails>
	)
}

type AnimeCardV3PreviewProps = {} & Omit<ComponentProps<"div">, "ref"> & MotionProps