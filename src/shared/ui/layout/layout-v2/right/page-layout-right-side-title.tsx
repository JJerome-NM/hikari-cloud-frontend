import {ComponentProps} from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    width: 100%;
`


export const PageLayoutRightSideTitle = ({...props}: PageLayoutLeftSideTitleProps) => {
	return (
		<StyledWrapper {...props}>
			{props.children}
		</StyledWrapper>
	)
}

type PageLayoutLeftSideTitleProps = {} & ComponentProps<"div">