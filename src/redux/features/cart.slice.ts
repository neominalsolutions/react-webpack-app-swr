import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../../contexts/cart.context';

const initialState: Cart = {
	items: [],
	totalCost: 0,
	statusCode: 0,
};

const calcTotal = (state: Cart): void => {
	let total = 0;

	for (const item of state.items) {
		total += item.listPrice * item.quantity;
	}

	state.totalCost = total;
};

// slice ile hem cation hemde reducer yönetimi yapıyoruz.

const cartSlice = createSlice({
	name: 'CART',
	initialState: initialState,
	reducers: {
		addToCart: (state: Cart, action: PayloadAction<CartItem>) => {
			const existItem = state.items.find(
				(x) => x.productId == action.payload.productId
			);

			if (existItem) {
				state.statusCode = 204; // updated
				existItem.quantity += 1;
			} else {
				state.statusCode = 201; // created
				state.items = [action.payload, ...state.items];
			}

			calcTotal(state);
			// setState yapmaya gerek kalmıyor
		},
		removeFromCart: (
			state: Cart,
			action: PayloadAction<{ productId: number }>
		) => {
			const filteredItems = state.items.filter(
				(x) => x.productId != action.payload.productId
			);

			// spread operatörü kullanmaksak dahi referans güncellenir.
			state.items = filteredItems;
			// state.items = [... filteredItems]; buna gerek yok

			calcTotal(state);
		},
		updateQuantity: (
			state: Cart,
			action: PayloadAction<{ productId: number; quantity: number }>
		) => {
			const existItem = state.items.find(
				(x) => x.productId == action.payload.productId
			);

			if (existItem) {
				existItem.quantity = action.payload.quantity;
			}

			calcTotal(state);
		},
	},
});

// componentlerden ilgili actionlar dispatch etmek için export ettik.
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
// reducer store consume edip uygulamanın hangi state ile çalışacağını söyleyeceğiz.
export const cartReducer = cartSlice.reducer;
