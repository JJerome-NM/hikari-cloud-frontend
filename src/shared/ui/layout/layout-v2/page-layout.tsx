import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {PageLayoutContext} from "./page-layout-context.ts";
import {PageLayoutLeftSide} from "./left/page-layout-left-side.tsx";
import {PageLayoutRightSide} from "./right/page-layout-right-side.tsx";
import styled from "styled-components";
import {PageLayoutMain} from "./main/page-layout-main.tsx";

const StyledLayout = styled.main`
    position: relative;
    box-sizing: border-box;
    display: flex;

    flex-direction: row;
    align-items: flex-start;

    padding: 0 10px;
    gap: 10px;
    width: 100%;

    max-width: 100vw;
`

enum CompactMode {
	FULL = "FULL",
	SEMI = "SEMI",
	OFF = "OFF",
}

export const PageLayoutComponent = (
	{
		responsiveConfig = {minFullSize: 840, minSemiSize: 1124},
		...props
	}: PageLayoutProps) => {
	const [compactMode, setCompactMode] = useState<CompactMode>(CompactMode.OFF);

	const handleResize = useCallback(() => {
		if (window.innerWidth < responsiveConfig.minFullSize) {
			setCompactMode(CompactMode.FULL)
		} else if (window.innerWidth < responsiveConfig.minSemiSize) {
			setCompactMode(CompactMode.SEMI)
		} else {
			setCompactMode(CompactMode.OFF);
		}
	}, [responsiveConfig.minFullSize, responsiveConfig.minSemiSize])

	useEffect(() => {
		window.addEventListener("resize", handleResize)

		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [handleResize]);

	return (
		<PageLayoutContext.Provider value={{
			compactMode,
			other: {}
		}}>
			<StyledLayout>
				{props.children}
			</StyledLayout>
		</PageLayoutContext.Provider>
	)
}

export type PageLayoutProps = {
	responsiveConfig?: {
		minFullSize: number;
		minSemiSize: number;
	}
} & PropsWithChildren

export const PageLayout = Object.assign(PageLayoutComponent, {
	LeftSide: PageLayoutLeftSide,
	RightSide: PageLayoutRightSide,
	Main: PageLayoutMain
});