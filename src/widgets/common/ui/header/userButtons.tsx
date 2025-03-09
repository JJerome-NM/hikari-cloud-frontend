import {ComponentProps} from "react";
import styled, {css} from "styled-components";

const StyledUserButtons = styled.div<{ $open: boolean }>`
    display: flex;
    align-items: center;

    overflow: hidden;
    max-width: 0;
    
    opacity: 0;
    transition: .25s ease-in-out;
    transition-delay: .1s;

    height: inherit;

    margin: 0 0 0 10px;

    ${(props) => props.$open && css`
        opacity: 1;
        max-width: 100vw;
    `}
`

interface IUserButtonsProps extends ComponentProps<"div"> {
  isOpen: boolean;
}

export const UserButtons = ({isOpen, children, ...props}: IUserButtonsProps) => {
  return (
    <StyledUserButtons $open={isOpen} {...props}>{children}</StyledUserButtons>
  )
}
