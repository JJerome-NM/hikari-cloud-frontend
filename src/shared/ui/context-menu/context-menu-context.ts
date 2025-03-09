import {createContext, useContext} from "react";


type ContextType = {
	close: () => void,
}

export const ContextMenuContext = createContext<ContextType>({
	close: () => console.error("Method not implemented"),
})

export const useContextMenuContext = () => useContext(ContextMenuContext)