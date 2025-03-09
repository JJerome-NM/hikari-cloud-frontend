import {css} from "styled-components";

export const StyledInvisibleAbsoluteElement = css`
    position: absolute;
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
    opacity: 0;
    user-select: none;
    background: none;
    outline: none;
    border: none;
    padding: 0;
`