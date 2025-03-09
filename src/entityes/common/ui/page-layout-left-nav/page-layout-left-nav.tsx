import styled from "styled-components";
import {PageLayout} from "../../../../shared/ui/layout";
import {PageLayoutLeftNavBody} from "./page-layout-left-nav-body.tsx";
import {PageLayoutLeftNavTitle} from "./page-layout-left-nav-title.tsx";
import {PageLayoutLeftSideProps} from "../../../../shared/ui/layout/layout-v2/left/page-layout-left-side.tsx";

const StyledWrapper = styled(PageLayout.LeftSide)`
		min-width: 20vw;
		width: max-content;
		max-width: 400px;
`

export const PageLayoutLeftNavComponent = ({...props}: PageLayoutLeftNavComponentProps) => {
	return (
		<StyledWrapper {...props}>
			{props.children}
		</StyledWrapper>
	)
}

type PageLayoutLeftNavComponentProps = {} & Omit<PageLayoutLeftSideProps, "ref">

export const PageLayoutLeftNav = Object.assign(PageLayoutLeftNavComponent, {
	Body: PageLayoutLeftNavBody,
	Title: PageLayoutLeftNavTitle
})