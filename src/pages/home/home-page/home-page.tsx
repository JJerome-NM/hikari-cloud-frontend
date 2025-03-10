import {ComponentProps} from "react";
import styled from "styled-components";
import {useAuth} from "react-oidc-context";
import {useNavigate} from "react-router-dom";
import {Button} from "../../../shared/ui/common/button";
import {folderPages} from "../../folder/folder-routes.tsx";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    color: #fff;
`

const StyledTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 1.5rem;
`

const StyledDescription = styled.p`
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 2rem;

    width: 100%;
`

const StyledActions = styled.div`
    gap: 15px;
    margin-bottom: 2rem;
`

export const HomePage = ({...props}: HomePageProps) => {
	const navigate = useNavigate()
	const {isAuthenticated, signinRedirect} = useAuth()

	return (
		<StyledWrapper {...props}>
			<StyledTitle>Welcome to Hikari Cloud</StyledTitle>

			<StyledDescription>
				This service allows you to store and organise your photos<br/>
				in the cloud, share them with friends or colleagues, and organise them into<br/>
				folders and subfolders. All your photos are securely stored in the cloud (S3).<br/>
				Sign up, upload your photos and enjoy your memories wherever you are!<br/>
			</StyledDescription>

			<StyledActions>
				{!isAuthenticated && (
					<Button themeStyle="message" onClick={() => signinRedirect()}>
						Login or Register
					</Button>
				)}
				{isAuthenticated && (
					<Button themeStyle="primary" onClick={() => navigate(folderPages.root())}>
						Go to my storage
					</Button>
				)}
			</StyledActions>

			<StyledDescription>
				<strong>Main features:</strong><br/>
				1. Register and authorise users to see only their photos.<br/>
				2. The main page that tells about our service (accessible to everyone).<br/>
				3. Photo album page - for registered users only.<br/>
				4. Upload photos and store them in the cloud.<br/>
				5. Create folders and subfolders to organise your photos.<br/>
				<br/>
				<strong>Additionally:</strong><br/>
				• Share individual photos or entire folders.<br/>
			</StyledDescription>
		</StyledWrapper>
	)
}

type HomePageProps = {} & ComponentProps<"div">;
