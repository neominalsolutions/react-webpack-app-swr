import React, { useEffect, useState } from 'react';
import { httpClientModule } from '../../network/httpclient';
import {
	jsonPlaceHolderClient,
	northwndClient,
} from '../../network/setup.interceptors';
import { getProducts } from '../../services/product.services';
import { UseStorage } from './useStorage.hook';
import { UseAccessToken } from './useaccesstoken.hook';
import { UseFetch } from './usefetch.hook';

// hooklar function compopnentlerde function component bodysine yazılan özel functionlar.
// amaç function yüklenirken bir eylemi yerine getirmek,
// UseLocalStorage => localStorage bilgi okuyup ekrana yazdırabiliriz
// UseLoadData => belirli bir endpointeki verileri yakalama işlemlerini merkezi yönettiğim bir hook olur.
// bu hookları bir state bağlıda özelleştirebilir.
// state değişiminde tekrar tetiklenecek şekilde yazabilirim.

function CustomHookDemo() {
	console.log('...rendering');
	const [key, setKey] = useState<string>('token');

	// token yerine başka bir key gelirse bu durumda bu hook nasıl tekrardan güncellenip değeri üretecek bide buna bakacağız.

	// ilk çağırıda herhangi bir componentin içinde yani bodysinde çağırıyoruz.
	const { value } = UseStorage(key);

	const { subject, loginTime, name } = UseAccessToken();

	

	

	return (
		<>
			Token Value: {value}
			<br></br>
			Key: {key}
			<hr></hr>
			<input
				type="text"
				onChange={(e: any) => {
					setKey(e.target.value);
				}}
			/>
			<p>UserName: {name}</p>
			<p>Subject: {subject}</p>
			<p>loginTime: {loginTime}</p>
		</>
	);
}

export default CustomHookDemo;
