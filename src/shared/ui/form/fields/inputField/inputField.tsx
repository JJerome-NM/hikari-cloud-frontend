import {ComponentProps} from "react";
import {FieldPath, FieldValues} from "react-hook-form";
import {FormField, FormFieldProps} from "../../formField/formField.tsx";
import {Input} from "../../inputs/input/input.tsx";
import {useControlledFromContext} from "../../form/controlled-from-context.ts";

export const InputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		...props
	}: InputFieldProps & Omit<FormFieldProps<TFieldValues, TName>, "render">) => {
	const {control} = useControlledFromContext<TFieldValues>()

	return (
		<FormField control={control}
		           {...props}
		           render={({id, field, props, fieldState}) => (
			           <Input id={id}
			                  {...field}
			                  {...props}
			                  className={props.className}
			                  style={props.style}
			                  placeholder={props.placeholder}
			                  invalid={fieldState.invalid}
			           />
		           )}/>
	)
}

export type InputFieldProps = {} & ComponentProps<"input">