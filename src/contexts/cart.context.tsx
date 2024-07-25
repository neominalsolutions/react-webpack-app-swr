// Sepete Ürün EKleme
// Ürün Fiyat Güncelleme
// Ürün Adet Güncelleme
// Ürün silme (Sepetten çıkarma)
// Sepet Tutar değişir.

import { createContext, ReactNode, useState } from 'react';

import React from 'react';

export interface CartItem {
	productId: number;
	name: string;
	quantity: number;
	listPrice: number;
}

// Sepete ait bilgileri burada tutulacak.
export interface Cart {
	items: CartItem[];
	totalCost: number;
	statusCode?: number;
}

export interface CartContextActionType {
	cart: Cart;
	addToCart(item: CartItem): void;
	removeFromCart(productId: number): void;
	updateQuantity(productId: number, quantity: number): void;
}

// cartContext oluşturduk.
// componentlerden bağlanıp useContext Hook ile context üzerinde okuma ve yazma işlemleri yuaparız

// Provider => Servis sağlayıcı anlamına gelir. React daki kullanımı ise uygulama içindeki componentlere bir veri aktarımı yapmak için componentleri sarmalayan bir yapı sağlar
// Provider Componentler Children Componentlere değer aktarımı sağlayan yapılar.

/* 
<RouterProvider currentRoute>
 <A /> 
 <B /> 
<RouterProvider />
*/
// Global bir yönetim olduğu için Provider ismini verdik
export const CartContext = createContext<CartContextActionType | null>(null);

export function CartProvider({ children }: any) {
	// local olan bir state global state dönüşüyor.
	const [cart, setCart] = useState<Cart>({ items: [], totalCost: 0 });

	const addToCart = (item: CartItem) => {
		console.log('sepete ekle');

		const existItem = cart.items.find((x) => x.productId == item.productId);

		if (existItem) {
			existItem.quantity = existItem.quantity + 1;
			cart.items = [...cart.items];
		} else {
			cart.items = [item, ...cart.items];
		}

		let totalCost: number = 0;

		for (const item of cart.items) {
			totalCost += item.listPrice * item.quantity;
		}

		cart.totalCost = totalCost;

		setCart({ ...cart });
	};

	const removeFromCart = (productId: number) => {
		console.log('sepetten sil');

		const filteredItems = cart.items.filter((x) => x.productId != productId);
		cart.items = filteredItems;

		let totalCost: number = 0;

		for (const item of cart.items) {
			totalCost += item.listPrice * item.quantity;
		}

		cart.totalCost = totalCost;

		setCart({ ...cart });
	};

	const updateQuantity = (productId: number, quantity: number) => {
		console.log('adet güncelle');

		const existItem = cart.items.find((x) => x.productId == productId);

		console.log('existItem', existItem);

		if (existItem) {
			existItem.quantity = quantity;
		}

		cart.items = [...cart.items];

		let totalCost: number = 0;

		for (const item of cart.items) {
			totalCost += item.listPrice * item.quantity;
		}

		cart.totalCost = totalCost;

		// bu kod ile yepyeni bir referans aldı
		setCart({ ...cart });
		// nesnenin referansı değişmediği için ekran güncellenemedi
		//setCart(cart);
	};

	const values = {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
	};

	return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}
