import {ComponentProps, useCallback, useEffect, useRef, useState} from "react";
import {PanelMenuContext} from "./panel-menu-context.ts";
import {PanelMenuVariant} from "./variant/panel-menu-variant.tsx";
import styled from "styled-components";
import {PanelMenuMain} from "./main/panel-menu-main.tsx";
import {useHandleResize} from "../hooks/useHandleResize.tsx";
import {useStack} from "../hooks/useStack.tsx";

const StyledMenu = styled.div`
    width: 100%;
`

const PanelMenuComponent = <T extends string, >(
	{
		onBack,
		onNext,
		children,
		useMinHeight = false,
		activeVariant,
		...props
	}: PanelMenuProps<T>) => {
	const menuHistory = useStack<T>()
	const menuRef = useRef<HTMLDivElement>(null);
	const {height} = useHandleResize(menuRef);

	const [minHeight, setMinHeight] = useState<number>(0)

	useEffect(() => {
		const menu = menuRef.current;
		if (menu && useMinHeight && height > minHeight) {
			setMinHeight(height);
		}
	}, [height, minHeight, useMinHeight]);

	useEffect(() => {
		if (activeVariant === undefined) {
			setMinHeight(0);
		}
	}, [activeVariant]);

	useEffect(() => {
		if (activeVariant && menuHistory.peek() !== activeVariant){
			menuHistory.push(activeVariant);
		} else if (activeVariant === undefined && menuHistory.size() > 0) {
			menuHistory.clear();
		}
	}, [activeVariant, menuHistory]);

	const back = useCallback(() => {
		onBack?.(menuHistory.stack[menuHistory.size() - 2]);
	}, [menuHistory, onBack]);

	return (
		<PanelMenuContext.Provider value={{
			gotoVariant: (variant) => onNext?.(variant),
			back: back,
			activeVariant: menuHistory.peek()
		}}>
			<StyledMenu ref={menuRef}
			            style={{
				            minHeight,
			            }}
			            {...props}>
				{children}
			</StyledMenu>
		</PanelMenuContext.Provider>
	)
}

type PanelMenuProps<T extends string> = {
	useMinHeight?: boolean;
	activeVariant?: T
	onNext?: (nextVariant: T) => void;
	onBack?: (prevVariant: T) => void;
} & ComponentProps<"div">

export const PanelMenu = Object.assign(PanelMenuComponent, {
	Main: PanelMenuMain,
	Variant: PanelMenuVariant,
})
