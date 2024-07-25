import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { removeFromCart, updateQuantity } from '../features/cart.slice';

function CartSummaryReduxDemo() {
	console.log('...rendering');
	const dispatch = useDispatch<AppDispatch>();

	// state seçimi dispatch ile bir değişim olduğunda useSelector bu state değişimin takip edip ekranları günceller.
	const cartState = useSelector((state: RootState) => state.cartState);

	const onRemoveItem = (productId: number) => {
		const ok = confirm('Spetten çıkarmak istediğinize emini misiniz');

		if (ok) {
			dispatch(removeFromCart({ productId: productId }));
		}
	};

	const onQuantityChange = (productId: number, quantity: number) => {
		// dispatch();

		dispatch(updateQuantity({ productId, quantity }));
	};

	return (
		<>
			{cartState.items.map((item) => {
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
				<span>{cartState.totalCost}</span>
			</p>
		</>
	);
}

export default CartSummaryReduxDemo;
