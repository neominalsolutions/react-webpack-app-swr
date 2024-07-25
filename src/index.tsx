import React, { lazy, Suspense } from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UseStateDemo from './memoisation/useState/usestate.demo';
import UseEffectDemo from './memoisation/useEffect/useeffect.demo';
import UseRefDemo from './memoisation/useRef/useref.demo';
import UseMemoDemo from './memoisation/useMemo/usememo.demo';
import ReactMemoDemo from './memoisation/reactMemo/parent.component.demo';
import UseCallBackDemo from './memoisation/useCallback/usecallback.demo';
import UseImperativeHandlerDemo from './memoisation/useImperativeHandler/useimpretivehandler.demo';
import UseReducerDemo from './memoisation/useReducer/usereducer.demo';
import { App } from './app';
import UseNoImperativeHandlerDemo from './memoisation/useImperativeHandler/noimperativehandler.demo';
import CustomHookDemo from './memoisation/customHook/custom.hook.demo';
import AxiosDemo from './memoisation/axiosDemo/axios.demo';
import CustomHookLoadDataDemo from './memoisation/customHook/custom.hook.load.data.demo';
import DebouncingDemo from './memoisation/debouncing/debouncing.demo';
import { CartProvider } from './contexts/cart.context';
import ShopDemo from './contexts/components/shop.demo';
import CartSummary from './contexts/components/cart.summary.demo';
import ShopReduxDemo from './redux/components/shop.redux.demo';
import CartSummaryReduxDemo from './redux/components/cart.summary.redux.demo';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodosPage from './redux/components/todos.page';
import SwrDemo from './swr/swr.demo';
import ReactFormHookDemo from './react-forms/react-form-hook.demo';
import VirtualizedListDemo from './virtualized-list/virtualized-list.demo';
import SWRInfinitiveLoad from './swr/swr.infinitive.load.demo';

const SwrPreLoadData = lazy(() => import('./swr/swr.preload.demo'));

const router = createBrowserRouter([
	{
		path: '',
		Component: App,
		// element: (
		// 	<CartProvider>
		// 		<App />
		// 	</CartProvider>
		// ), // Ana Layout
		children: [
			{
				path: '/usestate',
				Component: UseStateDemo,
			},
			{
				path: '/useeffect',
				Component: UseEffectDemo,
			},
			{
				path: '/useref',
				Component: UseRefDemo,
			},
			{
				path: '/usememo',
				Component: UseMemoDemo,
			},
			{
				path: '/reactmemo',
				Component: ReactMemoDemo,
			},
			{
				path: '/usecallback',
				Component: UseCallBackDemo,
			},
			{
				path: '/useimperative',
				Component: UseImperativeHandlerDemo,
			},
			{
				path: '/usenonimperative',
				Component: UseNoImperativeHandlerDemo,
			},
			{
				path: '/usereducer',
				Component: UseReducerDemo,
			},
			{
				path: '/CustomHook',
				Component: CustomHookDemo,
			},
			{
				path: '/CustomHookLoadData',
				Component: CustomHookLoadDataDemo,
			},
			{
				path: '/axiosDemo',
				Component: AxiosDemo,
			},
			{
				path: '/debouncing',
				Component: DebouncingDemo,
			},
			{
				path: '/shops',
				Component: ShopDemo,
			},
			{
				path: '/cartSummary',
				Component: CartSummary,
			},
			{
				path: '/shopRedux',
				Component: ShopReduxDemo,
			},
			{
				path: '/cartSummaryRedux',
				Component: CartSummaryReduxDemo,
			},
			{
				path: '/todos',
				Component: TodosPage,
			},
			{
				path: '/swr',
				Component: SwrDemo,
			},
			{
				path: '/swr-preload',
				Component: SwrPreLoadData,
			},
			{
				path: '/forms-hook',
				Component: ReactFormHookDemo,
			},
			{
				path: '/virtualized',
				Component: VirtualizedListDemo,
			},
			{
				path: '/swr-infinitive',
				Component: SWRInfinitiveLoad,
			},
		],
	},
]);

const root = ReactDom.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<>
		<Suspense fallback={<>...loading</>}>
			<Provider store={store}>
				<CartProvider>
					<RouterProvider router={router} />
				</CartProvider>
			</Provider>
		</Suspense>
	</>
);
