import styled from "styled-components";
import {ComponentProps, ReactElement, useCallback, useId} from "react";
import {
	Controller,
	ControllerFieldState,
	ControllerProps,
	ControllerRenderProps,
	FieldPath,
	FieldValues,
	UseFormStateReturn
} from "react-hook-form";
import {Label} from "../../common/label";


const StyledFormField = styled.div`
    display: flex;

    flex-direction: column;

    width: 100%;
    max-width: 100vw;

    font-size: 24px;
`

const StyledErrorMessage = styled.span`
    box-sizing: border-box;
    color: #ffffff;

    font-size: 14px;
    line-height: 18px;
    min-height: 18px;

    padding: 0 2px;

    &:not(:last-child) {
        margin: 0 0 10px 0;
    }
`

export const FormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		labelText,
		render,
		control,
		name,
		showError = true,
		...props
	}: IFormFieldProps<TFieldValues, TName>) => {
	const generatedId = useId();
	const inputId: string = props.id || generatedId;

	const renderFn = useCallback(({field, fieldState, formState}: RenderObject<TFieldValues, TName>) => {
		return render?.({id: inputId, field, props, fieldState, formState})
	}, [inputId, props, render])
	
	return (
		<Controller<TFieldValues, TName>
			control={control}
			name={name}
			{...props}
			render={({field, fieldState, formState}) => (
				<StyledFormField key={inputId} className={fieldState.error?.message ? "invalid" : ""}>
					{labelText && <Label htmlFor={inputId}>{labelText}</Label>}
					{renderFn({field, fieldState, formState})}
					{showError && <StyledErrorMessage>{fieldState.error?.message}</StyledErrorMessage>}
				</StyledFormField>
			)}
		/>
	)
}

export type FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
	showError?: boolean;
	labelText?: string;
	id?: string;
} & Omit<ControllerProps<TFieldValues, TName>, "render">;

// type FieldRenderProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = ControllerRenderProps<TFieldValues, TName> & ComponentProps<'div'>

type RenderObject<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
	field: ControllerRenderProps<TFieldValues, TName>
	fieldState: ControllerFieldState
	formState: UseFormStateReturn<TFieldValues>
}

type IFormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
	showError?: boolean;
	labelText?: string;
	id?: string;
	render: ({field, fieldState, formState}: {
		id: string
		field: ControllerRenderProps<TFieldValues, TName>
		props: Omit<ComponentProps<"input">, "value">
		fieldState: ControllerFieldState
		formState: UseFormStateReturn<TFieldValues>
	}) => ReactElement;
} & Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<"input">;