import {ComponentProps} from "react";
import {usePanelMenuContext} from "../panel-menu-context.ts";
import styled from "styled-components";
import {motion, MotionProps} from "framer-motion";
import {PanelMenuVariantRow} from "./panel-menu-variant-row.tsx";
import {Button} from "../../ui/common/button";

const StyledMenu = styled(motion.div)`
    width: 0;
    height: 0;
		min-width: 0;
		
    overflow: hidden;
`

const PanelMenuVariantComponent = <T extends string, >(
	{
		children,
		variant,
		showBackButton = true,
		...props
	}: MenuProps<T>) => {
	const {activeVariant, back} = usePanelMenuContext()

	return (
		<StyledMenu {...props}
		            animate={{
			            width: variant === activeVariant ? "100%" : 0,
			            height: variant === activeVariant ? "max-content" : 0,
		            }}
		>
			{children}

			{showBackButton && (
				<Button stretched onClick={back} themeStyle="warning">Back</Button>
			)}
		</StyledMenu>
	)
}

type MenuProps<T extends string> = {
	variant?: T,
	showBackButton?: boolean,
} & Omit<ComponentProps<"div">, "ref"> & MotionProps;

export const PanelMenuVariant = Object.assign(PanelMenuVariantComponent, {
	Row: PanelMenuVariantRow
})
