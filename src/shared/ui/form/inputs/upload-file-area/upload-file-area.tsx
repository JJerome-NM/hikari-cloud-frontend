import { ComponentProps, DragEvent as ReactDragEvent, RefObject, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const StyledDropCollider = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #00000055;
    border-radius: 10px;
    border: 2px dashed ${({ theme }) => theme.colors.primaryDeepDarkLight};
`;

export const UploadFileArea = <RefType extends HTMLElement,>({
	                                                             colliderRef,
	                                                             onFileAdd,
	                                                             ...props
                                                             }: UploadFileAreaProps<RefType>) => {
	const [dragging, setDragging] = useState(false);

	const handleNativeDragEnter = useCallback((e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: ReactDragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
	}, []);

	const handleDragOver = useCallback((e: ReactDragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback((e: ReactDragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);

		const files = e.dataTransfer.files;
		console.log(files);
		if (files.length > 0) {
			onFileAdd?.(files[0]);
		}
	}, [onFileAdd]);

	useEffect(() => {
		const collider = colliderRef?.current;
		if (collider) {
			collider.addEventListener("dragenter", handleNativeDragEnter);
			return () => {
				collider.removeEventListener("dragenter", handleNativeDragEnter);
			};
		}
	}, [colliderRef, handleNativeDragEnter]);

	return dragging && (
		<StyledDropCollider
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			{...props}
		/>
	);
};

type UploadFileAreaProps<RefType extends HTMLElement> = {
	colliderRef?: RefObject<RefType | null>,
	onFileAdd?: (file: File) => void
} & ComponentProps<"div">;
