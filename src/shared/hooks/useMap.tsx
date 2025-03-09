import {useEffect, useState} from "react";

export const useMap = <K, V>() => {
	const [map, setMap] = useState<Map<K, V>>(new Map());

	useEffect(() => {
		console.log(map);
	}, [map]);

	return {
		values: Array.from(map.values()),
		keys: Array.from(map.keys()),
		entries: Array.from(map.entries()),
		get: (key: K) => map.get(key),
		has: (key: K) => map.has(key),
		set: (key: K, value: V) => {
			setMap((prev) => new Map(prev).set(key, value));
		},
		delete: (key: K) => {
			setMap((prev) => {
				const newMap = new Map(prev);
				newMap.delete(key);
				return newMap;
			});
		},
		clear: () => setMap(new Map())
	};
};
