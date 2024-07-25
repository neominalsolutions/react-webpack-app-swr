// Sepete Eklenecek olan ürünlerin listesini görüntüleyeceğiz. Her bir ürün yanında sepete ekle butonu olsun.

import React, { useContext } from 'react';
import { UseFetch } from '../../memoisation/customHook/usefetch.hook';
import { httpClientModule } from '../../network/httpclient';
import { Product } from '../../models/product.model';
import { CartContext, CartContextActionType } from '../cart.context';

function ShopDemo() {
	const { data, isFetched } = UseFetch<Product[]>(
		httpClientModule.northwndApi,
		'/Products'
	);
	// useContext context bağlkanmamızı sağlayan bir hook
	const { addToCart } = useContext(CartContext) as CartContextActionType;
	const onAddItemToCart = (item: Product) => {
		// sepete ekleme işlemini tetikledik.
		addToCart({
			quantity: 1,
			listPrice: item.UnitPrice,
			name: item.ProductName,
			productId: item.ProductID,
		});
	};
	if (isFetched) {
		return (
			<ul>
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

export default ShopDemo;
