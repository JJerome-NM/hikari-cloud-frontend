import {useState} from 'react';

export const useStack = <T, >() => {
	const [stack, setStack] = useState<T[]>([]);

	// useEffect(() => {
	// 	console.log(stack);
	// }, [stack])

	return {
		stack,
		push: (item: T) => {
			setStack(prev => [...prev, item]);
		},
		pop: () => {
			setStack(prev => {
				if (prev.length === 0) return prev;
				const newStack = [...prev];
				newStack.pop();
				return newStack;
			});
			return stack[stack.length - 1]
		},
		peek: () => stack[stack.length - 1],
		size: () => stack.length,
		isEmpty: () => stack.length === 0,
		clear: () => setStack([])
	};
};
