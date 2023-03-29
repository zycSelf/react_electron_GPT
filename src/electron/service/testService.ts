import service from './service';

service.listen(8088, () => {
	console.log('server is running');
});
