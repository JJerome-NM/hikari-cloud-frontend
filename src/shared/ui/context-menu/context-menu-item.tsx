import {ComponentProps} from "react";
import styled from "styled-components";
import {useContextMenuContext} from "./context-menu-context.ts";

const StyledItem = styled.div`
    display: flex;

    flex-direction: row;

    align-items: center;
    justify-content: flex-end;
		
		gap: 10px;
		
		padding: 6px;
		
		border-radius: 10px;
		
		font-size: 1rem;
		font-weight: 400;
		
		&:hover {
				background-color: rgba(255, 255, 255, 0.1);
		}
`

export const ContextMenuItem = (
	{
		onClick,
		...props
	}: ContextMenuProps) => {
	const {close} = useContextMenuContext()

	return (
		<StyledItem {...props} onClick={(e) => {
			close()
			onClick?.(e)
		}}/>
	)
}

type ContextMenuProps = {} & ComponentProps<"div">