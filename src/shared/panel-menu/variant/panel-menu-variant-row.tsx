import styled from "styled-components";
import {PanelMenuRow, PanelMenuRowProps} from "../panel-menu-row.tsx";

const StyledRow = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

		text-wrap: nowrap;
		min-width: 0;
		
    width: 100%;
`

const StyledName = styled.span`
    font-size: 1rem;
`

const StyledValue = styled.span`
    font-size: 1rem;
`

export const PanelMenuVariantRow = <T extends string, >(
	{
		name,
		value,
		...props
	}: PanelMenuVariantRowProps<T>) => {
	return (
		<PanelMenuRow {...props}>
			<StyledRow>
				<StyledName>
					{name}
				</StyledName>
				<StyledValue>
					{value}
				</StyledValue>
			</StyledRow>
		</PanelMenuRow>
	)
}

type PanelMenuVariantRowProps<T extends string> = {
	name?: string
	value?: string
} & PanelMenuRowProps<T>