import {ComponentProps} from "react";
import styled from "styled-components";

const StyledBody = styled.div`
    box-sizing: border-box;
    display: flex;

    flex-direction: column;

    width: 100%;
    min-width: 0;

        //background: ${({theme}) => theme.colors.main};

    overflow: auto;
`

export const PageLayoutLeftSideBody = ({...props}: PageLayoutLeftSideBodyProps) => {
	return (
		<StyledBody {...props}>
			{props.children}
		</StyledBody>
	)
}

type PageLayoutLeftSideBodyProps = {} & ComponentProps<"div">