import React, { useEffect } from 'react';
import { jsonPlaceHolderClient } from '../../network/setup.interceptors';
import { httpClientModule } from '../../network/httpclient';
import { getProducts } from '../../services/product.services';

function AxiosDemo() {
	// request response interceptor ile loglanarak kullanılıyor.

	// buradan çağırınca interceptor var
	const jsonPlaceHolderApi = jsonPlaceHolderClient();

	// request-response loglanmıyor
	// interceptor yok
	const northwndApi = httpClientModule.northwndApi;

	useEffect(() => {
		jsonPlaceHolderApi.get('/posts').then((response) => {
			console.log('data', response.data);
		});

		// northwndApi.get('/Products').then((response) => {
		// 	console.log('response', response.data);
		// });

		getProducts().then((response) => {
			console.log('data', response.data);
		});
	}, []);

	return <></>;
}

export default AxiosDemo;
