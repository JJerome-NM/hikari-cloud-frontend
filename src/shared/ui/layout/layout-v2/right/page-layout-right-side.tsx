import {ComponentProps, ReactElement} from "react";
import styled from "styled-components";
import {PageLayoutRightSideBody} from "./page-layout-right-side-body.tsx";
import {PageLayoutRightSideTitle} from "./page-layout-right-side-title.tsx";
import {CompactMode, usePageLayoutContext} from "../page-layout-context.ts";


const StyledRightSidebar = styled.div`
    box-sizing: border-box;
    position: sticky;
    display: flex;

    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    // Todo Fix this in header (Add position sticky for header or mb no... idn think about this)
    top: 52px;
    height: calc(100vh - 52px);
    max-height: 100vh;
    width: max-content;

    padding: 0 0 10px 0;

    gap: 10px;

    overflow: hidden;
`

export const PageLayoutRightSideComponent = (
	{
		toggleButton,
		...props
	}: PageLayoutRightSideProps) => {
	const {compactMode} = usePageLayoutContext()

	return (
		<>
			{compactMode === CompactMode.OFF && (
				<StyledRightSidebar {...props}>
					{props.children}
				</StyledRightSidebar>
			)}
		</>
	)
}

export type PageLayoutRightSideProps = {
	toggleButton?: ReactElement;
} & ComponentProps<"div">

export const PageLayoutRightSide = Object.assign(PageLayoutRightSideComponent, {
	Title: PageLayoutRightSideTitle,
	Body: PageLayoutRightSideBody
})