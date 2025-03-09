import {createContext, useContext} from "react";

type ContextType = {
	isHovered: boolean;
	setDetailsHeight: (width: number) => void;
}

export const PreviewCardContext = createContext<ContextType>({
	isHovered: true,
	setDetailsHeight: () => {throw new Error("Method not implemented")}
})

export const usePreviewCardContext = () => useContext(PreviewCardContext)
