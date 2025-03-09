import {ComponentProps} from "react";
import {PanelMenu} from "../panel-menu.tsx";
import {MotionProps} from "framer-motion";
import {PanelMenuVariantRow} from "../variant/panel-menu-variant-row.tsx";
import {PanelMenuRow} from "../panel-menu-row.tsx";

const PanelMenuMainComponent = (
	{
		children,
		...props
	}: PanelMenuMainProps) => {
	return (
		<PanelMenu.Variant showBackButton={false} {...props}>
			{children}
		</PanelMenu.Variant>
	)
}

type PanelMenuMainProps = {} & ComponentProps<"div"> & MotionProps

export const PanelMenuMain = Object.assign(PanelMenuMainComponent, {
	Row: PanelMenuRow,
	NamedRowWithValue: PanelMenuVariantRow
})
