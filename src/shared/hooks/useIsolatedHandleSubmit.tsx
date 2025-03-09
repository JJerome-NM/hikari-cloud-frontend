import {FieldValues, SubmitErrorHandler, SubmitHandler, UseFormHandleSubmit} from 'react-hook-form';
import {BaseSyntheticEvent} from "react";

export const useIsolatedHandleSubmit = <
	TFieldValues extends FieldValues = FieldValues,
	TTransformedValues extends FieldValues | undefined = undefined
>(
	handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues>
) => {
	return {
		isolatedHandleSubmit: (
			onValid: TTransformedValues extends undefined
				? SubmitHandler<TFieldValues>
				: TTransformedValues extends FieldValues
					? SubmitHandler<TTransformedValues>
					: never,
			onInvalid?: SubmitErrorHandler<TFieldValues>
		) => {
			return (e?: BaseSyntheticEvent) => {
				if (e) {
					e.preventDefault()
					e.stopPropagation()
				}

				return handleSubmit(onValid, onInvalid)(e)
			}
		}
	}
}
