import {ComponentProps, useState} from "react";
import {PageLayout} from "../../../../shared/ui/layout";
import {PageLayoutLeftNav} from "../../../../entityes/common/ui/page-layout-left-nav";
import {ColoredSectionTitle} from "../../../../shared/ui/common/coloredSectionTitle/coloredSectionTitle.tsx";
import {useFolderGetRoot} from "../../../../entityes/folder/api/hook/useFolderGetRoot.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {Button} from "../../../../shared/ui/common/button";
import styled from "styled-components";
import {FolderIcon, PhotoIcon} from "../../../../shared/ui/icons/mainIcons.tsx";
import {folderPages} from "../../../../pages/folder/folder-routes.tsx";
import {RouteLink} from "../../../../shared/ui/common/nav";
import {OpenPhotoModal} from "../../../../entityes/photo/ui/open-photo-modal/open-photo-modal.tsx";
import {Photo} from "../../../../shared/api/folder/types.ts";

const StyledItemRow = styled(RouteLink)`
    display: flex;

    flex-direction: row;

    min-width: 0;
    width: 100%;

    gap: 10px;
`

const StyledItemName = styled.span`
    font-size: 1.1rem;

    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;

    user-select: none;
`

export const FolderLayout = ({...props}: FolderLayoutProps) => {
	const {data} = useFolderGetRoot()
	const navigate = useNavigate()
	const [openedPhoto, setOpenedPhoto] = useState<Photo>();

	return (
		<PageLayout {...props}>
			<OpenPhotoModal selectedPhoto={openedPhoto} onClose={() => setOpenedPhoto(undefined)}/>

			<PageLayoutLeftNav>
				<PageLayoutLeftNav.Title>
					<ColoredSectionTitle colors={{light: "#38d96333", dark: "#38d963"}}
					                     onClick={() => {
						                     navigate(folderPages.root())
					                     }}>
						ROOT
					</ColoredSectionTitle>
				</PageLayoutLeftNav.Title>
				<PageLayoutLeftNav.Body>
					{data?.items?.map((item) => (
						<StyledItemRow key={item.itemId}
						               to={folderPages.folder(item.itemId)}
						               icon={item.type === "FOLDER" ? <FolderIcon/> : <PhotoIcon/>}
						>
							<StyledItemName>
								{item.name}
							</StyledItemName>
						</StyledItemRow>
					))}

					<Button stretched themeStyle="default" onClick={() => navigate(-1)}>Back</Button>
				</PageLayoutLeftNav.Body>
			</PageLayoutLeftNav>
			<Outlet/>
		</PageLayout>
	)
}

type FolderLayoutProps = {} & ComponentProps<"div">