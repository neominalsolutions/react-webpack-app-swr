import React, { useContext } from 'react';
import { CartContext, CartContextActionType } from '../cart.context';

// Cart State deki Sepete eklenmiş olan ürünleri görüceğiz.
function CartSummary() {
	// removeFromCart, updateQuantity ile cart state güncelleniyor
	// güncellene bu state ekranda gösteriyoruz.

	const { cart, removeFromCart, updateQuantity } = useContext(
		CartContext
	) as CartContextActionType;

	const onRemoveItem = (productId: number) => {
		// cart Stateden ilgili tanımlamayı çıkardır.
		removeFromCart(productId);
	};

	const onQuantityChange = (productId: number, quantity: number) => {
		updateQuantity(productId, quantity);
	};

	return (
		<>
			{cart.items.map((item) => {
				return (
					<div key={item.productId}>
						{item.name}: {item.quantity} x {item.listPrice} =
						{item.quantity * item.listPrice}
						<input
							onChange={(event) =>
								onQuantityChange(item.productId, Number(event.target.value))
							}
							type="number"
							placeholder="Adet"
							defaultValue={item.quantity}
						/>
						<button onClick={() => onRemoveItem(item.productId)}>
							Sepetten Çıkar
						</button>
					</div>
				);
			})}

			<p>
				<b>Toplam:</b>
				<span>{cart.totalCost}</span>
			</p>
		</>
	);
}

export default CartSummary;
