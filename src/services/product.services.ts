import { httpClientModule } from '../network/httpclient';
import { northwndClient } from '../network/setup.interceptors';

export interface ProductCreate {
	ProductName: string;
	UnitPrice: number;
	UnitsInStock: number;
}

export const getProducts = () => {
	console.log('product-service');
	return httpClientModule.northwndApi.get('/Products');
};

export const createProduct = (data: ProductCreate) => {
	return northwndClient().post('/Products', data);
};
