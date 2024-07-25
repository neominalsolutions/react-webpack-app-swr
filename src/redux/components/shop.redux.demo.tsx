// Sepete Eklenecek olan ürünlerin listesini görüntüleyeceğiz. Her bir ürün yanında sepete ekle butonu olsun.

import React, { useContext, useEffect } from 'react';
import { UseFetch } from '../../memoisation/customHook/usefetch.hook';
import { httpClientModule } from '../../network/httpclient';
import { Product } from '../../models/product.model';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart } from '../features/cart.slice';

function ShopReduxDemo() {
	const { data, isFetched } = UseFetch<Product[]>(
		httpClientModule.northwndApi,
		'/Products'
	);
	// useContext context bağlkanmamızı sağlayan bir hook

	const dispatch = useDispatch<AppDispatch>();
	const cartState = useSelector((state: RootState) => state.cartState);

	const onAddItemToCart = (item: Product) => {
		dispatch(
			addToCart({
				quantity: 1,
				name: item.ProductName,
				listPrice: item.UnitPrice,
				productId: item.ProductID,
			})
		);
	};

	// eğer toaster veya alert gibi bir mesaj verilecek ise redux state async olduğundan useEffect ile statusCode değişimi aşağıdaki gibi takibe alınır.
	useEffect(() => {
		if (cartState.statusCode == 201) {
			alert('ürün eklendi');
		} else if (cartState.statusCode == 204) {
			alert('ürün adet güncellendi');
		}
	}, [cartState.statusCode]);

	// Ekrana basmak için aşağıdaki gibi statusCode takibi yaptık

	if (isFetched) {
		return (
			<ul>
				{cartState && (
					<label>
						{cartState.statusCode == 201
							? 'Eklendi'
							: cartState.statusCode == 204
							? 'Adet güncellendi'
							: ''}
					</label>
				)}

				{data?.map((item) => {
					return (
						<div key={item.ProductID}>
							<hr></hr>
							<li>
								Ürün: {item.ProductName} / Fiyat: {item.UnitPrice} / Stok:{' '}
								{item.UnitsInStock}
								<br></br>
								<button onClick={() => onAddItemToCart(item)}>
									Sepete EKle
								</button>
							</li>
							<hr></hr>
						</div>
					);
				})}
			</ul>
		);
	}
	return <></>;
}

export default ShopReduxDemo;
