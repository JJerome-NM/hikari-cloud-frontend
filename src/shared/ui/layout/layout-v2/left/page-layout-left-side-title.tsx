import {ComponentProps} from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    width: 100%;
`

export const PageLayoutLeftSideTitle = ({...props}: PageLayoutLeftSideTitleProps) => {
	return (
		<StyledWrapper>
			{props.children}
		</StyledWrapper>
	)
}

type PageLayoutLeftSideTitleProps = {} & ComponentProps<"div">