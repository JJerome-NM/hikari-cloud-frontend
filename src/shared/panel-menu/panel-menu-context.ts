import {createContext, useContext} from "react";

type ContextType<T extends string> = {
	activeVariant?: T
	mainVariant?: T

	gotoVariant: (variant?: T) => void
	back: () => void
}

export const PanelMenuContext = createContext<ContextType<any>>({
	gotoVariant: () => console.error("Method not implemented"),
	back: () => console.error("Method not implemented"),
})

export const usePanelMenuContext = <T extends string>() => useContext<ContextType<T>>(PanelMenuContext)
