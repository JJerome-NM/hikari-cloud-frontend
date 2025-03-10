import {ComponentProps, useCallback, useRef, useState} from "react";
import {Folder, FolderCreateRequest, FolderResponse, Item, Photo} from "../../../../shared/api/folder/types.ts";
import {FolderCard} from "../../../../entities/folder/ui/folderCard/folderCard.tsx";
import styled from "styled-components";
import {useFolderDelete} from "../../../../entities/folder/api/hook/useFolderDelete.tsx";
import {PhotoCard} from "../../../../entities/photo/ui/photo-card/photo-card.tsx";
import {folderPages} from "../../../../pages/folder/folder-routes.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {PageLayout} from "../../../../shared/ui/layout";
import {ContextMenu} from "../../../../shared/ui/context-menu/context-menu.tsx";
import {FolderIcon} from "../../../../shared/ui/icons/mainIcons.tsx";
import {useFolderCreate} from "../../../../entities/folder/api/hook/useFolderCreate.tsx";
import {toast, ToastContentProps} from "react-toastify";
import {Modal} from "../../../../shared/ui/common/modal/modal.tsx";
import {ControlledForm} from "../../../../shared/ui/form/form/controlledForm.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {InputField} from "../../../../shared/ui/form/fields/inputField/inputField.tsx";
import {Button} from "../../../../shared/ui/common/button";
import {AxiosError} from "axios";
import {usePhotoDelete} from "../../../../entities/photo/api/hook/usePhotoDelete.tsx";
import {UploadFileArea} from "../../../../shared/ui/form/inputs/upload-file-area/upload-file-area.tsx";
import {useFolderUploadPhoto} from "../../../../entities/folder/api/hook/useFolderUploadPhoto.tsx";
import {OpenPhotoModal} from "../../../../entities/photo/ui/open-photo-modal/open-photo-modal.tsx";

const StyledFoldersList = styled.div`
    display: grid;

    height: 100%;
    width: 100%;

    margin: 1rem 0 1rem 0;

    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(0, min-content));
`

export const FolderWidget = (
	{
		data,
		onListChanged,
		...props
	}: FolderImageProps) => {
	const {folderId} = useParams();
	const navigate = useNavigate();
	const listRef = useRef<HTMLDivElement>(null);
	const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
	const [openedPhoto, setOpenedPhoto] = useState<Photo>();

	const {mutateAsync: deleteFolderAsync} = useFolderDelete()
	const {mutateAsync: createFolderAsync} = useFolderCreate()
	const {mutateAsync: deletePhotoAsync} = usePhotoDelete()
	const {mutateAsync: uploadPhotoAsync} = useFolderUploadPhoto(folderId || "")

	const {control, handleSubmit} = useForm<FolderCreateRequest>({
		mode: "onChange"
	})

	const onDeleteFolder = useCallback((data?: Folder) => {
		if (data?.itemId) {
			const deletePromise = deleteFolderAsync(data.itemId, {
				onSuccess: () => onListChanged?.(data)
			});

			toast.promise(deletePromise, {
				pending: "Deleting...",
				success: "Deleted successfully",
				error: {
					render: (props: ToastContentProps<AxiosError<{ error: string }>>) => {
						return props?.data?.response?.data?.error || "Failed to delete folder";
					}
				},
			})

		}
	}, [deleteFolderAsync, onListChanged]);

	const onCreateFolder = useCallback((data?: FolderCreateRequest) => {
		if (data) {
			const createPromise = createFolderAsync(data, {
				onSuccess: () => onListChanged?.()
			})

			toast.promise(createPromise, {
				pending: "Creating folder...",
				success: "Folder create successfully😵",
				error: {
					render: (props: ToastContentProps<AxiosError<{ error: string }>>) => {
						return props?.data?.response?.data?.error || "Failed to creating folder"
					}
				},
			})
		}
	}, [createFolderAsync, onListChanged]);

	const onDeletePhoto = useCallback((data?: Photo) => {
		if (data?.itemId) {
			const deletePromise = deletePhotoAsync(data.itemId, {
				onSuccess: () => onListChanged?.(data)
			})

			toast.promise(deletePromise, {
				pending: "Deleting...",
				success: "Deleted successfully",
				error: {
					render: (props: ToastContentProps<AxiosError<{ error: string }>>) => {
						return props?.data?.response?.data?.error || "Failed to delete photo"
					}
				},
			})
		}
	}, [deletePhotoAsync, onListChanged]);

	const onFileAdd = useCallback((file: File) => {
		const uploadPromise = uploadPhotoAsync(file, {
			onSuccess: () => onListChanged?.()
		})

		toast.promise(uploadPromise, {
			pending: "Uploading photo...",
			success: "Photo upload successfully",
			error: {
				render: (props: ToastContentProps<AxiosError<{ error: string }>>) => {
					return props?.data?.response?.data?.error || "Fails to upload photo"
				}
			},
		})
	}, [onListChanged, uploadPhotoAsync])

	const onSubmit: SubmitHandler<FolderCreateRequest> = useCallback(({name}) => {
		console.log(data)
		onCreateFolder({
			name: name,
			parentId: folderId
		})
	}, [data, folderId, onCreateFolder]);

	return (
		<PageLayout.Main>
			<Modal isOpen={createModalIsOpen}
			       onClose={() => setCreateModalIsOpen(false)}
			       render={({close}) => (
				       <ControlledForm control={control} onSubmit={() => {
					       handleSubmit(onSubmit)()
					       close?.({})
				       }}>
					       <InputField name="name" labelText="Folder name"/>
					       <Button type="submit" stretched themeStyle="success">Save</Button>
				       </ControlledForm>
			       )}/>

			<OpenPhotoModal selectedPhoto={openedPhoto} onClose={() => setOpenedPhoto(undefined)}/>

			<StyledFoldersList {...props} ref={listRef}>
				{Array.isArray(data?.items) && data?.items?.length === 0 && (
					<p>Empty folder</p>
				)}

				{data?.items?.sort((a, b) => a.type === "FOLDER" && b.type !== "FOLDER" ? -1 : 1)
					.map((item) => item.type === "FOLDER" ? (
							<FolderCard key={item.itemId}
							            data={item as Folder}
							            onSelect={() => {
								            navigate(folderPages.folder(item.itemId))
							            }}
							            onDelete={onDeleteFolder}/>
						) : (
							<PhotoCard
								key={item.itemId}
								data={item as Photo}
								onDelete={onDeletePhoto}
								onOpenPhoto={setOpenedPhoto}/>
						)
					)}
			</StyledFoldersList>
			<ContextMenu toggleRef={listRef}>
				<ContextMenu.Item onClick={() => setCreateModalIsOpen(true)}>
					<FolderIcon/>
					Create new folder
				</ContextMenu.Item>
			</ContextMenu>
			<UploadFileArea colliderRef={listRef} onFileAdd={onFileAdd}/>
		</PageLayout.Main>
	)
}

type FolderImageProps = {
	onListChanged?: (data?: Item) => void;
	data?: FolderResponse,
} & ComponentProps<"div">