import {ComponentProps, useCallback} from "react";
import styled from "styled-components";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {Photo} from "../../../../shared/api/folder/types.ts";
import {
	Copy4Icon,
	DotsVerticalIcon,
	Download2Icon,
	PhotoIcon,
	Trash6Icon
} from "../../../../shared/ui/icons/mainIcons.tsx";
import {usePhotoLoadById} from "../../api/hook/usePhotoGetById.tsx";
import {toast} from "react-toastify";
import axios from "axios";
import {sharePages} from "../../../../pages/folder/folder-routes.tsx";

const StyledFolder = styled.div`
    display: flex;

    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    border: 1px solid #ffffff33;
    border-radius: 10px;
    background-color: #ffffff11;
    padding: 10px;


    position: relative;
`

const StyledFolderName = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-size: 1rem;
    gap: 5px;
    user-select: none;

    overflow: hidden;
    width: 100%;

    &:hover {
        cursor: pointer;
    }

    & span {
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        cursor: pointer;
    }
`

const StyledMenuButton = styled(MenuButton)`
    display: flex;

    align-items: center;
    justify-content: center;

    background-color: transparent;
    padding: 4px;
    border-radius: 5px;
    cursor: pointer;

    border: none;

    &:hover,
    &[data-headlessui-state="open"] {
        background-color: #3f3f3f;
    }
`

const StyledMenuItems = styled(MenuItems)`
    margin-top: 4px;

    gap: 10px;

    width: 13rem;
    padding: 4px;
    border-radius: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    z-index: 10;

    &[data-headlessui-state="open"] {
        transform: scale(1);
        opacity: 1;
    }

    &[data-headlessui-state="closed"] {
        transform: scale(0.95);
        opacity: 0;
    }

    &:focus {
        outline: none;
    }
`

const StyledMenuItem = styled(MenuItem)`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;

    border: none;
    background-color: transparent;

    font-size: 1rem;

    &[data-headlessui-state="active"],
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`

const StyledButton = styled.button`
    display: flex;

    flex-direction: row;

    align-items: flex-end;

    gap: 10px;

    font-size: 1.2rem;
`

export const PhotoCard = (
	{
		data,
		onDelete,
		onOpenPhoto,
		...props
	}: FolderProps) => {
	const {loadPhoto} = usePhotoLoadById()

	const download = useCallback(() => {
		if (data) {
			const toastId = toast.loading("Preparing to download...")

			loadPhoto(data.itemId, {
				onSuccess: ({data: response}) => {
					toast.update(toastId, {
						render: "Photo is ready for download❤️",
						type: "success",
						isLoading: false,
						autoClose: 5000,
					})
					window.location.href = response.downloadUrl;
				},
				onError: (error) => {
					if (axios.isAxiosError(error)) {
						console.log(error)
						toast.update(toastId, {
							render: error.response?.data.error,
							type: "error",
							isLoading: false,
							autoClose: 5000,
						})
					}
				}
			})
		}
	}, [data, loadPhoto]);

	const copyShareLink = useCallback(() => {
		if (data?.shareToken) {
			navigator.clipboard.writeText(sharePages.buildFullTokenPath(data?.shareToken));
			toast.success("Copied to clipboard")
		} else {
			toast.error("Share token not found")
		}
	}, [data?.shareToken]);

	return (
		<StyledFolder {...props}>
			<StyledFolderName onClick={() => onOpenPhoto?.(data)}>
				<PhotoIcon/>
				<span>
					{data?.name}
				</span>
			</StyledFolderName>
			<Menu>
				<StyledMenuButton>
					<DotsVerticalIcon/>
				</StyledMenuButton>

				<StyledMenuItems anchor="bottom end">
					<StyledMenuItem>
						<StyledButton onClick={() => onDelete?.(data)}>
							<Trash6Icon/>
							Delete
						</StyledButton>
					</StyledMenuItem>
					<StyledMenuItem>
						<StyledButton onClick={download}>
							<Download2Icon/>
							Download
						</StyledButton>
					</StyledMenuItem>
					{data?.shareToken && (
						<StyledMenuItem>
							<StyledButton onClick={copyShareLink}>
								<Copy4Icon/>
								Copy share link
							</StyledButton>
						</StyledMenuItem>
					)}
				</StyledMenuItems>
			</Menu>
		</StyledFolder>
	)
}

type FolderProps = {
	data?: Photo;
	onDelete?: (data?: Photo) => void;
	onOpenPhoto?: (data?: Photo) => void;
} & ComponentProps<"div">;
