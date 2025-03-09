import {createContext, ReactNode, useContext} from "react";

type PageLayoutContextProps = {
	compactMode: CompactMode
	other: {
		toggleFilterSidebarButton?: ReactNode
	}
}

export enum CompactMode {
	FULL = "FULL",
	SEMI = "SEMI",
	OFF = "OFF",
}

export const PageLayoutContext = createContext<PageLayoutContextProps>({
	compactMode: CompactMode.FULL,
	other: {}
});


export const usePageLayoutContext = () => useContext(PageLayoutContext);