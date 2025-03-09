import {ComponentProps, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../../shared/api/axiosInstance.ts";

export const Test = ({...props}: TestProps) => {
	const {data, error} = useQuery({
		retry: false,
		queryKey: ["dijfgfighfgh"],
		queryFn: () => axiosInstance.get("https://w9t00akrh1.execute-api.eu-central-1.amazonaws.com/Prod/sonone")
	})

	useEffect(() => {
		console.log(data)
	}, [data]);

	return (
		<div {...props}>
			<p>{error?.message}</p>
		</div>
	)
}

type TestProps = {} & ComponentProps<"div">