import {ComponentProps} from "react";
import styled from "styled-components";
import {ControlledFromContext} from "./controlled-from-context.ts";
import {Control, FieldValues} from "react-hook-form";

const StyledForm = styled.form`
    box-sizing: border-box;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
		
		padding: 10px;
		border-radius: 15px;
		
		background: ${({theme}) => theme.colors.main};
`

export const ControlledForm = <FormType extends FieldValues, >(
	{
		control,
		children,
		...props
	}: FormProps<FormType>) => {
	return (
		<ControlledFromContext.Provider value={{control}}>
			<StyledForm {...props}>
				{children}
			</StyledForm>
		</ControlledFromContext.Provider>
	)
}

type FormProps<FormType extends FieldValues> = {
	control: Control<FormType>
} & ComponentProps<"form">