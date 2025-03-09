import {ComponentProps, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useShareUseToken} from "../../../entityes/share/api/hook/useShareUseToken.tsx";
import {folderPages} from "../folder-routes.tsx";
import {Loader} from "../../../shared/ui/common/loader/loader.tsx";
import styled from "styled-components";
import {toast} from "react-toastify";
import axios from "axios";

const StyledWrapper = styled.div`
    display: flex;

		flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
		
		font-size: 1.4rem;
		color: #fff;
`

export const ApplyShareToken = ({...props}: ApplyShareTokenProps) => {
	const {shareToken} = useParams()
	const {applyShareToken} = useShareUseToken()
	const navigate = useNavigate()

	useEffect(() => {
		if (shareToken) {
			applyShareToken(shareToken, {
				onSuccess: ({data}) => {
					navigate(folderPages.folder(data?.folder?.itemId || ""))
					toast.success("Object successfully shared")
				}, onError: (error) => {
					if (axios.isAxiosError(error)){
						toast.error(error.response?.data.error || "Something went wrong");
					}
				}
			})
		}
	}, [shareToken, applyShareToken, navigate]);

	return (
		<StyledWrapper {...props}>
			<Loader/>
			Applying share token
		</StyledWrapper>
	)
}

type ApplyShareTokenProps = {} & ComponentProps<"div">