import {ComponentProps} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";

const StyledProgressBarWrapper = styled.div`
    display: flex;

    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    width: 100%;

    gap: 6px;
`

const StyledProgressBar = styled.div`
    display: flex;

    width: 100%;
    height: 8px;

    border-radius: 100px;

    background: ${({theme}) => theme.colors.primaryDeepDarkLight};

    overflow: hidden;
`

const StyledProgressBarFilled = styled(motion.span)`
    height: 100%;

    border-radius: 100px;

    background: ${({theme}) => theme.colors.mainPurple};
`

const StyledPercentages = styled.span`
    width: 3rem;

    font-family: monospace;
    font-size: .9rem;
    letter-spacing: .05rem;
`

const StyledPercentageSymbol = styled.span`
    margin-left: 3px;
`

export const ProgressBar = (
	{
		progress = 0,
		showPercentages = false,
		...props
	}: ProgressBarProps) => {
	return (
		<StyledProgressBarWrapper {...props}>
			<StyledProgressBar>
				<StyledProgressBarFilled
					animate={{
						width: `${Math.min(100, Math.max(0, progress))}%`
					}}
				/>
			</StyledProgressBar>
			{showPercentages && (
				<StyledPercentages>{progress?.toFixed(0)}
					<StyledPercentageSymbol>%</StyledPercentageSymbol>
				</StyledPercentages>
			)}
		</StyledProgressBarWrapper>
	)
}

type ProgressBarProps = {
	showPercentages?: boolean
	progress?: number
} & ComponentProps<"div">