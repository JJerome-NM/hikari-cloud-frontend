import styled from "styled-components";
import {ComponentProps} from "react";
import {NavLink} from "react-router-dom";
import {folderPages} from "../../../../pages/folder/folder-routes.tsx";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {DotsVerticalIcon, Logout5Icon} from "../../../../shared/ui/icons/mainIcons.tsx";
import {useAuth} from "react-oidc-context";
import {appPages} from "../../../../app/routers/app-router.tsx";
import {Button} from "../../../../shared/ui/common/button";

const StyledHeaderWrapper = styled.div`
    position: sticky;
    box-sizing: border-box;
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    top: 0;
    height: 50px;
    width: 100%;

    padding: 5px 10px;
    z-index: 100;
`

const StyledHeaderLinks = styled.div`
    display: flex;

    flex-direction: row;

    gap: 10px;
`

const StyledHeaderLink = styled(NavLink)`
    color: #f9f9f9;

    font-size: 1.2rem;

    font-weight: bold;

    transition: stroke ease-in-out .2s;

    & svg path {
        transition: stroke ease-in-out .2s;
    }

    &.active {
        color: ${({theme}) => theme.colors.linkSecondary};

        & svg path {
            stroke: ${({theme}) => theme.colors.linkSecondary};
        }
    }

    &:hover {
        color: ${({theme}) => theme.colors.linkMain};

        & svg path {
            stroke: ${({theme}) => theme.colors.linkMain};
        }
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
        background-color: #ffffff11;
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

const StyledRightSideWrapper = styled.div`
    display: flex;

    flex-direction: row;
    align-items: center;

    padding: 5px;

    gap: 10px;

    & span {
        font-size: 1rem;
        font-weight: 500;
    }
`

export const Header = (
	{
		...props
	}: IHeaderProps) => {
	const {signoutSilent, signinRedirect, isAuthenticated, user} = useAuth();

	const signOutRedirect = () => {
		signoutSilent()
		const clientId = "64joqvtht82nfh2vtvc1g4nfip";
		const logoutUri = `${import.meta.env.VITE_URL}`;
		const cognitoDomain = "https://hikari-cloud-auth.auth.eu-central-1.amazoncognito.com";
		window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
	}

	return (
		<StyledHeaderWrapper {...props}>
			<StyledHeaderLinks>
				<StyledHeaderLink to={appPages.home()} end>
					Home
				</StyledHeaderLink>
				{isAuthenticated && (
					<>
						<StyledHeaderLink to={folderPages.root()} end>
							Storage
						</StyledHeaderLink>
						<StyledHeaderLink to={folderPages.shared()} end>
							Shared objects
						</StyledHeaderLink>
					</>
				)}
			</StyledHeaderLinks>

			{!isAuthenticated && (
				<Button themeStyle="message" onClick={() => signinRedirect()}>
					SignIn
				</Button>
			)}

			{isAuthenticated && (
				<StyledRightSideWrapper>
					<span>{user?.profile["cognito:username"] as string}</span>
					<Menu>
						<StyledMenuButton>
							<DotsVerticalIcon/>
						</StyledMenuButton>

						<StyledMenuItems anchor="bottom end">
							{isAuthenticated && (
								<StyledMenuItem>
									<StyledButton onClick={signOutRedirect}>
										<Logout5Icon/>
										Logout
									</StyledButton>
								</StyledMenuItem>
							)}
						</StyledMenuItems>
					</Menu>
				</StyledRightSideWrapper>
			)}
		</StyledHeaderWrapper>
	)
}

type IHeaderProps = {} & ComponentProps<"div">
