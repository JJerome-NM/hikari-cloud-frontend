import {ComponentProps} from "react";

export const HomePage = ({...props}: HomePageProps) => {
	return (
		<div {...props}>
			This is home page
		</div>
	)
}

type HomePageProps = {} & ComponentProps<"div">