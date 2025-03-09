import {ComponentProps} from "react";
import styled from "styled-components";
import {PhotoIcon} from "../../../../shared/ui/icons/mainIcons.tsx";

const StyledPhotoPreview = styled.div`
    box-sizing: border-box;
    display: flex;

    flex-direction: row;

    min-width: 0;
    width: 100%;

    gap: 10px;

    padding: 5px 10px;
    border-radius: 5px;

    font-size: 18px;

    color: #fff;

    transition: ease-in-out .2s;

    background: ${({theme}) => theme.colors.primaryLightDark};

    & svg path {
        transition: stroke ease-in-out .2s;
    }

    &:hover {
        color: ${({theme}) => theme.colors.linkMain};
        background-color: ${({theme}) => `${theme.colors.linkMain}22`};

        & svg path {
            stroke: ${({theme}) => theme.colors.linkMain};
        }
    }
`

const StyledIconWrapper = styled.span`
    display: flex;
		
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const StyledItemName = styled.span`
    font-size: 1.1rem;

    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;

    user-select: none;
`

export const PhotoPreviewRow = ({children, ...props}: PhotoPreviewRowProps) => {
	return (
		<StyledPhotoPreview {...props}>
			<StyledIconWrapper>
				<PhotoIcon/>
			</StyledIconWrapper>
			<StyledItemName>
				{children}
			</StyledItemName>
		</StyledPhotoPreview>
	)
}

type PhotoPreviewRowProps = {} & ComponentProps<"div">