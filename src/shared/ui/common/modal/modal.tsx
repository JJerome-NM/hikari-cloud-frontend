import {ComponentProps, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {ModalCloseStatus} from "./modalCloseStatus.ts";
//@ts-ignore
import _ from "lodash";
import {useClickOutside} from "../../../hooks/useClickOutside.tsx";
import {modalParentId} from "./modalParent.tsx";

const StyledModalWrapper = styled.div`
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    background: #00000099
`

const StyledModal = styled.div`
		display: flex;
		
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
    background: #111;	

    padding: 20px;

    border-radius: 20px;

    width: max-content;
    height: max-content;
		
		max-width: 100vw;
		max-height: 100vh;
`

export const Modal = <T, >(
	{
		onClose,
		isOpen,
		initialValue,
		render,
		...props
	}: ModalProps<T>) => {
	const [data, setData] = useState<T | undefined>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const modalRef = useRef<HTMLDivElement>(null);
	const modalParent = document.getElementById(modalParentId);
	const dropdownParent = document.getElementById("dropdown-parent")

	const close = useCallback(({closeStatus, returnValue}: ModalRenderCloseFnProps<T>) => {
		if (isModalOpen) {
			onClose?.({
				closeStatus: closeStatus || ModalCloseStatus.CANCELED,
				returnedValue: returnValue
			})
			setIsModalOpen(false);
		}
	}, [isModalOpen, onClose])

	useClickOutside(modalRef, {
		ignoreParents: [dropdownParent],
		ignoreEvents: !isModalOpen
	}, () => close({returnValue: data}));

	useEffect(() => {
		if (isOpen) {
			setData(_.cloneDeep(initialValue));
			setIsModalOpen(true);
		} else {
			close({returnValue: data});
		}
	}, [close, initialValue, isOpen]);

	return (
		modalParent && isModalOpen && createPortal(
			<StyledModalWrapper>
				<StyledModal {...props} ref={modalRef}>
					{render({
						initialValue: data,
						close: close
					})}
				</StyledModal>
			</StyledModalWrapper>,
			modalParent
		)
	)
}

export type ModalRenderCloseFnProps<T> = {
	returnValue?: T,
	closeStatus?: ModalCloseStatus
}

export type ModalRenderCloseFn<T> = (props: ModalRenderCloseFnProps<T>) => void

export type ModalRenderFnProps<T> = {
	initialValue?: T;
	close: ModalRenderCloseFn<T>
}

export type ModalRenderFn<T> = (props: ModalRenderFnProps<T>) => ReactNode

export type ModalProps<T> = {
	isOpen: boolean
	initialValue?: T
	onClose?: (props: { closeStatus: ModalCloseStatus, returnedValue?: T }) => void
	render: ModalRenderFn<T>
} & Omit<ComponentProps<"div">, "children">
