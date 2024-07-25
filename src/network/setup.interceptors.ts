import {
	AxiosError,
	AxiosInterceptorOptions,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { httpClientModule } from './httpclient';

function OnRequestSuccess(config: InternalAxiosRequestConfig) {
	// request öncesinde buraya girip config değerini güncelleyebiliriz.
	console.log('request-success', config);

	if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
		// spa uygulama apidan bir access token aldıysa
		const token = '324324.34weewr.eewrewr';
		// config headerına istek atarken otomatik token gönderme yapıyoruz.
		config.headers = config.headers.set('Authorization', `Bearer ${token}`);

		console.log('config', config);
	}

	return config;
}

function OnRequestError(error: AxiosError) {
	console.log('err', error);

	if (error.status === 404) {
		alert('Veri bulunamadı');
	}

	if (error.status === 401) {
		alert('Yetkin Yok');
	}

	if (error.status === 500) {
		alert('sunucuda bir hata meydana geldi');
	}

	return error;
}

function OnResponseSuccess(response: AxiosResponse) {
	console.log('response-success', response);

	if (response.status === 201) {
		alert('Kayıt Başarılı');
	} else if (response.status === 200) {
		alert('veri yüklendi');
	}

	return response;
}

function OnResponseError(error: AxiosError) {
	return error;
}

const options: AxiosInterceptorOptions = {
	synchronous: false,
};

export function northwndClient() {
	httpClientModule.northwndApi.interceptors.request.use(
		OnRequestSuccess,
		OnRequestError
	);

	// response

	httpClientModule.northwndApi.interceptors.response.use(
		OnResponseSuccess,
		OnResponseError,
		options
	);

	return httpClientModule.northwndApi;
}

export function jsonPlaceHolderClient() {
	httpClientModule.jsonPlaceHolderApi.interceptors.request.use(
		OnRequestSuccess,
		OnRequestError
	);

	// response

	httpClientModule.jsonPlaceHolderApi.interceptors.response.use(
		OnResponseSuccess,
		OnResponseError,
		options
	);

	return httpClientModule.jsonPlaceHolderApi;
}
