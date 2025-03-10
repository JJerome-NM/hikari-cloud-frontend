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
			<StyledTitle>Ласкаво просимо до Hikari Cloud</StyledTitle>

			<StyledDescription>
				Цей сервіс дає вам можливість зберігати та впорядковувати ваші фотографії
				у хмарі, ділитися ними з друзями або колегами, а також об’єднувати їх у
				папки та підпапки. Усі ваші фото надійно зберігаються в хмарі (S3).
				Реєструйтесь, завантажуйте знімки і насолоджуйтесь спогадами де б ви не були!
			</StyledDescription>

			<StyledActions>
				{!isAuthenticated && (
					<Button themeStyle="message" onClick={() => signinRedirect()}>
						Увійти або Зареєструватись
					</Button>
				)}
				{isAuthenticated && (
					<Button themeStyle="primary" onClick={() => navigate(folderPages.root())}>
						Перейти до мого фотоальбому
					</Button>
				)}
			</StyledActions>

			<StyledDescription>
				<strong>Основні можливості:</strong><br/>
				1. Реєстрація та авторизація користувачів, щоб бачити лише свої фото.<br/>
				2. Головна сторінка, що розповідає про наш сервіс (доступна всім).<br/>
				3. Сторінка фотоальбому — лише для зареєстрованих користувачів.<br/>
				4. Завантаження фото та зберігання в хмарі.<br/>
				5. Створення папок і вкладених папок для впорядкування фотографій.<br/>
				<br/>
				<strong>Додатково:</strong><br/>
				• Можливість ділитися окремими фото або цілими папками.<br/>
			</StyledDescription>
		</StyledWrapper>
	)
}

type HomePageProps = {} & ComponentProps<"div">;
