import {createContext, useContext} from "react";
import {Control, FieldValues} from "react-hook-form";


type ControlledFormContextType<FormType extends FieldValues> = {
	control?: Control<FormType>
}

export const ControlledFromContext = createContext<ControlledFormContextType<any>>({})

export const useControlledFromContext = <FormType extends FieldValues>() => {
	return useContext(ControlledFromContext) as ControlledFormContextType<FormType>
}
