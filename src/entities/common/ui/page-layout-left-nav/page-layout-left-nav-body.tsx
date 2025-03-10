import {ComponentProps} from "react";
import styled from "styled-components";
import {PageLayout} from "../../../../shared/ui/layout";

const StyledWrapper = styled(PageLayout.LeftSide.Body)`
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

		min-width: 0;
    width: 100%;

    padding: 10px;

    border-radius: 10px;

    gap: 5px;

    background: ${({theme}) => theme.colors.main};
`

export const PageLayoutLeftNavBody = ({...props}: PageLayoutLeftNavBodyProps) => {
	return (
		<StyledWrapper {...props}>
			{props.children}
		</StyledWrapper>
	)
}

type PageLayoutLeftNavBodyProps = {} & Omit<ComponentProps<"div">, "ref">