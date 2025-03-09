import {ComponentProps} from "react";

export const PageLayoutRightSideToggleButton = ({...props}: PageLayoutRightSidebarToggleButtonProps) => {
	return (
		<div {...props}>
			Click
		</div>
	)
}

type PageLayoutRightSidebarToggleButtonProps = {} & ComponentProps<"div">