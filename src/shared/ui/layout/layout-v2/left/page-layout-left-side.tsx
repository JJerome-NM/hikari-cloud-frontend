import {ComponentProps, ReactElement} from "react";
import {PageLayoutLeftSideBody} from "./page-layout-left-side-body.tsx";
import {PageLayoutLeftSideTitle} from "./page-layout-left-side-title.tsx";
import styled from "styled-components";
import {CompactMode, usePageLayoutContext} from "../page-layout-context.ts";

const StyledLeftSidebar = styled.div`
    box-sizing: border-box;
    position: sticky;
    display: flex;

    top: 52px; // Todo Try to fix this with position sticky in HEADER

    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    height: calc(100vh - 52px);
    max-height: 100vh;
    width: max-content;

    padding: 0 0 10px 0;
		
		gap: 10px;

    overflow: hidden;
`

export const pageLayoutLeftSideToggleButtonName = "pageLayoutLeftSideToggleButton"

export const PageLayoutLeftSideComponent = (
	{
		toggleButton,
		...props
	}: PageLayoutLeftSideProps) => {
	const {compactMode} = usePageLayoutContext()


	return (
		<>
			{compactMode !== CompactMode.FULL && (
				<StyledLeftSidebar {...props}>
					{props.children}
				</StyledLeftSidebar>
			)}
		</>
	)
}

export type PageLayoutLeftSideProps = {
	toggleButton?: ReactElement;
} & ComponentProps<"div">

export const PageLayoutLeftSide = Object.assign(PageLayoutLeftSideComponent, {
	Body: PageLayoutLeftSideBody,
	Title: PageLayoutLeftSideTitle,
})