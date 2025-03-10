import {ComponentProps} from "react";
import {usePhotoGetById} from "../../api/hook/usePhotoGetById.tsx";
import {Photo} from "../../../../shared/api/folder/types.ts";
import styled from "styled-components";
import {Modal} from "../../../../shared/ui/common/modal/modal.tsx";
import {Loader} from "../../../../shared/ui/common/loader/loader.tsx";

const StyledModal = styled(Modal)`
    box-sizing: border-box;
    padding: 0;

    margin: 20px;
    background: transparent;

    overflow: hidden;
`

const StyledPicture = styled.picture`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
`

export const OpenPhotoModal = (
	{
		selectedPhoto,
		onClose,
		...props
	}: OpenPhotoModalProps) => {
	const {data, isLoading} = usePhotoGetById(selectedPhoto?.itemId || "");

	return (
		<StyledModal isOpen={!!selectedPhoto}
		             onClose={onClose}
		             {...props}
		             render={() => isLoading ? (
			             <Loader.LoaderWithWrapper/>
		             ) : (
			             <StyledPicture>
				             <img src={data?.presignedUrl || ""} alt={data?.item?.name}/>
			             </StyledPicture>
		             )}/>
	)
}

type OpenPhotoModalProps = {
	selectedPhoto?: Photo;
	onClose?: () => void;
} & ComponentProps<"div">
