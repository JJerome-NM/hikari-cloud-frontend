import {css} from "styled-components";

export const BaseFormFieldStyled = css<{disabled?: boolean}>`
    box-sizing: border-box;

    width: 100%;
    height: 40px;

    padding: 10px 12px 10px 12px;

    background-color: ${({theme}) => theme.colors.primaryLightDark};
    color: white;

    border: 1px solid transparent;
    border-radius: 10px;

    font-size: 16px;

    transition: ease .2s;

    outline: none;

    ${({disabled}) => !disabled && css`
        &:hover {
            background-color: ${({theme}) => theme.colors.primaryShadow};
        }
    `}
    
    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
        border-color: #0069ff;
        box-shadow: 0 0 0 3px #0069ff22;
        background-color: ${({theme}) => theme.colors.primaryShadow};
    }

    .invalid & {
        border-color: red;
    }

    ${({disabled}) => disabled && css`
        background-color: #191919;
        color: #ccc;
    `}
    
    &:disabled {
        background-color: #191919;
        color: #ccc;
    }
`