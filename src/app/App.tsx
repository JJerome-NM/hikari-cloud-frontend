import {theme} from "./styles/themesStyled.tsx";
import {ThemeProvider} from "styled-components";
import {AppRouter} from "./routers/app-router.tsx";
import {ContextMenuParent} from "../shared/ui/context-menu/context-menu-parent.tsx";
import {ToastContainer} from "react-toastify";
import {ModalParent} from "../shared/ui/common/modal/modalParent.tsx";

import { useAuth } from "react-oidc-context";
import {useEffect} from "react";
import {DynamicBackground} from "../shared/ui";

function App() {
	const auth = useAuth();

	useEffect(() => {
		if (auth.user?.id_token){
			localStorage.setItem("id_token", auth.user?.id_token)
		}
	}, [auth])

	if (!auth.isAuthenticated){
		return (
			<div>
				<button onClick={() => auth.signinRedirect()}>Sign in</button>
			</div>
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<AppRouter/>
			<ContextMenuParent/>
			<DynamicBackground/>
			<ModalParent/>
			<ToastContainer position="bottom-right"
			                theme="dark"
			                autoClose={5000}/>
		</ThemeProvider>
	)
}

export default App
