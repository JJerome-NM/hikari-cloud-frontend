import {ComponentProps} from "react";
import styled from "styled-components";
import {PageLayout} from "../../../../shared/ui/layout";

const StyledWrapper = styled(PageLayout.LeftSide.Title)`
    width: 100%;
`

export const PageLayoutLeftNavTitle = ({...props}: PageLayoutLeftNavTitleProps) => {
	return (
		<StyledWrapper {...props}>
			{props.children}
		</StyledWrapper>
	)
}

type PageLayoutLeftNavTitleProps = {} & Omit<ComponentProps<"div">, "ref">