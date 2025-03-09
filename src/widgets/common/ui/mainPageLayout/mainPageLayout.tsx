import styled from "styled-components";
import {ComponentProps} from "react";
import {Outlet} from "react-router-dom";
import {Header} from "../header";

const StyledMainPageLayout = styled.div`
    box-sizing: border-box;
    display: flex;

    flex-direction: column;

    width: 100%;
    height: 100%;

    overflow: auto;
`

export const MainPageLayout = ({...props}: MainPageLayoutProps) => {
	return (
		<StyledMainPageLayout {...props}>
			<Header />
			<Outlet/>
		</StyledMainPageLayout>
	)
}

type MainPageLayoutProps = {} & ComponentProps<"div">
