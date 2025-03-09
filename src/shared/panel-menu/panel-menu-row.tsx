import {ComponentProps} from "react";
import styled from "styled-components";
import {ChevronRightIcon} from "../ui/icons/mainIcons.tsx";
import {usePanelMenuContext} from "./panel-menu-context.ts";

const StyledRow = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 5px 10px;

    transition: ease-in-out .2s;

    font-size: 1rem;

    &:hover {
        background: #ffffff11;
    }
`

const StyledChevronWrapper = styled.div`
		display: flex;
		
		justify-content: center;
		align-items: center;
		
    height: 100%;
    padding: 0 0 0 10px;
`

export const PanelMenuRow = <T extends string,>(
	{
		targetVariant,
		children,
		...props
	}: PanelMenuRowProps<T>) => {
	const {gotoVariant} = usePanelMenuContext<T>()
	return (
		<StyledRow onClick={() => gotoVariant(targetVariant)} {...props}>
			{children}
			<StyledChevronWrapper>
				<ChevronRightIcon/>
			</StyledChevronWrapper>
		</StyledRow>
	)
}

export type PanelMenuRowProps<T extends string> = {
	targetVariant?: T;
} & ComponentProps<"div">