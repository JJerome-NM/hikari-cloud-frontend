import {createRoot} from 'react-dom/client'
import './app/styles/index.css'
import App from './app/App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { AuthProvider } from "react-oidc-context";

const queryClient = new QueryClient()

const cognitoAuthConfig = {
	authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_WdqZYfdCV",
	client_id: "77hfv86tt5nkprc5ggjpfen7ln",
	redirect_uri: `${import.meta.env.VITE_URL}`,
	response_type: "code",
	scope: "email openid phone profile",
}

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider {...cognitoAuthConfig}>
			<App/>
		</AuthProvider>
	</QueryClientProvider>,
)
