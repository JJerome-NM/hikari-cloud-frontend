import {ComponentProps} from "react";
import styled, {keyframes} from "styled-components";

const spanAnimation = keyframes`
    from {height: 50px}
    50% {height: 125px}
    to {height: 50px}
`

const StyledLoaderWrapper = styled.div`
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`

const StyledColumn = styled.span`
    display: block;
    width: 20px;
    height: 50px;
    border-radius: 12px;
    animation: ${spanAnimation} 1s ease-in-out infinite;

    background: ${({theme}) => theme.colors.mainBlue};
		
    &:nth-child(2) {
        animation-delay: -.25s;
        background: ${({theme}) => theme.colors.mainYellow};
    }

    &:nth-child(3) {
        animation-delay: -.5s;
        background: ${({theme}) => theme.colors.mainGreen};
    }

    &:nth-child(4) {
        animation-delay: -.75s;
        background: ${({theme}) => theme.colors.mainPurple};
    }
`

const StyledLoader = styled.div`
    display: flex;
		
    justify-content: center;
    align-items: center;
		
    gap: 10px;
		
    width: 100%;
    height: 150px;
`

export const LoaderComponent = ({...props}: LoaderProps) => {
	return (
		<StyledLoader {...props}>
			<StyledColumn/>
			<StyledColumn/>
			<StyledColumn/>
			<StyledColumn/>
		</StyledLoader>
	)
}

type LoaderProps = {} & ComponentProps<"div">;

const LoaderWrapper = () => {
	return (
		<StyledLoaderWrapper>
			<LoaderComponent/>
		</StyledLoaderWrapper>
	)
}

export const Loader = Object.assign(LoaderComponent, {
	LoaderWithWrapper: LoaderWrapper
});
