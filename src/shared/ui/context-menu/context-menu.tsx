import {ComponentProps, CSSProperties, RefObject, useCallback, useEffect, useRef, useState} from "react";
import {ContextMenuItem} from "./context-menu-item.tsx";
import {useClickOutside} from "../../hooks/useClickOutside.tsx";
import styled from "styled-components";
import {motion, MotionProps} from "framer-motion";
import {createPortal} from "react-dom";
import {contextMenuParentId} from "./context-menu-parent.tsx";
import {ContextMenuContext} from "./context-menu-context.ts";

const StyledMenu = styled(motion.div)`
    box-sizing: border-box;
    position: absolute;
    display: flex;

    flex-direction: column;
		
    width: max-content;
    height: 0;

    padding: 5px;
		
    border: 1px solid #000;
    border-radius: 15px;
    background-color: ${({theme}) => theme.colors.main};

    overflow: auto;
		
    z-index: 1000;
`

const StyledItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ContextMenuComponent = <ToggleType extends HTMLElement, >(
	{
		toggleRef,
		children,
		...props
	}: ContextMenuProps<ToggleType>) => {
	const parent = document.getElementById(contextMenuParentId)
	const itemsWrapperRef = useRef<HTMLDivElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState<boolean>()
	const [positionCss, setPositionCss] = useState<CSSProperties>({})
	const [overflowingCss, setOverflowingCss] = useState<CSSProperties>({})
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

	useEffect(() => {
		if (mousePosition && itemsWrapperRef.current && isOpen) {
			const itemsRect = itemsWrapperRef.current.getBoundingClientRect();
			const heightToBottom = window.innerHeight - mousePosition.y;

			if (heightToBottom < itemsRect.height + 10) {
				setPositionCss({
					bottom: window.innerHeight - mousePosition.y,
					left: mousePosition.x,
				});
			} else {
				setPositionCss({
					top: mousePosition.y,
					left: mousePosition.x,
				});
			}
		}
	}, [isOpen, mousePosition, toggleRef])

	useEffect(() => {
		if (mousePosition && itemsWrapperRef.current && isOpen) {
			const heightToBottom = window.innerHeight - mousePosition.y;
			const heightToTop = mousePosition.y;
			const itemsRect = itemsWrapperRef.current.getBoundingClientRect();
			const itemsHeight = itemsRect.height + 10;

			if (heightToBottom > itemsHeight || heightToTop > itemsHeight) {
				setOverflowingCss({
					overflow: "hidden",
					maxHeight: "max-content",
				});
			} else {
				setOverflowingCss({
					overflow: "auto",
					maxHeight: heightToTop - 10,
				});
			}
		}
	}, [isOpen, mousePosition])

	useClickOutside(menuRef, {
		ignoreParents: [],
		ignoreEvents: !isOpen
	}, () => setIsOpen(false))

	const openMenu = useCallback((e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setMousePosition({ x: e.clientX, y: e.clientY })
		setIsOpen(true)
	}, [])

	useEffect(() => {
		if (toggleRef.current) {
			const toggle = toggleRef.current
			toggle.addEventListener("contextmenu", openMenu)
			return () => {
				toggle.removeEventListener("contextmenu", openMenu)
			}
		}
	}, [openMenu, toggleRef])

	return (
		isOpen && parent && createPortal((
			<ContextMenuContext value={{
				close: () => setIsOpen(false)
			}}>
				<StyledMenu {...props}
				            ref={menuRef}
				            style={{
					            ...positionCss,
					            ...overflowingCss,
				            }}
				            animate={{
					            height: isOpen ? "max-content" : 0,
				            }}
				            transition={{duration: 0.1}}
				>
					<StyledItemsWrapper ref={itemsWrapperRef}>
						{children}
					</StyledItemsWrapper>
				</StyledMenu>
			</ContextMenuContext>
		), parent)
	)
}

type ContextMenuProps<ToggleType extends HTMLElement> = {
	toggleRef: RefObject<ToggleType | null>
} & ComponentProps<"div"> & MotionProps

export const ContextMenu = Object.assign(ContextMenuComponent, {
	Item: ContextMenuItem
})
