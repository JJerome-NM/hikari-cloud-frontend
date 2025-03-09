import {ComponentProps} from "react";
import styled from "styled-components";

const StyledParent = styled.div`
    position: absolute;

    z-index: 300;

    height: 0;
    width: 0;

    top: 0;
    left: 0;
`

export const contextMenuParentId = "context-menu-parent"

export const ContextMenuParent = ({...props}: ContextMenuParentProps) => {
	return (
		<StyledParent {...props} id={contextMenuParentId}/>
	)
}

type ContextMenuParentProps = {} & ComponentProps<"div">