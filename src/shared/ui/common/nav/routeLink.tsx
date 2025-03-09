import styled from "styled-components";
import {NavLink, NavLinkProps} from "react-router-dom";
import {ReactNode} from "react";

const StyledRouteLink = styled(NavLink)`
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 5px;

  display: flex;
  
  flex-direction: row;
  
  width: 100%;

  font-size: 18px;

  color: #fff;

  transition: ease-in-out .2s;

  background: ${({theme}) => theme.colors.primaryLightDark};

  & svg path {
    transition: stroke ease-in-out .2s;
  }

  &.active {
    color: ${({theme}) => theme.colors.linkSecondary};
    background-color: ${({theme}) => `${theme.colors.linkSecondary}22`};
    
    & svg path {
      stroke: ${({theme}) => theme.colors.linkSecondary};
    }
  }

  &:hover {
    color: ${({theme}) => theme.colors.linkMain};
    background-color: ${({theme}) => `${theme.colors.linkMain}22`};

    & svg path {
      stroke: ${({theme}) => theme.colors.linkMain};
    }
  }
`

const StyledLinkIconWrapper = styled.span`
    display: flex;

    justify-content: center;
    align-items: center;
`

export const RouteLink = ({children, icon, ...props}: IRouteLinkProps) => {
  return (
    <StyledRouteLink {...props}>
      {icon && (
        <StyledLinkIconWrapper>
          {icon}
        </StyledLinkIconWrapper>
      )}
      {children}
    </StyledRouteLink>
  )
}

export type IRouteLinkProps = {
  icon?: ReactNode
  children?: ReactNode
} & NavLinkProps
