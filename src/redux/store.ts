import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './features/cart.slice';
import { todoReducer } from './features/todo.slice';

// 2. part slice olarak tanımlanan değerleri dosyaları store'a tanıtıyoruz.

export const store = configureStore({
	reducer: {
		cartState: cartReducer,
		todoState: todoReducer,
	},
});

// Store içinde birden fazla state tanımı yapılabilir buradan tüm statelere erişim yapıyoruz.
// store.getState
export type RootState = ReturnType<typeof store.getState>;
// Store üzerinden bir action tetiklemek için kullanacağımız tipi dispatch({type:'create-todo',payload:{data}})
export type AppDispatch = typeof store.dispatch;
