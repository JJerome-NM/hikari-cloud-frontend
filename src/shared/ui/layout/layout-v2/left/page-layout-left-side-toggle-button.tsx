import {ComponentProps} from "react";

export const PageLayoutLeftSideToggleButton = ({...props}: PageLayoutLeftSidebarToggleButtonProps) => {
	return (
		<div {...props}>
			Click
		</div>
	)
}

type PageLayoutLeftSidebarToggleButtonProps = {} & ComponentProps<"div">