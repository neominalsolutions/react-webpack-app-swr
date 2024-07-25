// server state olan bir verinin client state nasıl yükleneceğini inceleyeceğiz.
// extrareducers dediğimiz bir yaklaşım var.
// fetch ile çekeceğimiz her bir endpoint üzerindeki veriye ait 3 farklı state tanımı yapıyoruz.
// pending state, loading state
// fullfilled state => resolved
// rejected state => rejected

// Not: UseFetch Hook burada çalışmaz Hooklar sadece Component içinden tatiklenebilir.

// todoFetch async function component içinden dispatch edilerek çağırılır. async state başlar. extraReducers yazılan kod blokları kendi kendine otomatik olarak dolar.

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { httpClientModule } from '../../network/httpclient';

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}
type TodoState = {
	data: Todo[];
	loading: boolean;
	isFetched: boolean;
	isError: boolean;
	error: AxiosError | null;
};
export const todoFetch = createAsyncThunk('TODOS', async () => {
	return (await httpClientModule.jsonPlaceHolderApi.get<Todo[]>('/todos')).data;
});

export const todoFetchMock = createAsyncThunk('TODOS', async () => {
	return new Promise((resolve, reject) => {
		const data: any = [
			{
				userId: 1,
				id: 1,
				title: 'delectus-yeni aut autem',
				completed: false,
			},
			{
				userId: 10,
				id: 200,
				title: 'ipsam aperiam voluptates qui',
				completed: false,
			},
		];
		setTimeout(() => {
			resolve(data);
		}, 100);
	});
});
const todoInit: TodoState = {
	data: [],
	loading: false,
	isFetched: false,
	isError: false,
	error: null,
};
const todoSlice = createSlice({
	name: 'TODOS',
	initialState: todoInit,
	reducers: {},
	extraReducers(builder) {
		// veri load olma aşaması
		builder.addCase(
			todoFetch.pending,
			(state: TodoState, action: PayloadAction<void>) => {
				state.loading = true;
			}
		);
		builder.addCase(
			todoFetch.fulfilled,
			(state: TodoState, action: PayloadAction<Todo[]>) => {
				state.loading = false;
				state.isFetched = true;
				state.data = action.payload;
			}
		);
		builder.addCase(
			todoFetch.rejected,
			(state: TodoState, action: PayloadAction<any>) => {
				state.isError = true;
				state.loading = false;
				state.isFetched = false;
				state.error = action.payload;
				state.data = [];
			}
		);
	},
});
export const todoReducer = todoSlice.reducer;
// async olarak yükleme yapıyorsak actionları dışarı çıkarmıyoruz.
// reducers kısmında yazılan actionlar export edilebilir.
