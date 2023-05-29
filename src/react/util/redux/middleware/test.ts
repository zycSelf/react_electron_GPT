export const reduxMiddleWare = function (store: any) {
	return function (next: any) {
		return function (action: any) {
			console.log('test Middleware', store.getState());
			next(action);
		};
	};
};
