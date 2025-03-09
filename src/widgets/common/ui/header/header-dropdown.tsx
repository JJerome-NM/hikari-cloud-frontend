import styled from "styled-components";
import {ComponentProps} from "react";
import {motion, MotionProps} from "framer-motion";

const StyledDropdownWrapper = styled(motion.div)`
    display: flex;

    min-width: 0;
    width: 0;
    height: 0;

    overflow: hidden;
`

const StyledDropdown = styled.div`
    margin: 10px 0 0 0;
    padding: 10px;

    width: 100%;
		min-width: 0;
`


export const HeaderDropdown = ({isOpen, children, ...props}: IDropdownProps) => {
	return (
		<StyledDropdownWrapper animate={{
			minWidth: isOpen ? "320px" : "0px",
			width: isOpen ? "100%" : 0,
			height: isOpen ? "max-content" : 0,
		}}
		                       {...props}>
			<StyledDropdown>
				{children}
			</StyledDropdown>
		</StyledDropdownWrapper>
	)
}

type IDropdownProps = {
	isOpen: boolean;
} & Omit<ComponentProps<"div">, "ref"> & MotionProps
