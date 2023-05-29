var c = (function () {
	var obj = {};
	var name = 'abcde';

	Object.defineProperty(obj, 'name', {
		get: function () {
			console.log('getter触发');
			return name;
		},
		set: function (x) {
			console.log('setter触发');
			name = x;
		},
	});

	return obj;
})();
c.name = 'xyz';
