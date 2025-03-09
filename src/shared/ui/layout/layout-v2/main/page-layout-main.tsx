import {ComponentProps} from "react";
import styled from "styled-components";

const StyledMain = styled.div`
    display: flex;

    flex-direction: column;

    width: 100%;
    height: 100%;
		
    min-width: 0;
`

export const PageLayoutMain = ({...props}: PageLayoutMainProps) => {
	return (
		<StyledMain {...props}>
			{props.children}
		</StyledMain>
	)
}

type PageLayoutMainProps = {} & ComponentProps<"div">