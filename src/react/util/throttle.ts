export function throttle<T extends (...args: any[]) => void>(
	fn: T,
	delay: number,
): T {
	let timerId: ReturnType<typeof setTimeout> | undefined;
	return function (this: any, ...args: Parameters<T>) {
		if (!timerId) {
			timerId = setTimeout(() => {
				fn.apply(this, args);
				timerId = undefined;
			}, delay);
		}
	} as T;
}
