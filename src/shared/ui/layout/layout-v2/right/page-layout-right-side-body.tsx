import {ComponentProps} from "react";
import styled from "styled-components";

const StyledBody = styled.div`
    box-sizing: border-box;
    display: flex;

    flex-direction: column;

    width: 100%;
		max-height: 100vh;

    overflow: auto;
`

export const PageLayoutRightSideBody = ({...props}: PageLayoutLeftSideBodyProps) => {
	return (
		<StyledBody {...props}>
			{props.children}
		</StyledBody>
	)
}

type PageLayoutLeftSideBodyProps = {} & ComponentProps<"div">