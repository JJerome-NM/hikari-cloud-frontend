import {ComponentProps} from "react";
import styled from "styled-components";

const StyledPreview = styled.div`
	background-color: #535bf2;
`

export const PreviewCardPreview = ({children, ...props}: PreviewCardPreviewProps) => {
	return (
		<StyledPreview {...props}>
			{children}
		</StyledPreview>
	)
}

type PreviewCardPreviewProps = {

} & ComponentProps<"div">