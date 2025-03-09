import styled from "styled-components";
import {ComponentProps} from "react";


const StyledLabel = styled.label`
  font-size: 20px;

  color: #eee;

  align-content: end;
`

export const Label = ({...props}: ComponentProps<"label">) => {
  return (
    <StyledLabel {...props}></StyledLabel>
  )
}