import axios from 'axios';

// uygulamanın beslendiği bir api varsa ki spa oluyor. bu durumda baseURL genel olarak 1 tanedir.

const northwndApi = axios.create({
	timeout: 10000,
	timeoutErrorMessage: 'Sunucuya erişim zaman aşımına uğradı',
	baseURL: 'https://services.odata.org/northwind/northwind.svc',
});

const jsonPlaceHolderApi = axios.create({
	timeout: 10000,
	timeoutErrorMessage: 'Sunucuya erişim zaman aşımına uğradı',
	baseURL: 'https://jsonplaceholder.typicode.com',
});

export const httpClientModule = {
	northwndApi,
	jsonPlaceHolderApi,
};
