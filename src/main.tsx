import {createRoot} from 'react-dom/client'
import './app/styles/index.css'
import App from './app/App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { AuthProvider } from "react-oidc-context";
import {WebStorageStateStore} from "oidc-client-ts";

const queryClient = new QueryClient()

const cognitoAuthConfig = {
	authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_BhipPNxRq",
	client_id: "64joqvtht82nfh2vtvc1g4nfip",
	redirect_uri: `${import.meta.env.VITE_URL}`,
	response_type: "code",
	scope: "email openid phone profile",
	userStore: new WebStorageStateStore({ store: localStorage })
}

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider {...cognitoAuthConfig} automaticSilentRenew>
			<App/>
		</AuthProvider>
	</QueryClientProvider>,
)
